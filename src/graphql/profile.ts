import { gql } from '@apollo/client';

export const AVATAR_FRAGMENT = gql`
  fragment Avatar on Profile {
    id
    avatar
  }
`;

export const UPLOAD_AVATAR_MUTATION = gql`
  mutation uploadAvatar($file: Upload!, $input: UploadProfileAvatarInput!) {
    uploadAvatar(file: $file, uploadData: $input) {
      ...Avatar
    }
  }
  ${AVATAR_FRAGMENT}
`;

export const AVATAR_UPDATED_SUBSCRIPTION = gql`
  subscription OnAvatarUploaded {
    avatarUploaded {
      id
      avatar
    }
  }
`;
