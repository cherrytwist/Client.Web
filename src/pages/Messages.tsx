import clsx from 'clsx';
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC, useEffect, useRef } from 'react';
import { Fade } from 'react-bootstrap';
import { ChatWindow } from '../components/Chat/ChatWindow';
import { Room } from '../components/Chat/RoomList';
import RoomsWidget from '../components/Chat/RoomsWidget';
import Card from '../components/core/Card';
import Section, { Header } from '../components/core/Section';
import Typography from '../components/core/Typography';
import { useMessagesQuery } from '../generated/graphql';
import { MESSAGE_SUBSCRIPTION } from '../graphql/message';
import { useUpdateNavigation } from '../hooks/useNavigation';
import { createStyles } from '../hooks/useTheme';
import { OnMessageReceivedSubscription } from '../types/graphql-schema';
import { PageProps } from './common';
// const date = new Date();
// const closure = (date, offset) => {
//   const newDate = new Date(date);
//   newDate.setMilliseconds(offset);
//   return newDate;
// };

// const messages = [
//   {
//     content: 'Hey! It is us! The cherrytwist developers!',
//     left: false,
//     delay: 1000,
//     date: closure(date, 1000),
//   },
//   {
//     content: 'Hi! Nice to meet you!',
//     left: true,
//     delay: 2500,
//     date: closure(date, 3500),
//   },
//   {
//     content: 'When can I expect the messaging system to be up and running?',
//     left: true,
//     delay: 2000,
//     date: closure(date, 5500),
//   },
//   {
//     content: 'Pretty soon! We are working hard to make this available for You.',
//     left: false,
//     delay: 3000,
//     date: closure(date, 8500),
//   },
//   {
//     content: 'Will you let me know when it is ready?',
//     left: true,
//     delay: 2000,
//     date: closure(date, 10500),
//   },
//   {
//     content: 'Of course! Do not forget to check your email! :)',
//     left: false,
//     delay: 2000,
//     date: closure(date, 12500),
//   },
// ];

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
export const DummyChat: FC = () => {
  const { data, subscribeToMore } = useMessagesQuery();
  const styles = useMessageStyles();
  const bottomRef = useRef<HTMLDivElement | null>(null);
  // const [messagesLeft, setMessagesLeft] = useState<
  //   Array<{ content: string; delay: number; left: boolean; date: Date }>
  // >([]);
  // const [displayedMessages, setDisplayedMessages] = useState<
  //   Array<{ content: string; delay: number; left: boolean; date: Date }>
  // >([]);
  // const [showLoader, setShowLoader] = useState({ right: false, left: false });

  useEffect(() => {
    const unSunbscribe = subscribeToMore<OnMessageReceivedSubscription>({
      document: MESSAGE_SUBSCRIPTION,
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

  // useEffect(() => {
  //   const [message, ...rest] = messagesLeft;
  //   let timeout: any = undefined;

  //   if (message) {
  //     setShowLoader({ left: message.left, right: !message.left });
  //     timeout = setTimeout(() => {
  //       setShowLoader({ right: false, left: false });
  //       setDisplayedMessages(x => [...x, message]);
  //       setMessagesLeft(rest);
  //     }, message.delay);
  //   }

  //   return () => clearTimeout(timeout);
  // }, [messagesLeft, setMessagesLeft, setDisplayedMessages, setShowLoader]);

  // useEffect(() => setMessagesLeft(messages), [setMessagesLeft]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
  }, [data]);

  return (
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
        {/* <Fade key="loader-right" in={showLoader.right}>
          <div className={clsx(styles.containerRight, styles.messageContainer, styles.loader)}>
            <div className={styles.containerRight}>
              <Spinner animation="grow" size="sm" />
              <Spinner animation="grow" size="sm" />
              <Spinner animation="grow" size="sm" />
            </div>
          </div>
        </Fade>
        <Fade key="loader-left" in={showLoader.left}>
          <div className={clsx(styles.containerLeft, styles.messageContainer, styles.loader)}>
            <div className={styles.containerLeft}>
              <Spinner animation="grow" size="sm" />
              <Spinner animation="grow" size="sm" />
              <Spinner animation="grow" size="sm" />
            </div>
          </div>
        </Fade> */}
        <div ref={bottomRef}></div>
      </div>
    </Card>
  );
};

const useContactStyles = createStyles(theme => ({
  contactContainer: {
    height: '100%',
  },
  contact: {
    padding: `${theme.shape.spacing(1)}px ${theme.shape.spacing(2)}px`,
    marginBotton: theme.shape.spacing(1),
    background: theme.palette.background,
    cursor: 'pointer',

    '&:hover': {
      background: theme.palette.primary,
      color: theme.palette.background,
    },
  },
  divider: {
    background: theme.palette.neutralLight,
    height: 1,
  },
  active: {
    borderLeft: `2px solid ${theme.palette.primary}`,
    color: theme.palette.primary,

    '& > h1': {
      color: theme.palette.positive,
    },

    '&:hover': {
      '& > h1': {
        color: theme.palette.background,
      },
    },
  },
}));

export const DummyChatList: FC = () => {
  const styles = useContactStyles();
  return (
    <Card
      bodyProps={{
        classes: {
          background: theme => theme.palette.neutralLight,
          padding: theme => `${theme.shape.spacing(0.5)}px`,
        },
      }}
    >
      <div className={clsx(styles.contact, styles.active)}>
        <Typography variant="h3" color="inherit" as="h3">
          Cherrytwist
        </Typography>
        <Typography variant="caption" color="inherit" as="h1">
          new messages
        </Typography>
      </div>
      <div className={styles.divider}></div>
      <div className={styles.contact}>
        <Typography variant="h3" color="inherit">
          Community
        </Typography>
        <Typography variant="caption" color="inherit" as="h1">
          Work in progress
        </Typography>
      </div>
      <div className={styles.divider}></div>
    </Card>
  );
};

const paths = {
  currentPaths: [],
};

const rooms: Room[] = [
  { name: 'Challenge', type: 'room' },
  { name: 'Opportunity', type: 'room' },
  { name: 'Organization', type: 'room' },
  { name: 'Neo', type: 'user' },
  { name: 'Chris P. Bacon', type: 'user' },
  { name: 'Mr. Smith', type: 'user' },
];

export const Messages: FC<PageProps> = () => {
  useUpdateNavigation(paths);

  return (
    <>
      <Section gutters={{ root: true, avatar: false, content: false }}>
        <Header text="Pesho" tagText="Online" />
      </Section>
      <Section
        details={<span>Details</span>}
        gutters={{ root: true, avatar: false, content: false }}
        avatar={<RoomsWidget rooms={rooms} />}
      >
        <ChatWindow />
      </Section>
    </>
  );
};
