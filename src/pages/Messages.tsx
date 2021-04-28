import clsx from 'clsx';
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC, useEffect, useMemo, useRef, useState } from 'react';
import { Fade } from 'react-bootstrap';
import { useResizeDetector } from 'react-resize-detector';
import { ChatWindow, ChatWindowProps } from '../components/Chat/ChatWindow';
import MessageInput from '../components/Chat/MessageInput';
import RoomDetails from '../components/Chat/RoomDetails';
import RoomsWidget, { Room, RoomsWidgetProps } from '../components/Chat/RoomsWidget';
import Card from '../components/core/Card';
import Loading from '../components/core/Loading';
import Typography from '../components/core/Typography';
import { useMessagesQuery, useRoomQuery, useRoomsQuery, useSendMessageMutation } from '../generated/graphql';
import { MESSAGE_SUBSCRIPTION } from '../graphql/message';
import { useUpdateNavigation } from '../hooks/useNavigation';
import { createStyles } from '../hooks/useTheme';
import { useUserContext } from '../hooks/useUserContext';
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
  communicationContainer: {
    position: 'relative',
    overflow: 'hidden',
    display: 'flex',
    height: 'calc(100% - 40px)',
    flexGrow: 1,
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

const paths = {
  currentPaths: [],
};

const tempSenderMap = {
  '12': 'Nikola',
  '13': 'Nikola v2',
  '14': 'Nikola v3',
  '15': 'Nikola v4',
  '16': 'Nikola v5',
};

export const Messages: FC<PageProps> = () => {
  useUpdateNavigation(paths);

  //state
  const [room, setRoom] = useState<Room | null>(null);

  const { data: _rooms, loading: _roomsLoading, refetch: refetchRooms } = useRoomsQuery();
  // adding the send message here because we can initiate a conversation without the room context
  const [sendMessage] = useSendMessageMutation({
    onCompleted: data => {
      console.log(data);
      // refetch all rooms - def not the way, but good enough for a demo
      refetchRooms();
    },
    onError: () => {
      // handle errors
    },
  });

  const rooms = useMemo<Room[]>(
    () =>
      (_rooms?.me.rooms || []).map(r => ({
        identification: r as any,
        metadata: { name: tempSenderMap[r.receiverID || 'unknown'] },
      })),
    [_rooms?.me.rooms]
  );

  useEffect(() => {
    setRoom(x => x || rooms[0] || null);
  }, [setRoom, rooms]);

  if (_roomsLoading || !_rooms || !room) {
    return <Loading text={'Loading rooms'} />;
  }

  return (
    <RoomMessages
      entities={{ rooms, selected: room, senderMap: tempSenderMap }}
      actions={{
        onSelect: setRoom,
        onSendRequest: value => {
          // basic validation
          if (value && value !== '') {
            sendMessage({
              variables: {
                msgData: {
                  message: value,
                  roomID: room.identification.id,
                  receiverID: room.identification.receiverID || '',
                },
              },
            });

            return true;
          }
          return false;
        },
      }}
    />
  );
};

interface RoomMessageProps {
  entities: RoomsWidgetProps['entities'] & Pick<ChatWindowProps['entities'], 'senderMap'>;
  actions: RoomsWidgetProps['actions'] & {
    onSendRequest: (value: string) => boolean;
  };
}
export const RoomMessages: FC<RoomMessageProps> = ({ entities, actions }) => {
  const { selected, senderMap } = entities;
  const { user } = useUserContext();
  const { data: _room, loading: _roomLoading } = useRoomQuery({ variables: { id: selected.identification.id } });

  const messages = useMemo(() => _room?.me.room?.messages || [], [_room?.me.room?.messages]);

  // visuals
  const styles = useMessageStyles();
  const { ref: refChat, height } = useResizeDetector();

  return (
    <div className={styles.communicationContainer}>
      <div ref={refChat} style={{ position: 'absolute', inset: 0, zIndex: -1 }} />
      <div style={{ display: 'flex', flexDirection: 'column', width: 280, height: height }}>
        <RoomsWidget entities={entities} actions={actions} />
      </div>
      <div style={{ display: 'flex', flexGrow: 1, overflow: 'auto', height: height, flexDirection: 'column' }}>
        {/* The magic numbers here (70px => 10 margin for the input + the input height)*/}
        <div style={{ display: 'flex', overflow: 'auto', height: 'calc(100% - 70px)' }}>
          <ChatWindow
            entities={{ messages: messages, senderMap, senderId: user?.user.id || 'unknown' }}
            loading={{ messages: _roomLoading }}
          />
        </div>
        <div style={{ marginTop: 10 }}>
          <MessageInput
            actions={{
              onConfirm: actions.onSendRequest,
            }}
          />
        </div>
      </div>
      <div style={{ width: 320 }}>
        <RoomDetails entities={{ room: selected }} loading={{ room: _roomLoading }} />
      </div>
    </div>
  );
};
