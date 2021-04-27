import clsx from 'clsx';
import React, { FC, useMemo } from 'react';
import { Nav } from 'react-bootstrap';
import { createStyles } from '../../hooks/useTheme';
import Avatar from '../core/Avatar';
import Button from '../core/Button';
import { Room } from './RoomList';

interface RoomsWidgetProps {
  rooms: Room[];
}

const useRoomStyle = createStyles(theme => ({
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
  sideBar: {
    width: '240px',
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
      <div className={clsx(styles.roomClose, 'roomClose')}>
        <Button small>X</Button>
      </div>
    </div>
  );
};

export const RoomsWidget: FC<RoomsWidgetProps> = ({ rooms }) => {
  const roomList = useMemo(() => rooms.filter(x => x.type === 'room'), rooms);
  const userList = useMemo(() => rooms.filter(x => x.type === 'user'), rooms);
  const styles = useRoomStyle();
  return (
    <div className={clsx(styles.sideBar)}>
      <Nav className={'flex-column'}>
        <Nav.Item>Rooms</Nav.Item>
        {roomList.map((x, i) => (
          <Nav.Item key={i}>
            <RoomItem room={x} active={i === 1} />
          </Nav.Item>
        ))}
        <Nav.Item>Users</Nav.Item>
        {userList.map((x, i) => (
          <Nav.Item key={i}>
            <RoomItem room={x} />
          </Nav.Item>
        ))}
      </Nav>
    </div>
  );
};
export default RoomsWidget;
