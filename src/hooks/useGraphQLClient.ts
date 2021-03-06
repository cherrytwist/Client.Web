import { ApolloLink, from, InMemoryCache, NormalizedCacheObject, Operation } from '@apollo/client';
import { ApolloClient } from '@apollo/client/core/ApolloClient';
import { onError } from '@apollo/client/link/error';
import { RetryLink } from '@apollo/client/link/retry';
import { createUploadLink } from 'apollo-upload-client';
import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { env } from '../env';
import { typePolicies } from '../graphql/typePolicies';
import { ErrorStatus } from '../models/Errors';

const enableQueryDebug = !!(env && env?.REACT_APP_DEBUG_QUERY === 'true');
const enableErrorLogging = !!(env && env?.REACT_APP_LOG_ERRORS === 'true');

export const useGraphQLClient = (graphQLEndpoint: string): ApolloClient<NormalizedCacheObject> => {
  const dispatch = useDispatch();

  const errorLink = onError(({ graphQLErrors, networkError, forward: _forward, operation: _operation }) => {
    let errors: Error[] = [];
    if (graphQLErrors) {
      for (let err of graphQLErrors) {
        switch (err?.extensions?.code) {
          case ErrorStatus.TOKEN_EXPIRED:
            // should not happen
            break;
          default:
            const newMessage = `${err.message}`;
            errors.push(new Error(newMessage));
        }
      }
    }

    if (networkError) {
      // TODO [ATS] handle network errors better;
      const newMessage = `[Network error]: ${networkError}`;
      errors.push(new Error(newMessage));
    }

    errors.forEach(e => enableErrorLogging && console.error(e));
  });

  const consoleLink = new ApolloLink((operation, forward) => {
    if (enableQueryDebug) {
      // TODO [ATS]: Logger required
      console.log(`starting request for ${operation.operationName}`);
    }
    return forward(operation).map(data => {
      if (enableQueryDebug) {
        console.log(`ending request for ${operation.operationName}`);
      }
      return data;
    });
  });

  const httpLink = createUploadLink({
    uri: graphQLEndpoint,
    credentials: 'include',
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const retryIf = (error: any, _operation: Operation) => {
    const doNotRetryCodes = [500, 400];
    return !!error && !doNotRetryCodes.includes(error.statusCode);
  };

  const retryLink = new RetryLink({
    delay: {
      initial: 1000,
      max: 5000,
      jitter: true,
    },
    attempts: {
      max: 25,
      retryIf,
    },
  });

  const omitTypename = (key: string, value: unknown) => {
    return key === '__typename' || key === '_id' || /^\$/.test(key) ? undefined : value;
  };

  /*
    Apollo automatically sends _typename in the query.  This causes
    a failure on the server-side because _typename is not specified
    in the schema. This middleware removes it.
  */
  const omitTypenameLink = new ApolloLink((operation, forward) => {
    // Do not clear __typename when there is a file fo upload,
    // Otherwise the JSON parse/stringify will remove the File variable
    if (operation.variables && !operation.variables.file) {
      operation.variables = JSON.parse(JSON.stringify(operation.variables), omitTypename);
    }
    return forward ? forward(operation) : null;
  });

  return useMemo(() => {
    return new ApolloClient({
      // link: from([authLink, errorLink, retryLink, omitTypenameLink, consoleLink, httpLink]),
      link: from([consoleLink, omitTypenameLink, errorLink, retryLink, httpLink]),
      cache: new InMemoryCache({ addTypename: true, typePolicies: typePolicies }),
    });
  }, [dispatch]);
};

export default useGraphQLClient;
