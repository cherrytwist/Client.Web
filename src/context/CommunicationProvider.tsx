import React, { FC, useMemo } from 'react';
import { useMyCommunitiesQuery } from '../generated/graphql';
import { Community } from '../types/graphql-schema';

export interface CommunicationContextProps {
  communities: Omit<Community, 'applications' | 'groups'>[];
  senders: Record<string, string>;
}

const communicationContext = React.createContext<CommunicationContextProps>({
  communities: [],
  senders: {},
});

interface CommunicationProviderProps {}

const CommunicationProvider: FC<CommunicationProviderProps> = ({ children }) => {
  const { data } = useMyCommunitiesQuery();

  const senders = useMemo(() => {
    return (
      data?.me.memberof?.communities.reduce((sum, curr) => {
        const result = curr.members?.reduce((s, member) => {
          return {
            ...s,
            [member.id]: member.name,
          };
        }, {} as Record<string, string>);

        return {
          ...sum,
          ...result,
        };
      }, {} as Record<string, string>) || {}
    );
  }, [data]);

  return (
    <communicationContext.Provider
      value={{
        communities: data?.me.memberof?.communities || [],
        senders: senders,
      }}
    >
      {children}
    </communicationContext.Provider>
  );
};

export { CommunicationProvider, communicationContext };
