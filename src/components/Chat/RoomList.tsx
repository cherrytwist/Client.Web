import React, { FC } from 'react';
import { Badge, Button, ListGroup } from 'react-bootstrap';

export interface Room {
  name: string;
  type: 'user' | 'room';
}

interface RoomListProps {
  rooms: Room[];
}

export const RoomList: FC<RoomListProps> = ({ rooms }) => {
  const handleCLick = (i: string) => {
    console.log(i);
  };

  return (
    <ListGroup>
      {rooms.map((x, i) => (
        <ListGroup.Item as={Button} key={i} onClick={() => handleCLick(i.toString())}>
          {x.name}
          {false && <Badge>1</Badge>}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};
export default RoomList;
