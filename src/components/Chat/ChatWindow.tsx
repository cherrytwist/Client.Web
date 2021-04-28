import clsx from 'clsx';
import React, { FC, useEffect, useRef } from 'react';
import { Fade } from 'react-bootstrap';
import { createStyles } from '../../hooks/useTheme';
import { CommunicationMessageResult } from '../../types/graphql-schema';
import Card from '../core/Card';
import Loading from '../core/Loading';
import Typography from '../core/Typography';

const useMessageStyles = createStyles(theme => ({
  messageContainer: {
    display: 'flex',
    marginTop: theme.shape.spacing(1),
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
    padding: `${theme.shape.spacing(0.5)}px ${theme.shape.spacing(1)}px`,
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
    height: '100%',
    overflowY: 'auto',
  },
}));

export interface ChatWindowProps {
  entities: {
    messages: Pick<CommunicationMessageResult, 'message' | 'sender' | 'timestamp'>[];
    senderMap: Record<string, string>;
    senderId: string;
  };
  loading?: Partial<Record<keyof ChatWindowProps['entities'], boolean>>;
}

export const ChatWindow: FC<ChatWindowProps> = ({ entities, loading }) => {
  const { messages, senderMap, senderId } = entities;
  const styles = useMessageStyles();
  const bottomRef = useRef<HTMLDivElement | null>(null);

  // const { data, subscribeToMore } = useMessagesQuery();
  // useEffect(() => {
  //   const unSunbscribe = subscribeToMore<OnMessageReceivedSubscription>({
  //     document: OnMessageReceivedDocument,
  //     updateQuery: (prev, { subscriptionData }) => {
  //       if (!subscriptionData.data) return prev;

  //       const newMessage = subscriptionData.data.messageReceived;
  //       return Object.assign({}, prev, {
  //         messages: [...prev.messages, newMessage],
  //       });
  //     },
  //   });
  //   return () => unSunbscribe();
  // }, [subscribeToMore]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
  }, [messages]);

  return (
    <Card
      bodyProps={{
        classes: {
          background: theme => theme.palette.neutralLight,
        },
        className: clsx(styles.container),
      }}
    >
      {Boolean(loading?.messages) && <Loading text={'Loading messages'} />}
      {Boolean(loading?.messages) === false && (
        <div>
          {messages.map((x, i) => (
            <Fade key={i} in appear>
              <div
                className={clsx(
                  x.sender !== senderId ? styles.containerLeft : styles.containerRight,
                  styles.messageContainer
                )}
              >
                {x.sender !== messages[i - 1]?.sender && (
                  <Typography
                    className={clsx(x.sender !== senderId ? styles.textLeft : styles.textRight)}
                    variant="caption"
                    color="neutralMedium"
                  >
                    {senderMap[x.sender] || 'unknown'}
                  </Typography>
                )}
                <div style={{ display: 'flex' }} className={clsx(x.sender !== senderId ? styles.left : styles.right)}>
                  <span className={clsx(styles.message, x.sender !== senderId ? 'me' : 'you')}>{x.message}</span>
                </div>
                <Typography
                  className={clsx(x.sender !== senderId ? styles.textLeft : styles.textRight)}
                  variant="caption"
                >
                  {new Date(x.timestamp).toLocaleTimeString()}
                </Typography>
              </div>
            </Fade>
          ))}
          <div ref={bottomRef}></div>
        </div>
      )}
    </Card>
  );
};
