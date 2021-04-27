import clsx from 'clsx';
import React, { FC, useEffect, useRef } from 'react';
import { Fade } from 'react-bootstrap';
import { OnMessageReceivedDocument, useMessagesQuery } from '../../generated/graphql';
import { createStyles } from '../../hooks/useTheme';
import { OnMessageReceivedSubscription } from '../../types/graphql-schema';
import Card from '../core/Card';
import TextInput from '../core/TextInput';
import Typography from '../core/Typography';

const useMessageStyles = createStyles(theme => ({
  messageContainer: {
    display: 'flex',
    marginTop: theme.shape.spacing(2),
    color: theme.palette.background,
    flexDirection: 'column',
  },
  containerRight: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginLeft: theme.shape.spacing(10),
  },
  containerLeft: {
    display: 'flex',
    justifyContent: 'flex-start',
    marginRight: theme.shape.spacing(10),
  },
  message: {
    padding: `${theme.shape.spacing(1)}px ${theme.shape.spacing(2)}px`,
    border: `1px solid ${theme.palette.neutralLight}`,
    borderRadius: theme.shape.borderRadius,
    cursor: 'pointer',

    '&:hover': {
      opacity: 0.8,
    },

    '&.me': {
      background: theme.palette.neutralMedium,
    },
    '&.you': {
      background: theme.palette.primary,
    },
  },
  left: {
    justifyContent: 'flex-start',
  },
  right: {
    justifyContent: 'flex-end',
  },
  loader: {
    color: theme.palette.neutral,
    opacity: 0.7,

    '& > div > *': {
      marginLeft: theme.shape.spacing(0.5),
    },
  },
  textLeft: {
    textAlign: 'left',
  },
  textRight: {
    textAlign: 'right',
  },
  container: {
    maxHeight: 480,
    height: 480,
    overflowY: 'auto',
  },
}));

export const ChatWindow: FC = () => {
  const { data, subscribeToMore } = useMessagesQuery();
  const styles = useMessageStyles();
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const unSunbscribe = subscribeToMore<OnMessageReceivedSubscription>({
      document: OnMessageReceivedDocument,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;

        const newMessage = subscriptionData.data.messageReceived;
        return Object.assign({}, prev, {
          messages: [...prev.messages, newMessage],
        });
      },
    });
    return () => unSunbscribe();
  }, [subscribeToMore]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
  }, [data]);

  return (
    <>
      <Card
        bodyProps={{
          classes: {
            background: theme => theme.palette.neutralLight,
          },
          className: clsx(styles.container),
        }}
      >
        <div>
          {data?.messages.map((x, i) => (
            <Fade key={i} in appear>
              <div
                className={clsx(
                  x.sender === 'acho@acho.com' ? styles.containerLeft : styles.containerRight,
                  styles.messageContainer
                )}
              >
                <div
                  style={{ display: 'flex' }}
                  className={clsx(x.sender === 'acho@acho.com' ? styles.left : styles.right)}
                >
                  <span className={clsx(styles.message, x.sender === 'acho@acho.com' ? 'me' : 'you')}>{x.message}</span>
                </div>
                <Typography
                  className={clsx(x.sender === 'acho@acho.com' ? styles.textLeft : styles.textRight)}
                  variant="caption"
                >
                  {new Date(x.timestamp).toLocaleTimeString()}
                </Typography>
              </div>
            </Fade>
          ))}
          <div ref={bottomRef}></div>
        </div>
      </Card>
      <TextInput label={'replay'} value={''} onChange={() => console.log('change')} />
    </>
  );
};
