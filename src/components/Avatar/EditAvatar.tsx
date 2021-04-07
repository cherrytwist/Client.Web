import { ApolloError } from '@apollo/client';
import React, { FC } from 'react';
import { Form } from 'react-bootstrap';
import { Profile, useUploadAvatarMutation } from '../../generated/graphql';
import Avatar from '../core/Avatar';
import UploadButton from '../core/UploadButton';

interface EditAvatarProps {
  profile?: Profile;
}

export const EditAvatar: FC<EditAvatarProps> = ({ profile }) => {
  const [uploadAvatar] = useUploadAvatarMutation();

  const handleAvatarChange = (file: File) => {
    if (profile?.id) {
      uploadAvatar({
        variables: {
          profileId: Number(profile.id),
          file,
        },
      }).catch(err => handleError(err));
    }
  };

  const handleError = (error: ApolloError) => {
    console.log(error);
  };

  return (
    <>
      {profile && (
        <>
          <Form.Row>
            <Avatar src={profile?.avatar} size={'lg'} className={'mb-2'} name={'Avatar'} />
          </Form.Row>
          <Form.Row>
            <UploadButton
              accept={'image/*'}
              onChange={e => {
                const file = e && e.target && e.target.files && e.target.files[0];
                if (file) handleAvatarChange(file);
              }}
              className={'mb-4'}
              small
            >
              Edit
            </UploadButton>
          </Form.Row>
        </>
      )}
    </>
  );
};
export default EditAvatar;
