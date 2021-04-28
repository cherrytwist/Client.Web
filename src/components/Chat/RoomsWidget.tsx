import clsx from 'clsx';
import React, { FC, useMemo, useState } from 'react';
import { Nav, Tab, Tabs } from 'react-bootstrap';
import { createStyles } from '../../hooks/useTheme';
import Avatar from '../core/Avatar';
import { Room } from './RoomList';

interface RoomsWidgetProps {
  rooms: Room[];
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
  active?: boolean;
}

const RoomItem: FC<RoomProps> = ({ room, active = false }) => {
  const styles = useRoomStyle();

  return (
    <div className={clsx(styles.room, active ? 'active' : '')}>
      <div className={clsx(styles.roomAvatar, 'mr-2')}>
        <Avatar size="md" />
      </div>
      <div className={clsx(styles.roomContent)}>
        <span>{room.name}</span>
      </div>
    </div>
  );
};

const communityTab = 'community';
const directMessagesTab = 'dms';

export const RoomsWidget: FC<RoomsWidgetProps> = ({ rooms }) => {
  const [activeTab, setActiveTab] = useState(directMessagesTab);
  const roomList = useMemo(() => rooms.filter(x => x.type === 'room'), rooms);
  const userList = useMemo(() => rooms.filter(x => x.type === 'user'), rooms);

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
              <RoomItem room={x} active={i === 1} />
            </Nav.Item>
          ))}
          {roomList.length === 0 && <span>{"It's lonely here"}</span>}
        </div>
      </Tab>
      <Tab eventKey={directMessagesTab} title={'Messages'}>
        <div className={styles.list}>
          {userList.map((x, i) => (
            <Nav.Item key={i}>
              <RoomItem room={x} />
            </Nav.Item>
          ))}
        </div>
      </Tab>
    </Tabs>
  );
};
export default RoomsWidget;
