import { useContext } from 'react';
import { communicationContext } from '../context/CommunicationProvider';

export const useAuthenticationContext = () => {
  const context = useContext(communicationContext);

  return {
    context,
  };
};
