import { Organisation } from '../types/graphql-schema';
import { Reference, Tagset } from './Profile';

export interface UserModel {
  id: string;
  name: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city: string;
  country: string;
  gender: string;
  profile: {
    id?: string;
    description: string;
    avatar: string;
    tagsets: Tagset[];
    references: Reference[];
  };
  memberof?: {
    communities: Community[];
    organisations: Organisation[];
  };
}

interface Community {
  id: string;
  name: string;
  type: string;
  groups: Group[];
}
interface Group {
  id: string;
  name: string;
}
export const defaultUser: UserModel = {
  id: '',
  name: '',
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  city: '',
  country: '',
  gender: '',
  profile: {
    id: '',
    description: '',
    avatar: '',
    tagsets: [],
    references: [],
  },
  memberof: {
    organisations: [],
    communities: [],
  },
};

/*
Generated userForm interface for yup
*/
export interface UserFromGenerated {
  firstName: string;
  email: string;
  name: string;
  avatar: string;
  tagsets: Tagset[];
  references: Reference[];
  country: string;
  phone: string;
  lastName: string;
  city: string;
  gender: string;
  bio: string;
  profileId: string;
}

export interface Member {
  id: string;
  name: string;
  firstName: string;
  lastName: string;
  email: string;
}
