import React, { FC } from 'react';
import { useMyCommunitiesQuery, useRoomsQuery } from '../generated/graphql';
import { CommunicationRoomResult, Community } from '../types/graphql-schema';

export interface CommunicationContextProps {
  rooms: CommunicationRoomResult[];
  communities: Omit<Community, 'applications' | 'groups'>[];
}

const communicationContext = React.createContext<CommunicationContextProps>({
  communities: [],
  rooms: [],
});

interface CommunicationProviderProps {}

const CommunicationProvider: FC<CommunicationProviderProps> = ({ children }) => {
  const { data } = useRoomsQuery();
  const { data: communityData } = useMyCommunitiesQuery();
  return (
    <communicationContext.Provider
      value={{
        communities: communityData?.me.memberof?.communities || [],
        rooms: data?.me.rooms || [],
      }}
    >
      {children}
    </communicationContext.Provider>
  );
};

export { CommunicationProvider, communicationContext };
