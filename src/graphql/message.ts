import { gql } from '@apollo/client';

export const MESSAGES_QUERY = gql`
  query messages {
    messages {
      id
      message
      reciever
      sender
      timestamp
    }
  }
`;

export const MESSAGE_SUBSCRIPTION = gql`
  subscription messageReceived {
    messageReceived {
      id
      message
      reciever
      sender
      timestamp
    }
  }
`;
