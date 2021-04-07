import { ApolloError } from '@apollo/client';
import React, { FC } from 'react';
import { useHistory } from 'react-router-dom';
import { User, UserInput, useUpdateUserMutation, useUserProfileQuery } from '../../generated/graphql';
import { useNotification } from '../../hooks/useNotification';
import { UserModel } from '../../models/User';
import { EditMode } from '../../utils/editMode';
import { UserForm } from '../Admin/User/UserForm';
import EditAvatar from '../Avatar/EditAvatar';
import { Loading } from '../core/Loading';
import Section, { Header as SectionHeader } from '../core/Section';

interface EditUserProfileProps {}

export const EditUserProfile: FC<EditUserProfileProps> = () => {
  const history = useHistory();
  const { data, loading } = useUserProfileQuery();
  const notify = useNotification();

  const [updateUser] = useUpdateUserMutation({
    onError: error => handleError(error),
    onCompleted: () => {
      notify('User updated successfully', 'success');
    },
  });

  const handleError = (error: ApolloError) => {
    console.log(error);
  };

  const handleSave = (user: UserModel) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id: userID, memberof, profile, ...rest } = user;

    const userInput: UserInput = {
      ...rest,
      profileData: {
        avatar: profile.avatar,
        description: profile.description,
        referencesData: [...profile.references].map(t => ({ name: t.name, uri: t.uri })),
        tagsetsData: [...profile.tagsets],
      },
    };

    updateUser({
      variables: {
        user: userInput,
        userId: Number(userID),
      },
    });
  };

  const handleCancel = () => history.goBack();

  const user = data?.me as User;
  if (loading) return <Loading text={'Loading User Profile ...'} />;
  return (
    <Section avatar={<EditAvatar profile={user.profile} />}>
      <SectionHeader text={'Profile'} />
      <UserForm
        user={{ ...user, aadPassword: '' } as UserModel}
        editMode={EditMode.edit}
        onSave={handleSave}
        onCancel={handleCancel}
      />
    </Section>
  );
};
export default EditUserProfile;
