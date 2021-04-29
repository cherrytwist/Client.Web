import { ApolloError } from '@apollo/client';
import React, { FC } from 'react';
import { useHistory } from 'react-router-dom';
import {
  useCreateReferenceOnProfileMutation,
  useCreateTagsetOnProfileMutation,
  useDeleteReferenceMutation,
  useMeQuery,
  useUpdateUserMutation,
} from '../../generated/graphql';
import { useNotification } from '../../hooks/useNotification';
import { UserModel } from '../../models/User';
import { UpdateUserInput, User } from '../../types/graphql-schema';
import { EditMode } from '../../utils/editMode';
import { Loading } from '../core/Loading';
import { UserForm } from './UserForm';

interface EditUserProfileProps {}

export const getUpdateUserInput = (user: UserModel): UpdateUserInput => {
  const { id: userID, email, memberof, profile, ...rest } = user;

  return {
    ...rest,
    ID: userID,
    profileData: {
      ID: user.profile.id || '',
      avatar: profile.avatar,
      description: profile.description,
      references: profile.references.filter(r => r.id).map(t => ({ ID: Number(t.id), name: t.name, uri: t.uri })),
      tagsets: profile.tagsets.filter(t => t.id).map(t => ({ ID: Number(t.id), name: t.name, tags: [...t.tags] })),
    },
  };
};

export const EditUserProfile: FC<EditUserProfileProps> = () => {
  const history = useHistory();
  const { data, loading } = useMeQuery();
  const notify = useNotification();
  const [createReference] = useCreateReferenceOnProfileMutation();
  const [deleteReference] = useDeleteReferenceMutation();
  const [createTagset] = useCreateTagsetOnProfileMutation();

  const [updateUser] = useUpdateUserMutation({
    onError: error => handleError(error),
    onCompleted: () => {
      notify('User updated successfully', 'success');
    },
  });

  const handleError = (error: ApolloError) => {
    notify(error.message, 'error');
  };

  const handleCancel = () => history.goBack();

  if (loading) return <Loading text={'Loading User Profile ...'} />;

  const user = data?.me as User;

  const handleSave = async (userToUpdate: UserModel) => {
    const profileId = userToUpdate.profile.id;
    const initialReferences = user?.profile?.references || [];
    const references = userToUpdate.profile.references;
    const toRemove = initialReferences.filter(x => x.id && !references.some(r => r.id && r.id === x.id));
    const toAdd = references.filter(x => !x.id);
    const tagsetsToAdd = userToUpdate.profile.tagsets.filter(x => !x.id);

    for (const ref of toRemove) {
      await deleteReference({ variables: { input: { ID: Number(ref.id) } } });
    }

    for (const ref of toAdd) {
      await createReference({
        variables: {
          input: {
            parentID: Number(profileId),
            name: ref.name,
            description: ref.description,
            uri: ref.uri,
          },
        },
      });
    }

    for (const tagset of tagsetsToAdd) {
      await createTagset({
        variables: {
          input: {
            name: tagset.name,
            tags: [...tagset.tags],
            parentID: Number(profileId),
          },
        },
      });
    }

    await updateUser({
      variables: {
        input: getUpdateUserInput(userToUpdate),
      },
    });
  };

  return (
    <UserForm
      title={'Profile'}
      user={{ ...user } as UserModel}
      editMode={EditMode.edit}
      onSave={handleSave}
      onCancel={handleCancel}
    />
  );
};
export default EditUserProfile;
