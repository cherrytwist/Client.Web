import clsx from 'clsx';
import React, { FC, useMemo, useState } from 'react';
import { Nav, Tab, Tabs } from 'react-bootstrap';
import { createStyles } from '../../hooks/useTheme';
import { CommunicationRoomResult } from '../../types/graphql-schema';
import Avatar from '../core/Avatar';

export type Room = { identification: CommunicationRoomResult; metadata: any };

export interface RoomsWidgetProps {
  entities: {
    selected: Room;
    rooms: Room[];
  };
  actions: RoomProps['actions'];
}

const useRoomStyle = createStyles(theme => ({
  list: {
    padding: '16px 8px 0 8px',
  },
  room: {
    alignItems: 'center',
    display: 'flex',
    padding: `${theme.shape.spacing(0.5)}px ${theme.shape.spacing(0.5)}px`,
    border: `1px solid ${theme.palette.background}`,
    borderRadius: theme.shape.borderRadius,
    cursor: 'pointer',
    overflow: 'hidden',

    '&:hover': {
      background: theme.palette.neutralLight,
    },

    '&.active': {
      background: theme.palette.neutralLight,
    },
    '&:hover .roomClose': {
      display: 'block',
    },
    width: '100%',
  },
  roomContent: {
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    flex: '1 1 auto',
  },
  roomAvatar: {},
  roomClose: {
    display: 'none',
  },
}));

interface RoomProps {
  room: Room;
  actions: {
    onSelect: (room: Room) => void;
  };
  active?: boolean;
}

const RoomItem: FC<RoomProps> = ({ room, active = false, actions }) => {
  const styles = useRoomStyle();

  return (
    <div
      className={clsx(styles.room, active && 'active')}
      onClick={() => {
        actions.onSelect(room);
      }}
    >
      <div className={clsx(styles.roomAvatar, 'mr-2')}>
        <Avatar size="md" />
      </div>
      <div className={clsx(styles.roomContent)}>
        <span>{room.metadata.name || room.identification.id}</span>
      </div>
    </div>
  );
};

const communityTab = 'community';
const directMessagesTab = 'dms';

export const RoomsWidget: FC<RoomsWidgetProps> = ({ entities, actions }) => {
  const [activeTab, setActiveTab] = useState(directMessagesTab);
  const { rooms, selected } = entities;

  const roomList = useMemo(() => rooms.filter(x => x.identification.isDirect === false), rooms);
  const userList = useMemo(() => rooms.filter(x => x.identification.isDirect && x.identification.receiverID), rooms);

  const styles = useRoomStyle();
  return (
    <Tabs
      activeKey={activeTab}
      id="tabs-id"
      onSelect={k => {
        k && setActiveTab(k);
      }}
    >
      <Tab eventKey={communityTab} title={'Communities'} disabled>
        <div className={styles.list}>
          {roomList.map((x, i) => (
            <Nav.Item key={i}>
              <RoomItem room={x} active={x === selected} actions={actions} />
            </Nav.Item>
          ))}
          {roomList.length === 0 && <span>{"It's lonely here"}</span>}
        </div>
      </Tab>
      <Tab eventKey={directMessagesTab} title={'Messages'}>
        <div className={styles.list}>
          {userList.map((x, i) => (
            <Nav.Item key={i}>
              <RoomItem room={x} active={x === selected} actions={actions} />
            </Nav.Item>
          ))}
        </div>
      </Tab>
    </Tabs>
  );
};
export default RoomsWidget;
