import React, { FC } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
/*lib imports end*/

import { EditMode, UserForm } from './UserForm';
/*components files imports end*/

import { QUERY_USER } from '../../graphql/admin';
import { defaultUser } from '../../models/User';
import Loading from '../core/Loading';
/*local files imports end*/

interface UserProps {
  mode: EditMode;
}

export const User: FC<UserProps> = ({ mode }) => {
  const { userId } = useParams<{ userId: string }>();
  const { data, loading } = useQuery(QUERY_USER, { variables: { id: userId } });
  if (loading) return <Loading />;
  return <UserForm user={data?.user || defaultUser} editMode={mode} title={'User edit'} />;
};

export default User;
