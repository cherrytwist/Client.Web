import React, { FC } from 'react';
import { createStyles } from '../../hooks/useTheme';
import Typography from '../core/Typography';
import { Room } from './RoomList';

interface RoomDetailsProps {
  room: Room;
}

const useDetailsStyle = createStyles({
  container: {
    padding: '16px',
  },
  header: {},
});

export const RoomDetails: FC<RoomDetailsProps> = ({ room }) => {
  const styles = useDetailsStyle();

  return (
    <div className={styles.container}>
      <Typography variant="h4">{room.name}</Typography>
    </div>
  );
};
export default RoomDetails;
