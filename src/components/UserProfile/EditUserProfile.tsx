import { ApolloError } from '@apollo/client';
import React, { FC } from 'react';
import { Alert, Container } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import {
  UpdateUserInput,
  useOnAvatarUploadedSubscription,
  User,
  useUpdateUserMutation,
  useUploadAvatarMutation,
  useUserProfileQuery,
} from '../../generated/graphql';
import { useNotification } from '../../hooks/useNotification';
import { UserModel } from '../../models/User';
import { EditMode } from '../../utils/editMode';
import { UserForm } from '../Admin/User/UserForm';
import { Loading } from '../core/Loading';

interface EditUserProfileProps {}

export const getUpdateUserInput = (user: UserModel) => {
  const { id: userID, memberof, profile, ...rest } = user;

  return {
    ...rest,
    ID: userID,
    profileData: {
      ID: user.profile.id || '',
      avatar: profile.avatar,
      description: profile.description,
      createReferencesData: profile.references.filter(r => !r.id).map(t => ({ name: t.name, uri: t.uri })),
      updateReferencesData: profile.references
        .filter(r => r.id)
        .map(t => ({ ID: Number(t.id), name: t.name, uri: t.uri })),
      updateTagsetsData: profile.tagsets
        .filter(t => t.id)
        .map(t => ({ ID: Number(t.id), name: t.name, tags: [...t.tags] })),
      createTagsetsData: profile.tagsets.filter(t => !t.id).map(t => ({ name: t.name, tags: [...t.tags] })),
    },
  } as UpdateUserInput;
};

export const EditUserProfile: FC<EditUserProfileProps> = () => {
  const history = useHistory();
  const { data, loading } = useUserProfileQuery();
  const notify = useNotification();
  const [uploadAvatar] = useUploadAvatarMutation();
  const [updateUser] = useUpdateUserMutation({
    onError: error => handleError(error),
    onCompleted: () => {
      notify('User updated successfully', 'success');
    },
  });

  const { data: avatarUpdated } = useOnAvatarUploadedSubscription();

  const handleError = (error: ApolloError) => {
    console.log(error);
  };

  const handleSave = (user: UserModel) => {
    updateUser({
      variables: {
        input: getUpdateUserInput(user),
      },
    });
  };

  const handleCancel = () => history.goBack();

  const handleAvatarChange = (file: File) => {
    if (user && user.id && user.profile?.id) {
      uploadAvatar({
        variables: {
          file,
          input: {
            file: '',
            profileID: user.profile.id,
          },
        },
      }).catch(err => handleError(err));
    }
  };

  if (loading) return <Loading text={'Loading User Profile ...'} />;
  const user = data?.me as User;
  return (
    <Container className={'mt-5'}>
      <Alert show={!!avatarUpdated} variant={'success'}>
        {avatarUpdated?.avatarUploaded.avatar}
      </Alert>
      <UserForm
        title={'Profile'}
        user={{ ...user } as UserModel}
        editMode={EditMode.edit}
        onSave={handleSave}
        onCancel={handleCancel}
        onAvatarChange={handleAvatarChange}
      />
    </Container>
  );
};
export default EditUserProfile;
