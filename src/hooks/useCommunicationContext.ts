import { useContext } from 'react';
import { communicationContext } from '../context/CommunicationProvider';

export const useCommunicationContext = () => {
  const context = useContext(communicationContext);

  return {
    context,
  };
};
