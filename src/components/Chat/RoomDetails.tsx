import React, { FC } from 'react';
import { createStyles } from '../../hooks/useTheme';
import { CommunicationRoomResult } from '../../types/graphql-schema';
import Loading from '../core/Loading';
import Typography from '../core/Typography';

interface RoomDetailsProps {
  entities: {
    room: { identification: CommunicationRoomResult; metadata: any };
  };
  loading?: Partial<Record<keyof RoomDetailsProps['entities'], boolean>>;
}

const useDetailsStyle = createStyles({
  container: {
    padding: '16px',
  },
  header: {},
});

export const RoomDetails: FC<RoomDetailsProps> = ({ entities, loading }) => {
  const styles = useDetailsStyle();
  const { room } = entities;

  if (loading?.room) {
    return <Loading text={'Fetching details'} />;
  }

  return (
    <div className={styles.container}>
      <Typography variant="h4">{room.identification.receiverID}</Typography>
    </div>
  );
};

export default RoomDetails;
