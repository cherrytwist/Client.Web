export type Maybe<T> = T | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: any;
  /** A human readable identifier, 3 <= length <= 25. Used for URL paths in clients. Characters allowed: a-z,A-Z,0-9. */
  NameID: string;
  /** A uuid identifier. Length 36 charachters. */
  UUID: string;
  /** A UUID or NameID identifier. */
  UUID_NAMEID: string;
  /** A UUID or Email identifier. */
  UUID_NAMEID_EMAIL: string;
  /** The `Upload` scalar type represents a file upload. */
  Upload: File;
};

export type Actor = {
  __typename?: 'Actor';
  /** The authorization rules for the entity */
  authorization?: Maybe<Authorization>;
  /** A description of this actor */
  description?: Maybe<Scalars['String']>;
  /** The ID of the entity */
  id: Scalars['UUID'];
  /** The change / effort required of this actor */
  impact?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  /** A value derived by this actor */
  value?: Maybe<Scalars['String']>;
};

export type ActorGroup = {
  __typename?: 'ActorGroup';
  /** The set of actors in this actor group */
  actors?: Maybe<Array<Actor>>;
  /** The authorization rules for the entity */
  authorization?: Maybe<Authorization>;
  /** A description of this group of actors */
  description?: Maybe<Scalars['String']>;
  /** The ID of the entity */
  id: Scalars['UUID'];
  name: Scalars['String'];
};

export type Agent = {
  __typename?: 'Agent';
  /** The Credentials held by this Agent. */
  credentials?: Maybe<Array<Credential>>;
  /** The Decentralized Identifier (DID) for this Agent. */
  did?: Maybe<Scalars['String']>;
  /** The ID of the entity */
  id: Scalars['UUID'];
};

export type Application = {
  __typename?: 'Application';
  /** The authorization rules for the entity */
  authorization?: Maybe<Authorization>;
  /** The ID of the entity */
  id: Scalars['UUID'];
  lifecycle: Lifecycle;
  questions: Array<Question>;
  user: User;
};

export type ApplicationEventInput = {
  applicationID: Scalars['UUID'];
  eventName: Scalars['String'];
};

export type ApplicationTemplate = {
  __typename?: 'ApplicationTemplate';
  /** Application template name. */
  name: Scalars['String'];
  /** Template questions. */
  questions: Array<QuestionTemplate>;
};

export type Aspect = {
  __typename?: 'Aspect';
  /** The authorization rules for the entity */
  authorization?: Maybe<Authorization>;
  explanation: Scalars['String'];
  framing: Scalars['String'];
  /** The ID of the entity */
  id: Scalars['UUID'];
  title: Scalars['String'];
};

export type AssignChallengeLeadInput = {
  challengeID: Scalars['UUID'];
  organisationID: Scalars['UUID_NAMEID'];
};

export type AssignCommunityMemberInput = {
  communityID: Scalars['UUID'];
  userID: Scalars['UUID_NAMEID_EMAIL'];
};

export type AssignUserGroupMemberInput = {
  groupID: Scalars['UUID'];
  userID: Scalars['UUID_NAMEID_EMAIL'];
};

export type AuthenticationConfig = {
  __typename?: 'AuthenticationConfig';
  /** Is authentication enabled? */
  enabled: Scalars['Boolean'];
  /** Cherrytwist Authentication Providers Config. */
  providers: Array<AuthenticationProviderConfig>;
};

export type AuthenticationProviderConfig = {
  __typename?: 'AuthenticationProviderConfig';
  /** Configuration of the authenticaiton provider */
  config: AuthenticationProviderConfigUnion;
  /** Is the authentication provider enabled? */
  enabled: Scalars['Boolean'];
  /** CDN location of an icon of the authentication provider login button. */
  icon: Scalars['String'];
  /** Label of the authentication provider. */
  label: Scalars['String'];
  /** Name of the authentication provider. */
  name: Scalars['String'];
};

export type AuthenticationProviderConfigUnion = OryConfig;

export type Authorization = {
  __typename?: 'Authorization';
  anonymousReadAccess: Scalars['Boolean'];
  credentialRules: Scalars['String'];
  /** The ID of the entity */
  id: Scalars['UUID'];
};

export enum AuthorizationCredential {
  ChallengeAdmin = 'ChallengeAdmin',
  ChallengeMember = 'ChallengeMember',
  EcoverseAdmin = 'EcoverseAdmin',
  EcoverseMember = 'EcoverseMember',
  GlobalAdmin = 'GlobalAdmin',
  GlobalAdminChallenges = 'GlobalAdminChallenges',
  GlobalAdminCommunity = 'GlobalAdminCommunity',
  GlobalRegistered = 'GlobalRegistered',
  OpportunityMember = 'OpportunityMember',
  OrganisationAdmin = 'OrganisationAdmin',
  OrganisationMember = 'OrganisationMember',
  UserGroupMember = 'UserGroupMember',
  UserSelfManagement = 'UserSelfManagement',
}

export enum AuthorizationPrivilege {
  Create = 'CREATE',
  Delete = 'DELETE',
  Grant = 'GRANT',
  Read = 'READ',
  Update = 'UPDATE',
}

export type Challenge = {
  __typename?: 'Challenge';
  /** The activity within this Challenge. */
  activity?: Maybe<Array<Nvp>>;
  /** The Agent representing this Challenge. */
  agent?: Maybe<Agent>;
  /** The authorization rules for the entity */
  authorization?: Maybe<Authorization>;
  /** The set of child Challenges within this challenge. */
  challenges?: Maybe<Array<Challenge>>;
  /** The community for the challenge. */
  community?: Maybe<Community>;
  /** The context for the challenge. */
  context?: Maybe<Context>;
  /** The display name. */
  displayName: Scalars['String'];
  /** The ID of the entity */
  id: Scalars['UUID'];
  /** The Organisations that are leading this Challenge. */
  leadOrganisations: Array<Organisation>;
  /** The lifeycle for the Challenge. */
  lifecycle?: Maybe<Lifecycle>;
  /** A name identifier of the entity, unique within a given scope. */
  nameID: Scalars['NameID'];
  /** The Opportunities for the challenge. */
  opportunities?: Maybe<Array<Opportunity>>;
  /** The set of tags for the challenge */
  tagset?: Maybe<Tagset>;
};

export type ChallengeEventInput = {
  ID: Scalars['UUID'];
  eventName: Scalars['String'];
};

export type ChallengeTemplate = {
  __typename?: 'ChallengeTemplate';
  /** Application templates. */
  applications?: Maybe<Array<ApplicationTemplate>>;
  /** Challenge template name. */
  name: Scalars['String'];
};

export type Community = Groupable & {
  __typename?: 'Community';
  /** Application available for this community. */
  applications: Array<Application>;
  /** The authorization rules for the entity */
  authorization?: Maybe<Authorization>;
  /** The name of the Community */
  displayName: Scalars['String'];
  /** Groups of users related to a Community. */
  groups?: Maybe<Array<UserGroup>>;
  /** The ID of the entity */
  id: Scalars['UUID'];
  /** All users that are contributing to this Community. */
  members?: Maybe<Array<User>>;
};

export type Config = {
  __typename?: 'Config';
  /** Cherrytwist authentication configuration. */
  authentication: AuthenticationConfig;
  /** Cherrytwist template configuration. */
  template: Template;
};

export type Context = {
  __typename?: 'Context';
  /** The Aspects for this Context. */
  aspects?: Maybe<Array<Aspect>>;
  /** The authorization rules for the entity */
  authorization?: Maybe<Authorization>;
  /** A detailed description of the current situation */
  background?: Maybe<Scalars['String']>;
  /** The EcosystemModel for this Context. */
  ecosystemModel?: Maybe<EcosystemModel>;
  /** The ID of the entity */
  id: Scalars['UUID'];
  /** What is the potential impact? */
  impact?: Maybe<Scalars['String']>;
  /** A list of URLs to relevant information. */
  references?: Maybe<Array<Reference>>;
  /** A one line description */
  tagline?: Maybe<Scalars['String']>;
  /** The goal that is being pursued */
  vision?: Maybe<Scalars['String']>;
  /** Who should get involved in this challenge */
  who?: Maybe<Scalars['String']>;
};

export type CreateActorGroupInput = {
  description?: Maybe<Scalars['String']>;
  ecosystemModelID: Scalars['UUID'];
  name: Scalars['String'];
};

export type CreateActorInput = {
  actorGroupID: Scalars['UUID'];
  description?: Maybe<Scalars['String']>;
  impact?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  value?: Maybe<Scalars['String']>;
};

export type CreateApplicationInput = {
  parentID: Scalars['UUID'];
  questions: Array<CreateNvpInput>;
  userID: Scalars['UUID_NAMEID_EMAIL'];
};

export type CreateAspectInput = {
  explanation: Scalars['String'];
  framing: Scalars['String'];
  parentID: Scalars['UUID'];
  title: Scalars['String'];
};

export type CreateChallengeInput = {
  context?: Maybe<CreateContextInput>;
  /** The display name for the entity. */
  displayName?: Maybe<Scalars['String']>;
  lifecycleTemplate?: Maybe<Scalars['String']>;
  /** A readable identifier, unique within the containing scope. */
  nameID: Scalars['NameID'];
  parentID: Scalars['UUID_NAMEID'];
  tags?: Maybe<Array<Scalars['String']>>;
};

export type CreateContextInput = {
  background?: Maybe<Scalars['String']>;
  impact?: Maybe<Scalars['String']>;
  /** Set of References for the new Context. */
  references?: Maybe<Array<CreateReferenceInput>>;
  tagline?: Maybe<Scalars['String']>;
  vision?: Maybe<Scalars['String']>;
  who?: Maybe<Scalars['String']>;
};

export type CreateEcoverseInput = {
  context?: Maybe<CreateContextInput>;
  /** The display name for the entity. */
  displayName?: Maybe<Scalars['String']>;
  /** The host Organisation for the ecoverse */
  hostID?: Maybe<Scalars['UUID_NAMEID']>;
  lifecycleTemplate?: Maybe<Scalars['String']>;
  /** A readable identifier, unique within the containing scope. */
  nameID: Scalars['NameID'];
  tags?: Maybe<Array<Scalars['String']>>;
};

export type CreateNvpInput = {
  name: Scalars['String'];
  value: Scalars['String'];
};

export type CreateOpportunityInput = {
  challengeID: Scalars['UUID_NAMEID'];
  context?: Maybe<CreateContextInput>;
  /** The display name for the entity. */
  displayName?: Maybe<Scalars['String']>;
  lifecycleTemplate?: Maybe<Scalars['String']>;
  /** A readable identifier, unique within the containing scope. */
  nameID: Scalars['NameID'];
  tags?: Maybe<Array<Scalars['String']>>;
};

export type CreateOrganisationInput = {
  /** The display name for the entity. */
  displayName?: Maybe<Scalars['String']>;
  /** A readable identifier, unique within the containing scope. */
  nameID: Scalars['NameID'];
  profileData?: Maybe<CreateProfileInput>;
};

export type CreateProfileInput = {
  avatar?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  referencesData?: Maybe<Array<CreateReferenceInput>>;
  tagsetsData?: Maybe<Array<CreateTagsetInput>>;
};

export type CreateProjectInput = {
  description?: Maybe<Scalars['String']>;
  /** The display name for the entity. */
  displayName?: Maybe<Scalars['String']>;
  /** A readable identifier, unique within the containing scope. */
  nameID: Scalars['NameID'];
  opportunityID: Scalars['UUID_NAMEID'];
};

export type CreateReferenceInput = {
  description?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  uri?: Maybe<Scalars['String']>;
};

export type CreateReferenceOnContextInput = {
  contextID: Scalars['UUID'];
  description?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  uri?: Maybe<Scalars['String']>;
};

export type CreateReferenceOnProfileInput = {
  description?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  profileID: Scalars['UUID'];
  uri?: Maybe<Scalars['String']>;
};

export type CreateRelationInput = {
  actorName: Scalars['String'];
  actorRole?: Maybe<Scalars['String']>;
  actorType?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  parentID: Scalars['String'];
  type: Scalars['String'];
};

export type CreateTagsetInput = {
  name: Scalars['String'];
  tags?: Maybe<Array<Scalars['String']>>;
};

export type CreateTagsetOnProfileInput = {
  name: Scalars['String'];
  profileID?: Maybe<Scalars['UUID']>;
  tags?: Maybe<Array<Scalars['String']>>;
};

export type CreateUserGroupInput = {
  name: Scalars['String'];
  parentID: Scalars['UUID'];
  profileData?: Maybe<CreateProfileInput>;
};

export type CreateUserInput = {
  accountUpn?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  /** The display name for the entity. */
  displayName?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  firstName?: Maybe<Scalars['String']>;
  gender?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  /** A readable identifier, unique within the containing scope. */
  nameID: Scalars['NameID'];
  phone?: Maybe<Scalars['String']>;
  profileData?: Maybe<CreateProfileInput>;
};

export type Credential = {
  __typename?: 'Credential';
  /** The ID of the entity */
  id: Scalars['UUID'];
  resourceID: Scalars['String'];
  type: AuthorizationCredential;
};

export type DeleteActorGroupInput = {
  ID: Scalars['UUID'];
};

export type DeleteActorInput = {
  ID: Scalars['UUID'];
};

export type DeleteApplicationInput = {
  ID: Scalars['UUID'];
};

export type DeleteAspectInput = {
  ID: Scalars['UUID'];
};

export type DeleteChallengeInput = {
  ID: Scalars['UUID'];
};

export type DeleteEcoverseInput = {
  ID: Scalars['UUID_NAMEID'];
};

export type DeleteOpportunityInput = {
  ID: Scalars['UUID'];
};

export type DeleteOrganisationInput = {
  ID: Scalars['UUID'];
};

export type DeleteProjectInput = {
  ID: Scalars['UUID'];
};

export type DeleteReferenceInput = {
  ID: Scalars['UUID'];
};

export type DeleteRelationInput = {
  ID: Scalars['String'];
};

export type DeleteUserGroupInput = {
  ID: Scalars['UUID'];
};

export type DeleteUserInput = {
  ID: Scalars['UUID'];
};

export type EcosystemModel = {
  __typename?: 'EcosystemModel';
  /** A list of ActorGroups */
  actorGroups?: Maybe<Array<ActorGroup>>;
  /** The authorization rules for the entity */
  authorization?: Maybe<Authorization>;
  /** Overview of this ecosystem model. */
  description?: Maybe<Scalars['String']>;
  /** The ID of the entity */
  id: Scalars['UUID'];
};

export type Ecoverse = {
  __typename?: 'Ecoverse';
  /** The activity within this Ecoverse. */
  activity?: Maybe<Array<Nvp>>;
  /** The Agent representing this Ecoverse. */
  agent?: Maybe<Agent>;
  /** All applications to join */
  application: Application;
  /** The authorization rules for the entity */
  authorization?: Maybe<Authorization>;
  /** A particular Challenge, either by its ID or nameID */
  challenge: Challenge;
  /** The challenges for the ecoverse. */
  challenges?: Maybe<Array<Challenge>>;
  /** The community for the ecoverse. */
  community?: Maybe<Community>;
  /** The context for the ecoverse. */
  context?: Maybe<Context>;
  /** The display name. */
  displayName: Scalars['String'];
  /** The user group with the specified id anywhere in the ecoverse */
  group: UserGroup;
  /** The User Groups on this Ecoverse */
  groups: Array<UserGroup>;
  /** All groups on this Ecoverse that have the provided tag */
  groupsWithTag: Array<UserGroup>;
  /** The organisation that hosts this Ecoverse instance */
  host?: Maybe<Organisation>;
  /** The ID of the entity */
  id: Scalars['UUID'];
  /** A name identifier of the entity, unique within a given scope. */
  nameID: Scalars['NameID'];
  /** All opportunities within the ecoverse */
  opportunities: Array<Opportunity>;
  /** A particular Opportunity, either by its ID or nameID */
  opportunity: Opportunity;
  /** A particular Project, identified by the ID */
  project: Project;
  /** All projects within this ecoverse */
  projects: Array<Project>;
  /** The set of tags for the  ecoverse. */
  tagset?: Maybe<Tagset>;
};

export type EcoverseApplicationArgs = {
  ID: Scalars['UUID'];
};

export type EcoverseChallengeArgs = {
  ID: Scalars['UUID_NAMEID'];
};

export type EcoverseGroupArgs = {
  ID: Scalars['UUID'];
};

export type EcoverseGroupsWithTagArgs = {
  tag: Scalars['String'];
};

export type EcoverseOpportunityArgs = {
  ID: Scalars['UUID_NAMEID'];
};

export type EcoverseProjectArgs = {
  ID: Scalars['UUID_NAMEID'];
};

export type EcoverseTemplate = {
  __typename?: 'EcoverseTemplate';
  /** Application templates. */
  applications?: Maybe<Array<ApplicationTemplate>>;
  /** Ecoverse template name. */
  name: Scalars['String'];
};

export type GrantAuthorizationCredentialInput = {
  /** The resource to which this credential is tied. */
  resourceID?: Maybe<Scalars['UUID']>;
  type: AuthorizationCredential;
  /** The user to whom the credential is being granted. */
  userID: Scalars['UUID_NAMEID_EMAIL'];
};

export type Groupable = {
  /** The groups contained by this entity. */
  groups?: Maybe<Array<UserGroup>>;
};

export type Lifecycle = {
  __typename?: 'Lifecycle';
  /** The ID of the entity */
  id: Scalars['UUID'];
  /** The machine definition, describing the states, transitions etc for this Lifeycle. */
  machineDef: Scalars['JSON'];
  /** The next events of this Lifecycle. */
  nextEvents?: Maybe<Array<Scalars['String']>>;
  /** The current state of this Lifecycle. */
  state?: Maybe<Scalars['String']>;
  /** The Lifecycle template name. */
  templateName?: Maybe<Scalars['String']>;
};

export type Membership = {
  __typename?: 'Membership';
  /** Details of Ecoverses the user is a member of, with child memberships */
  ecoverses: Array<MembershipResultEntryEcoverse>;
  /** Details of the Organisations the user is a member of, with child memberships. */
  organisations: Array<MembershipResultEntryOrganisation>;
};

export type MembershipInput = {
  /** The ID of the user to retrieve the membership of. */
  userID: Scalars['UUID_NAMEID_EMAIL'];
};

export type MembershipResultEntry = {
  __typename?: 'MembershipResultEntry';
  /** Display name of the entity */
  displayName: Scalars['String'];
  /** The ID of the entry the user is a member of. */
  id: Scalars['UUID'];
  /** Name Identifier of the entity */
  nameID: Scalars['NameID'];
};

export type MembershipResultEntryEcoverse = {
  __typename?: 'MembershipResultEntryEcoverse';
  /** Details of the Challenges the user is a member of */
  challenges: Array<MembershipResultEntry>;
  /** Display name of the entity */
  displayName: Scalars['String'];
  /** The ID of the entry the user is a member of. */
  id: Scalars['UUID'];
  /** Name Identifier of the entity */
  nameID: Scalars['NameID'];
  /** Details of the Opportunities the user is a member of */
  opportunities: Array<MembershipResultEntry>;
  /** Details of the UserGroups the user is a member of */
  userGroups: Array<MembershipResultEntry>;
};

export type MembershipResultEntryOrganisation = {
  __typename?: 'MembershipResultEntryOrganisation';
  /** Display name of the entity */
  displayName: Scalars['String'];
  /** The ID of the entry the user is a member of. */
  id: Scalars['UUID'];
  /** Name Identifier of the entity */
  nameID: Scalars['NameID'];
  /** Details of the UserGroups the user is a member of */
  userGroups: Array<MembershipResultEntry>;
};

export type Metadata = {
  __typename?: 'Metadata';
  /** Metrics about the activity on the platform */
  activity: Array<Nvp>;
  /** Collection of metadata about Cherrytwist services. */
  services: Array<ServiceMetadata>;
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Assigns an organisation as a lead for the Challenge. */
  assignChallengeLead: Challenge;
  /** Assigns a User as a member of the specified Community. */
  assignUserToCommunity: Community;
  /** Assigns a User as a member of the specified User Group. */
  assignUserToGroup: UserGroup;
  /** Creates a new Actor in the specified ActorGroup. */
  createActor: Actor;
  /** Create a new Actor Group on the EcosystemModel. */
  createActorGroup: ActorGroup;
  /** Creates Application for a User to join this Community. */
  createApplication: Application;
  /** Create a new Aspect on the Opportunity. */
  createAspect: Aspect;
  /** Create a new Aspect on the Project. */
  createAspectOnProject: Aspect;
  /** Creates a new Challenge within the specified Ecoverse. */
  createChallenge: Challenge;
  /** Creates a new child challenge within the parent Challenge. */
  createChildChallenge: Challenge;
  /** Creates a new Ecoverse. */
  createEcoverse: Ecoverse;
  /** Creates a new User Group in the specified Community. */
  createGroupOnCommunity: UserGroup;
  /** Creates a new User Group for the specified Organisation. */
  createGroupOnOrganisation: UserGroup;
  /** Creates a new Opportunity within the parent Challenge. */
  createOpportunity: Opportunity;
  /** Creates a new Organisation on the platform. */
  createOrganisation: Organisation;
  /** Create a new Project on the Opportunity */
  createProject: Project;
  /** Creates a new Reference on the specified Context. */
  createReferenceOnContext: Reference;
  /** Creates a new Reference on the specified Profile. */
  createReferenceOnProfile: Reference;
  /** Create a new Relation on the Opportunity. */
  createRelation: Relation;
  /** Creates a new Tagset on the specified Profile */
  createTagsetOnProfile: Tagset;
  /** Creates a new User on the platform. */
  createUser: User;
  /** Deletes the specified Actor. */
  deleteActor: Actor;
  /** Deletes the specified Actor Group, including contained Actors. */
  deleteActorGroup: ActorGroup;
  /** Deletes the specified Aspect. */
  deleteAspect: Aspect;
  /** Deletes the specified Challenge. */
  deleteChallenge: Challenge;
  /** Deletes the specified Ecoverse. */
  deleteEcoverse: Ecoverse;
  /** Deletes the specified Opportunity. */
  deleteOpportunity: Opportunity;
  /** Deletes the specified Organisation. */
  deleteOrganisation: Organisation;
  /** Deletes the specified Project. */
  deleteProject: Project;
  /** Deletes the specified Reference. */
  deleteReference: Reference;
  /** Deletes the specified Relation. */
  deleteRelation: Relation;
  /** Deletes the specified User. */
  deleteUser: User;
  /** Removes the specified User Application. */
  deleteUserApplication: Application;
  /** Deletes the specified User Group. */
  deleteUserGroup: UserGroup;
  /** Trigger an event on the Application. */
  eventOnApplication: Application;
  /** Trigger an event on the Challenge. */
  eventOnChallenge: Challenge;
  /** Trigger an event on the Opportunity. */
  eventOnOpportunity: Opportunity;
  /** Trigger an event on the Project. */
  eventOnProject: Project;
  /** Grants an authorization credential to a User. */
  grantCredentialToUser: User;
  /** Remove an organisation as a lead for the Challenge. */
  removeChallengeLead: Challenge;
  /** Removes a User as a member of the specified Community. */
  removeUserFromCommunity: Community;
  /** Removes the specified User from specified user group */
  removeUserFromGroup: UserGroup;
  /** Removes an authorization credential from a User. */
  revokeCredentialFromUser: User;
  /** Updates the specified Actor. */
  updateActor: Actor;
  /** Updates the specified Aspect. */
  updateAspect: Aspect;
  /** Updates the specified Challenge. */
  updateChallenge: Challenge;
  /** Updates the Ecoverse. */
  updateEcoverse: Ecoverse;
  /** Updates the specified Opportunity. */
  updateOpportunity: Opportunity;
  /** Updates the specified Organisation. */
  updateOrganisation: Organisation;
  /** Updates the specified Profile. */
  updateProfile: Profile;
  /** Updates the specified Project. */
  updateProject: Project;
  /** Updates the User. */
  updateUser: User;
  /** Updates the specified User Group. */
  updateUserGroup: UserGroup;
  /** Uploads and sets an avatar image for the specified Profile. */
  uploadAvatar: Profile;
};

export type MutationAssignChallengeLeadArgs = {
  assignInput: AssignChallengeLeadInput;
};

export type MutationAssignUserToCommunityArgs = {
  membershipData: AssignCommunityMemberInput;
};

export type MutationAssignUserToGroupArgs = {
  membershipData: AssignUserGroupMemberInput;
};

export type MutationCreateActorArgs = {
  actorData: CreateActorInput;
};

export type MutationCreateActorGroupArgs = {
  actorGroupData: CreateActorGroupInput;
};

export type MutationCreateApplicationArgs = {
  applicationData: CreateApplicationInput;
};

export type MutationCreateAspectArgs = {
  aspectData: CreateAspectInput;
};

export type MutationCreateAspectOnProjectArgs = {
  aspectData: CreateAspectInput;
};

export type MutationCreateChallengeArgs = {
  challengeData: CreateChallengeInput;
};

export type MutationCreateChildChallengeArgs = {
  challengeData: CreateChallengeInput;
};

export type MutationCreateEcoverseArgs = {
  ecoverseData: CreateEcoverseInput;
};

export type MutationCreateGroupOnCommunityArgs = {
  groupData: CreateUserGroupInput;
};

export type MutationCreateGroupOnOrganisationArgs = {
  groupData: CreateUserGroupInput;
};

export type MutationCreateOpportunityArgs = {
  opportunityData: CreateOpportunityInput;
};

export type MutationCreateOrganisationArgs = {
  organisationData: CreateOrganisationInput;
};

export type MutationCreateProjectArgs = {
  projectData: CreateProjectInput;
};

export type MutationCreateReferenceOnContextArgs = {
  referenceInput: CreateReferenceOnContextInput;
};

export type MutationCreateReferenceOnProfileArgs = {
  referenceInput: CreateReferenceOnProfileInput;
};

export type MutationCreateRelationArgs = {
  relationData: CreateRelationInput;
};

export type MutationCreateTagsetOnProfileArgs = {
  tagsetData: CreateTagsetOnProfileInput;
};

export type MutationCreateUserArgs = {
  userData: CreateUserInput;
};

export type MutationDeleteActorArgs = {
  deleteData: DeleteActorInput;
};

export type MutationDeleteActorGroupArgs = {
  deleteData: DeleteActorGroupInput;
};

export type MutationDeleteAspectArgs = {
  deleteData: DeleteAspectInput;
};

export type MutationDeleteChallengeArgs = {
  deleteData: DeleteChallengeInput;
};

export type MutationDeleteEcoverseArgs = {
  deleteData: DeleteEcoverseInput;
};

export type MutationDeleteOpportunityArgs = {
  deleteData: DeleteOpportunityInput;
};

export type MutationDeleteOrganisationArgs = {
  deleteData: DeleteOrganisationInput;
};

export type MutationDeleteProjectArgs = {
  deleteData: DeleteProjectInput;
};

export type MutationDeleteReferenceArgs = {
  deleteData: DeleteReferenceInput;
};

export type MutationDeleteRelationArgs = {
  deleteData: DeleteRelationInput;
};

export type MutationDeleteUserArgs = {
  deleteData: DeleteUserInput;
};

export type MutationDeleteUserApplicationArgs = {
  deleteData: DeleteApplicationInput;
};

export type MutationDeleteUserGroupArgs = {
  deleteData: DeleteUserGroupInput;
};

export type MutationEventOnApplicationArgs = {
  applicationEventData: ApplicationEventInput;
};

export type MutationEventOnChallengeArgs = {
  challengeEventData: ChallengeEventInput;
};

export type MutationEventOnOpportunityArgs = {
  opportunityEventData: OpportunityEventInput;
};

export type MutationEventOnProjectArgs = {
  projectEventData: ProjectEventInput;
};

export type MutationGrantCredentialToUserArgs = {
  grantCredentialData: GrantAuthorizationCredentialInput;
};

export type MutationRemoveChallengeLeadArgs = {
  removeData: RemoveChallengeLeadInput;
};

export type MutationRemoveUserFromCommunityArgs = {
  membershipData: RemoveCommunityMemberInput;
};

export type MutationRemoveUserFromGroupArgs = {
  membershipData: RemoveUserGroupMemberInput;
};

export type MutationRevokeCredentialFromUserArgs = {
  revokeCredentialData: RevokeAuthorizationCredentialInput;
};

export type MutationUpdateActorArgs = {
  actorData: UpdateActorInput;
};

export type MutationUpdateAspectArgs = {
  aspectData: UpdateAspectInput;
};

export type MutationUpdateChallengeArgs = {
  challengeData: UpdateChallengeInput;
};

export type MutationUpdateEcoverseArgs = {
  ecoverseData: UpdateEcoverseInput;
};

export type MutationUpdateOpportunityArgs = {
  opportunityData: UpdateOpportunityInput;
};

export type MutationUpdateOrganisationArgs = {
  organisationData: UpdateOrganisationInput;
};

export type MutationUpdateProfileArgs = {
  profileData: UpdateProfileInput;
};

export type MutationUpdateProjectArgs = {
  projectData: UpdateProjectInput;
};

export type MutationUpdateUserArgs = {
  userData: UpdateUserInput;
};

export type MutationUpdateUserGroupArgs = {
  userGroupData: UpdateUserGroupInput;
};

export type MutationUploadAvatarArgs = {
  file: Scalars['Upload'];
  uploadData: UploadProfileAvatarInput;
};

export type Nvp = {
  __typename?: 'NVP';
  /** The ID of the entity */
  id: Scalars['UUID'];
  name: Scalars['String'];
  value: Scalars['String'];
};

export type Opportunity = {
  __typename?: 'Opportunity';
  /** The activity within this Opportunity. */
  activity?: Maybe<Array<Nvp>>;
  /** The authorization rules for the entity */
  authorization?: Maybe<Authorization>;
  /** The community for the Opportunity. */
  community?: Maybe<Community>;
  /** The context for the Opportunity. */
  context?: Maybe<Context>;
  /** The display name. */
  displayName: Scalars['String'];
  /** The ID of the entity */
  id: Scalars['UUID'];
  /** The lifeycle for the Opportunity. */
  lifecycle?: Maybe<Lifecycle>;
  /** A name identifier of the entity, unique within a given scope. */
  nameID: Scalars['NameID'];
  /** The set of projects within the context of this Opportunity */
  projects?: Maybe<Array<Project>>;
  /** The set of Relations within the context of this Opportunity. */
  relations?: Maybe<Array<Relation>>;
  /** The set of tags for the challenge */
  tagset?: Maybe<Tagset>;
};

export type OpportunityEventInput = {
  ID: Scalars['UUID'];
  eventName: Scalars['String'];
};

export type OpportunityTemplate = {
  __typename?: 'OpportunityTemplate';
  /** Template actor groups. */
  actorGroups?: Maybe<Array<Scalars['String']>>;
  /** Application templates. */
  applications?: Maybe<Array<ApplicationTemplate>>;
  /** Template aspects. */
  aspects?: Maybe<Array<Scalars['String']>>;
  /** Template opportunity name. */
  name: Scalars['String'];
  /** Template relations. */
  relations?: Maybe<Array<Scalars['String']>>;
};

export type Organisation = Groupable &
  Searchable & {
    __typename?: 'Organisation';
    /** The Agent representing this User. */
    agent?: Maybe<Agent>;
    /** The authorization rules for the entity */
    authorization?: Maybe<Authorization>;
    /** The display name. */
    displayName: Scalars['String'];
    /** Groups defined on this organisation. */
    groups?: Maybe<Array<UserGroup>>;
    id: Scalars['UUID'];
    /** All users that are members of this Organisation. */
    members?: Maybe<Array<User>>;
    /** A name identifier of the entity, unique within a given scope. */
    nameID: Scalars['NameID'];
    /** The profile for this organisation. */
    profile: Profile;
  };

export type OryConfig = {
  __typename?: 'OryConfig';
  /** Ory Issuer. */
  issuer: Scalars['String'];
  /** Ory Kratos Public Base URL. Used by all Kratos Public Clients. */
  kratosPublicBaseURL: Scalars['String'];
};

export type Profile = {
  __typename?: 'Profile';
  /** The authorization rules for the entity */
  authorization?: Maybe<Authorization>;
  /** A URI that points to the location of an avatar, either on a shared location or a gravatar */
  avatar?: Maybe<Scalars['String']>;
  /** A short description of the entity associated with this profile. */
  description?: Maybe<Scalars['String']>;
  /** The ID of the entity */
  id: Scalars['UUID'];
  /** A list of URLs to relevant information. */
  references?: Maybe<Array<Reference>>;
  /** A list of named tagsets, each of which has a list of tags. */
  tagsets?: Maybe<Array<Tagset>>;
};

export type Project = {
  __typename?: 'Project';
  /** The set of aspects for this Project. Note: likley to change. */
  aspects?: Maybe<Array<Aspect>>;
  /** The authorization rules for the entity */
  authorization?: Maybe<Authorization>;
  description?: Maybe<Scalars['String']>;
  /** The display name. */
  displayName: Scalars['String'];
  /** The ID of the entity */
  id: Scalars['UUID'];
  /** The maturity phase of the project i.e. new, being refined, committed, in-progress, closed etc */
  lifecycle?: Maybe<Lifecycle>;
  /** A name identifier of the entity, unique within a given scope. */
  nameID: Scalars['NameID'];
  /** The set of tags for the project */
  tagset?: Maybe<Tagset>;
};

export type ProjectEventInput = {
  /** The ID of the entity to which the event is sent */
  ID: Scalars['String'];
  /** The name of the event. Simple text and matching an event in the Lifecycle definition. */
  eventName: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  /** Cherrytwist configuration. Provides configuration to external services in the Cherrytwist ecosystem. */
  configuration: Config;
  /** An ecoverse. If no ID is specified then the first Ecoverse is returned. */
  ecoverse: Ecoverse;
  /** The Ecoverses on this platform */
  ecoverses: Array<Ecoverse>;
  /** The currently logged in user */
  me: User;
  /** Search the ecoverse for terms supplied */
  membership: Membership;
  /** Cherrytwist Services Metadata */
  metadata: Metadata;
  /** A particular Organisation */
  organisation: Organisation;
  /** The Organisations on this platform */
  organisations: Array<Organisation>;
  /** Search the ecoverse for terms supplied */
  search: Array<SearchResultEntry>;
  /** A particular user, identified by the ID or by email */
  user: User;
  /** Privileges assigned to a User (based on held credentials) given an Authorization defnition. */
  userAuthorizationPrivileges: Array<AuthorizationPrivilege>;
  /** The users who have profiles on this platform */
  users: Array<User>;
  /** The users filtered by list of IDs. */
  usersById: Array<User>;
  /** All Users that hold credentials matching the supplied criteria. */
  usersWithAuthorizationCredential: Array<User>;
};

export type QueryEcoverseArgs = {
  ID: Scalars['UUID_NAMEID'];
};

export type QueryMembershipArgs = {
  membershipData: MembershipInput;
};

export type QueryOrganisationArgs = {
  ID: Scalars['UUID_NAMEID'];
};

export type QuerySearchArgs = {
  searchData: SearchInput;
};

export type QueryUserArgs = {
  ID: Scalars['UUID_NAMEID_EMAIL'];
};

export type QueryUserAuthorizationPrivilegesArgs = {
  userAuthorizationPrivilegesData: UserAuthorizationPrivilegesInput;
};

export type QueryUsersByIdArgs = {
  IDs: Array<Scalars['UUID_NAMEID_EMAIL']>;
};

export type QueryUsersWithAuthorizationCredentialArgs = {
  credentialsCriteriaData: UsersWithAuthorizationCredentialInput;
};

export type Question = {
  __typename?: 'Question';
  /** The ID of the entity */
  id: Scalars['UUID'];
  name: Scalars['String'];
  value: Scalars['String'];
};

export type QuestionTemplate = {
  __typename?: 'QuestionTemplate';
  /** Question template. */
  question: Scalars['String'];
  /** Is question required? */
  required: Scalars['Boolean'];
};

export type Reference = {
  __typename?: 'Reference';
  /** The authorization rules for the entity */
  authorization?: Maybe<Authorization>;
  description: Scalars['String'];
  /** The ID of the entity */
  id: Scalars['UUID'];
  name: Scalars['String'];
  uri: Scalars['String'];
};

export type Relation = {
  __typename?: 'Relation';
  actorName: Scalars['String'];
  actorRole: Scalars['String'];
  actorType: Scalars['String'];
  /** The authorization rules for the entity */
  authorization?: Maybe<Authorization>;
  description: Scalars['String'];
  /** The ID of the entity */
  id: Scalars['UUID'];
  type: Scalars['String'];
};

export type RemoveChallengeLeadInput = {
  challengeID: Scalars['UUID'];
  organisationID: Scalars['UUID_NAMEID'];
};

export type RemoveCommunityMemberInput = {
  communityID: Scalars['UUID'];
  userID: Scalars['UUID_NAMEID_EMAIL'];
};

export type RemoveUserGroupMemberInput = {
  groupID: Scalars['UUID'];
  userID: Scalars['UUID_NAMEID_EMAIL'];
};

export type RevokeAuthorizationCredentialInput = {
  /** The resource to which access is being removed. */
  resourceID?: Maybe<Scalars['String']>;
  type: AuthorizationCredential;
  /** The user from whom the credential is being removed. */
  userID: Scalars['UUID_NAMEID_EMAIL'];
};

export type SearchInput = {
  /** Restrict the search to only the specified challenges. Default is all Challenges. */
  challengesFilter?: Maybe<Array<Scalars['Float']>>;
  /** Expand the search to includes Tagsets with the provided names. Max 2. */
  tagsetNames?: Maybe<Array<Scalars['String']>>;
  /** The terms to be searched for within this Ecoverse. Max 5. */
  terms: Array<Scalars['String']>;
  /** Restrict the search to only the specified entity types. Values allowed: user, group, organisation, Default is all. */
  typesFilter?: Maybe<Array<Scalars['String']>>;
};

export type SearchResultEntry = {
  __typename?: 'SearchResultEntry';
  /** Each search result contains either a User, UserGroup or Organisation */
  result?: Maybe<Searchable>;
  /** The score for this search result; more matches means a higher score. */
  score?: Maybe<Scalars['Float']>;
  /** The terms that were matched for this result */
  terms?: Maybe<Array<Scalars['String']>>;
};

export type Searchable = {
  id: Scalars['UUID'];
};

export type ServiceMetadata = {
  __typename?: 'ServiceMetadata';
  /** Service name e.g. CT Server */
  name?: Maybe<Scalars['String']>;
  /** Version in the format {major.minor.patch} - using SemVer. */
  version?: Maybe<Scalars['String']>;
};

export type Tagset = {
  __typename?: 'Tagset';
  /** The authorization rules for the entity */
  authorization?: Maybe<Authorization>;
  /** The ID of the entity */
  id: Scalars['UUID'];
  name: Scalars['String'];
  tags: Array<Scalars['String']>;
};

export type TagsetTemplate = {
  __typename?: 'TagsetTemplate';
  /** Tagset template name. */
  name: Scalars['String'];
  /** Tagset placeholder */
  placeholder?: Maybe<Scalars['String']>;
};

export type Template = {
  __typename?: 'Template';
  /** Challenge templates. */
  challenges: Array<ChallengeTemplate>;
  /** Template description. */
  description: Scalars['String'];
  /** Ecoverse templates. */
  ecoverses: Array<EcoverseTemplate>;
  /** Template name. */
  name: Scalars['String'];
  /** Opportunity templates. */
  opportunities: Array<OpportunityTemplate>;
  /** User templates. */
  users: Array<UserTemplate>;
};

export type UpdateActorInput = {
  ID: Scalars['UUID'];
  description?: Maybe<Scalars['String']>;
  impact?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

export type UpdateAspectInput = {
  ID: Scalars['UUID'];
  explanation?: Maybe<Scalars['String']>;
  framing?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
};

export type UpdateAuthorizationDefinitionInput = {
  anonymousReadAccess: Scalars['Boolean'];
};

export type UpdateChallengeInput = {
  ID: Scalars['UUID'];
  /** Update the contained Context entity. */
  context?: Maybe<UpdateContextInput>;
  /** The display name for this entity. */
  displayName?: Maybe<Scalars['String']>;
  /** A display identifier, unique within the containing scope. Note: updating the nameID will affect URL on the client. */
  nameID?: Maybe<Scalars['NameID']>;
  /** Update the tags on the Tagset. */
  tags?: Maybe<Array<Scalars['String']>>;
};

export type UpdateContextInput = {
  background?: Maybe<Scalars['String']>;
  impact?: Maybe<Scalars['String']>;
  /** Update the set of References for the Context. */
  references?: Maybe<Array<UpdateReferenceInput>>;
  tagline?: Maybe<Scalars['String']>;
  vision?: Maybe<Scalars['String']>;
  who?: Maybe<Scalars['String']>;
};

export type UpdateEcoverseInput = {
  /** The ID or NameID of the Ecoverse. */
  ID: Scalars['UUID_NAMEID'];
  /** Update anonymous visibility for the Ecoverse. */
  authorizationDefinition?: Maybe<UpdateAuthorizationDefinitionInput>;
  /** Update the contained Context entity. */
  context?: Maybe<UpdateContextInput>;
  /** The display name for this entity. */
  displayName?: Maybe<Scalars['String']>;
  /** Update the host Organisation for the Ecoverse. */
  hostID?: Maybe<Scalars['UUID_NAMEID']>;
  /** A display identifier, unique within the containing scope. Note: updating the nameID will affect URL on the client. */
  nameID?: Maybe<Scalars['NameID']>;
  /** Update the tags on the Tagset. */
  tags?: Maybe<Array<Scalars['String']>>;
};

export type UpdateOpportunityInput = {
  ID: Scalars['UUID'];
  /** Update the contained Context entity. */
  context?: Maybe<UpdateContextInput>;
  /** The display name for this entity. */
  displayName?: Maybe<Scalars['String']>;
  /** A display identifier, unique within the containing scope. Note: updating the nameID will affect URL on the client. */
  nameID?: Maybe<Scalars['NameID']>;
  /** Update the tags on the Tagset. */
  tags?: Maybe<Array<Scalars['String']>>;
};

export type UpdateOrganisationInput = {
  /** The ID or NameID of the Organisation to update. */
  ID: Scalars['UUID_NAMEID'];
  /** The display name for this entity. */
  displayName?: Maybe<Scalars['String']>;
  /** A display identifier, unique within the containing scope. Note: updating the nameID will affect URL on the client. */
  nameID?: Maybe<Scalars['NameID']>;
  profileData?: Maybe<UpdateProfileInput>;
};

export type UpdateProfileInput = {
  ID: Scalars['UUID'];
  avatar?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  references?: Maybe<Array<UpdateReferenceInput>>;
  tagsets?: Maybe<Array<UpdateTagsetInput>>;
};

export type UpdateProjectInput = {
  ID: Scalars['UUID'];
  description?: Maybe<Scalars['String']>;
  /** The display name for this entity. */
  displayName?: Maybe<Scalars['String']>;
  /** A display identifier, unique within the containing scope. Note: updating the nameID will affect URL on the client. */
  nameID?: Maybe<Scalars['NameID']>;
};

export type UpdateReferenceInput = {
  ID: Scalars['UUID'];
  description?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  uri?: Maybe<Scalars['String']>;
};

export type UpdateTagsetInput = {
  ID: Scalars['UUID'];
  name?: Maybe<Scalars['String']>;
  tags?: Maybe<Array<Scalars['String']>>;
};

export type UpdateUserGroupInput = {
  ID: Scalars['UUID'];
  name?: Maybe<Scalars['String']>;
  profileData?: Maybe<UpdateProfileInput>;
};

export type UpdateUserInput = {
  ID: Scalars['UUID_NAMEID_EMAIL'];
  accountUpn?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  /** The display name for this entity. */
  displayName?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  gender?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  /** A display identifier, unique within the containing scope. Note: updating the nameID will affect URL on the client. */
  nameID?: Maybe<Scalars['NameID']>;
  phone?: Maybe<Scalars['String']>;
  profileData?: Maybe<UpdateProfileInput>;
};

export type UploadProfileAvatarInput = {
  file: Scalars['String'];
  profileID: Scalars['String'];
};

export type User = Searchable & {
  __typename?: 'User';
  /** The unique personal identifier (upn) for the account associated with this user profile */
  accountUpn: Scalars['String'];
  /** The agent for this User */
  agent?: Maybe<Agent>;
  /** The authorization rules for the entity */
  authorization?: Maybe<Authorization>;
  city: Scalars['String'];
  country: Scalars['String'];
  /** The display name. */
  displayName: Scalars['String'];
  email: Scalars['String'];
  firstName: Scalars['String'];
  gender: Scalars['String'];
  id: Scalars['UUID'];
  lastName: Scalars['String'];
  /** A name identifier of the entity, unique within a given scope. */
  nameID: Scalars['NameID'];
  phone: Scalars['String'];
  /** The profile for this User */
  profile?: Maybe<Profile>;
};

export type UserAuthorizationPrivilegesInput = {
  /** The authorization definition to evaluate the user credentials against. */
  authorizationID: Scalars['UUID'];
  /** The user to evaluate privileges granted based on held credentials. */
  userID: Scalars['UUID_NAMEID_EMAIL'];
};

export type UserGroup = Searchable & {
  __typename?: 'UserGroup';
  /** The authorization rules for the entity */
  authorization?: Maybe<Authorization>;
  id: Scalars['UUID'];
  /** The Users that are members of this User Group. */
  members?: Maybe<Array<User>>;
  name: Scalars['String'];
  /** Containing entity for this UserGroup. */
  parent?: Maybe<Groupable>;
  /** The profile for the user group */
  profile?: Maybe<Profile>;
};

export type UserTemplate = {
  __typename?: 'UserTemplate';
  /** User template name. */
  name: Scalars['String'];
  /** Tagset templates. */
  tagsets?: Maybe<Array<TagsetTemplate>>;
};

export type UsersWithAuthorizationCredentialInput = {
  /** The resource to which a credential needs to be bound. */
  resourceID?: Maybe<Scalars['UUID']>;
  /** The type of credential. */
  type: AuthorizationCredential;
};

export type CommunityDetailsFragment = { __typename?: 'Community' } & Pick<Community, 'id' | 'displayName'> & {
    applications: Array<{ __typename?: 'Application' } & Pick<Application, 'id'>>;
    members?: Maybe<Array<{ __typename?: 'User' } & GroupMembersFragment>>;
    groups?: Maybe<
      Array<
        { __typename?: 'UserGroup' } & Pick<UserGroup, 'id' | 'name'> & {
            members?: Maybe<Array<{ __typename?: 'User' } & GroupMembersFragment>>;
          }
      >
    >;
  };

export type ContextDetailsFragment = { __typename?: 'Context' } & Pick<
  Context,
  'id' | 'tagline' | 'background' | 'vision' | 'impact' | 'who'
> & {
    references?: Maybe<Array<{ __typename?: 'Reference' } & Pick<Reference, 'id' | 'name' | 'uri' | 'description'>>>;
  };

export type EcoverseDetailsFragment = { __typename?: 'Ecoverse' } & Pick<Ecoverse, 'id' | 'nameID' | 'displayName'> & {
    context?: Maybe<{ __typename?: 'Context' } & ContextDetailsFragment>;
  };

export type GroupDetailsFragment = { __typename?: 'UserGroup' } & Pick<UserGroup, 'id' | 'name'>;

export type GroupMembersFragment = { __typename?: 'User' } & Pick<
  User,
  'id' | 'displayName' | 'firstName' | 'lastName' | 'email'
>;

export type NewChallengeFragment = { __typename?: 'Challenge' } & Pick<Challenge, 'id' | 'nameID' | 'displayName'>;

export type NewOpportunityFragment = { __typename?: 'Opportunity' } & Pick<
  Opportunity,
  'id' | 'nameID' | 'displayName'
>;

export type OrganizationProfileInfoFragment = { __typename?: 'Organisation' } & Pick<
  Organisation,
  'id' | 'nameID' | 'displayName'
> & {
    profile: { __typename?: 'Profile' } & Pick<Profile, 'id' | 'avatar' | 'description'> & {
        references?: Maybe<Array<{ __typename?: 'Reference' } & Pick<Reference, 'id' | 'name' | 'uri'>>>;
        tagsets?: Maybe<Array<{ __typename?: 'Tagset' } & Pick<Tagset, 'id' | 'name' | 'tags'>>>;
      };
  };

export type ProjectDetailsFragment = { __typename?: 'Project' } & Pick<
  Project,
  'id' | 'nameID' | 'displayName' | 'description'
> & {
    lifecycle?: Maybe<{ __typename?: 'Lifecycle' } & Pick<Lifecycle, 'state'>>;
    tagset?: Maybe<{ __typename?: 'Tagset' } & Pick<Tagset, 'name' | 'tags'>>;
    aspects?: Maybe<Array<{ __typename?: 'Aspect' } & Pick<Aspect, 'title' | 'framing' | 'explanation'>>>;
  };

export type UserAgentFragment = { __typename?: 'User' } & {
  agent?: Maybe<
    { __typename?: 'Agent' } & Pick<Agent, 'id' | 'did'> & {
        credentials?: Maybe<Array<{ __typename?: 'Credential' } & Pick<Credential, 'id' | 'resourceID' | 'type'>>>;
      }
  >;
};

export type UserDetailsFragment = { __typename?: 'User' } & Pick<
  User,
  'id' | 'displayName' | 'firstName' | 'lastName' | 'email' | 'gender' | 'country' | 'city' | 'phone' | 'accountUpn'
> & {
    profile?: Maybe<
      { __typename?: 'Profile' } & Pick<Profile, 'id' | 'description' | 'avatar'> & {
          references?: Maybe<Array<{ __typename?: 'Reference' } & Pick<Reference, 'id' | 'name' | 'uri'>>>;
          tagsets?: Maybe<Array<{ __typename?: 'Tagset' } & Pick<Tagset, 'id' | 'name' | 'tags'>>>;
        }
    >;
  };

export type AssignUserToCommunityMutationVariables = Exact<{
  membershipData: AssignCommunityMemberInput;
}>;

export type AssignUserToCommunityMutation = { __typename?: 'Mutation' } & {
  assignUserToCommunity: { __typename?: 'Community' } & Pick<Community, 'id' | 'displayName'>;
};

export type AssignUserToGroupMutationVariables = Exact<{
  input: AssignUserGroupMemberInput;
}>;

export type AssignUserToGroupMutation = { __typename?: 'Mutation' } & {
  assignUserToGroup: { __typename?: 'UserGroup' } & Pick<UserGroup, 'id'> & {
      members?: Maybe<Array<{ __typename?: 'User' } & GroupMembersFragment>>;
    };
};

export type CreateActorMutationVariables = Exact<{
  input: CreateActorInput;
}>;

export type CreateActorMutation = { __typename?: 'Mutation' } & {
  createActor: { __typename?: 'Actor' } & Pick<Actor, 'id' | 'name'>;
};

export type CreateActorGroupMutationVariables = Exact<{
  input: CreateActorGroupInput;
}>;

export type CreateActorGroupMutation = { __typename?: 'Mutation' } & {
  createActorGroup: { __typename?: 'ActorGroup' } & Pick<ActorGroup, 'id' | 'name'>;
};

export type CreateAspectMutationVariables = Exact<{
  input: CreateAspectInput;
}>;

export type CreateAspectMutation = { __typename?: 'Mutation' } & {
  createAspect: { __typename?: 'Aspect' } & Pick<Aspect, 'id' | 'title'>;
};

export type CreateChallengeMutationVariables = Exact<{
  input: CreateChallengeInput;
}>;

export type CreateChallengeMutation = { __typename?: 'Mutation' } & {
  createChallenge: { __typename?: 'Challenge' } & NewChallengeFragment;
};

export type CreateEcoverseMutationVariables = Exact<{
  input: CreateEcoverseInput;
}>;

export type CreateEcoverseMutation = { __typename?: 'Mutation' } & {
  createEcoverse: { __typename?: 'Ecoverse' } & EcoverseDetailsFragment;
};

export type CreateGroupOnCommunityMutationVariables = Exact<{
  input: CreateUserGroupInput;
}>;

export type CreateGroupOnCommunityMutation = { __typename?: 'Mutation' } & {
  createGroupOnCommunity: { __typename?: 'UserGroup' } & GroupDetailsFragment;
};

export type CreateGroupOnOrganizationMutationVariables = Exact<{
  input: CreateUserGroupInput;
}>;

export type CreateGroupOnOrganizationMutation = { __typename?: 'Mutation' } & {
  createGroupOnOrganisation: { __typename?: 'UserGroup' } & Pick<UserGroup, 'id' | 'name'>;
};

export type CreateOpportunityMutationVariables = Exact<{
  input: CreateOpportunityInput;
}>;

export type CreateOpportunityMutation = { __typename?: 'Mutation' } & {
  createOpportunity: { __typename?: 'Opportunity' } & NewOpportunityFragment;
};

export type CreateOrganizationMutationVariables = Exact<{
  input: CreateOrganisationInput;
}>;

export type CreateOrganizationMutation = { __typename?: 'Mutation' } & {
  createOrganisation: { __typename?: 'Organisation' } & Pick<Organisation, 'id' | 'nameID' | 'displayName'>;
};

export type CreateProjectMutationVariables = Exact<{
  input: CreateProjectInput;
}>;

export type CreateProjectMutation = { __typename?: 'Mutation' } & {
  createProject: { __typename?: 'Project' } & ProjectDetailsFragment;
};

export type CreateReferenceOnContextMutationVariables = Exact<{
  input: CreateReferenceOnContextInput;
}>;

export type CreateReferenceOnContextMutation = { __typename?: 'Mutation' } & {
  createReferenceOnContext: { __typename?: 'Reference' } & Pick<Reference, 'id' | 'name' | 'description' | 'uri'>;
};

export type CreateReferenceOnProfileMutationVariables = Exact<{
  input: CreateReferenceOnProfileInput;
}>;

export type CreateReferenceOnProfileMutation = { __typename?: 'Mutation' } & {
  createReferenceOnProfile: { __typename?: 'Reference' } & Pick<Reference, 'id' | 'name' | 'description' | 'uri'>;
};

export type CreateRelationMutationVariables = Exact<{
  input: CreateRelationInput;
}>;

export type CreateRelationMutation = { __typename?: 'Mutation' } & {
  createRelation: { __typename?: 'Relation' } & Pick<Relation, 'id'>;
};

export type CreateTagsetOnProfileMutationVariables = Exact<{
  input: CreateTagsetOnProfileInput;
}>;

export type CreateTagsetOnProfileMutation = { __typename?: 'Mutation' } & {
  createTagsetOnProfile: { __typename?: 'Tagset' } & Pick<Tagset, 'id' | 'name' | 'tags'>;
};

export type CreateUserMutationVariables = Exact<{
  input: CreateUserInput;
}>;

export type CreateUserMutation = { __typename?: 'Mutation' } & {
  createUser: { __typename?: 'User' } & UserDetailsFragment;
};

export type DeleteActorMutationVariables = Exact<{
  input: DeleteActorInput;
}>;

export type DeleteActorMutation = { __typename?: 'Mutation' } & {
  deleteActor: { __typename?: 'Actor' } & Pick<Actor, 'id'>;
};

export type DeleteAspectMutationVariables = Exact<{
  input: DeleteAspectInput;
}>;

export type DeleteAspectMutation = { __typename?: 'Mutation' } & {
  deleteAspect: { __typename?: 'Aspect' } & Pick<Aspect, 'id'>;
};

export type DeleteEcoverseMutationVariables = Exact<{
  input: DeleteEcoverseInput;
}>;

export type DeleteEcoverseMutation = { __typename?: 'Mutation' } & {
  deleteEcoverse: { __typename?: 'Ecoverse' } & Pick<Ecoverse, 'id' | 'nameID'>;
};

export type DeleteGroupMutationVariables = Exact<{
  input: DeleteUserGroupInput;
}>;

export type DeleteGroupMutation = { __typename?: 'Mutation' } & {
  deleteUserGroup: { __typename?: 'UserGroup' } & Pick<UserGroup, 'id'>;
};

export type DeleteOpportunityMutationVariables = Exact<{
  input: DeleteOpportunityInput;
}>;

export type DeleteOpportunityMutation = { __typename?: 'Mutation' } & {
  deleteOpportunity: { __typename?: 'Opportunity' } & Pick<Opportunity, 'id'>;
};

export type DeleteOrganizationMutationVariables = Exact<{
  input: DeleteOrganisationInput;
}>;

export type DeleteOrganizationMutation = { __typename?: 'Mutation' } & {
  deleteOrganisation: { __typename?: 'Organisation' } & Pick<Organisation, 'id'>;
};

export type DeleteReferenceMutationVariables = Exact<{
  input: DeleteReferenceInput;
}>;

export type DeleteReferenceMutation = { __typename?: 'Mutation' } & {
  deleteReference: { __typename?: 'Reference' } & Pick<Reference, 'id'>;
};

export type DeleteRelationMutationVariables = Exact<{
  input: DeleteRelationInput;
}>;

export type DeleteRelationMutation = { __typename?: 'Mutation' } & {
  deleteRelation: { __typename?: 'Relation' } & Pick<Relation, 'id'>;
};

export type DeleteUserMutationVariables = Exact<{
  input: DeleteUserInput;
}>;

export type DeleteUserMutation = { __typename?: 'Mutation' } & {
  deleteUser: { __typename?: 'User' } & UserDetailsFragment;
};

export type GrantCredentialsMutationVariables = Exact<{
  input: GrantAuthorizationCredentialInput;
}>;

export type GrantCredentialsMutation = { __typename?: 'Mutation' } & {
  grantCredentialToUser: { __typename?: 'User' } & Pick<User, 'id' | 'displayName'> & UserAgentFragment;
};

export type RemoveUserFromGroupMutationVariables = Exact<{
  input: RemoveUserGroupMemberInput;
}>;

export type RemoveUserFromGroupMutation = { __typename?: 'Mutation' } & {
  removeUserFromGroup: { __typename?: 'UserGroup' } & Pick<UserGroup, 'id' | 'name'> & {
      members?: Maybe<Array<{ __typename?: 'User' } & GroupMembersFragment>>;
    };
};

export type RevokeCredentialsMutationVariables = Exact<{
  input: RevokeAuthorizationCredentialInput;
}>;

export type RevokeCredentialsMutation = { __typename?: 'Mutation' } & {
  revokeCredentialFromUser: { __typename?: 'User' } & Pick<User, 'id' | 'displayName'> & UserAgentFragment;
};

export type UpdateActorMutationVariables = Exact<{
  input: UpdateActorInput;
}>;

export type UpdateActorMutation = { __typename?: 'Mutation' } & {
  updateActor: { __typename?: 'Actor' } & Pick<Actor, 'id' | 'name'>;
};

export type UpdateAspectMutationVariables = Exact<{
  input: UpdateAspectInput;
}>;

export type UpdateAspectMutation = { __typename?: 'Mutation' } & {
  updateAspect: { __typename?: 'Aspect' } & Pick<Aspect, 'id' | 'title'>;
};

export type UpdateChallengeMutationVariables = Exact<{
  input: UpdateChallengeInput;
}>;

export type UpdateChallengeMutation = { __typename?: 'Mutation' } & {
  updateChallenge: { __typename?: 'Challenge' } & Pick<Challenge, 'id' | 'nameID' | 'displayName'>;
};

export type UpdateEcoverseMutationVariables = Exact<{
  input: UpdateEcoverseInput;
}>;

export type UpdateEcoverseMutation = { __typename?: 'Mutation' } & {
  updateEcoverse: { __typename?: 'Ecoverse' } & EcoverseDetailsFragment;
};

export type UpdateGroupMutationVariables = Exact<{
  input: UpdateUserGroupInput;
}>;

export type UpdateGroupMutation = { __typename?: 'Mutation' } & {
  updateUserGroup: { __typename?: 'UserGroup' } & Pick<UserGroup, 'id' | 'name'> & {
      profile?: Maybe<
        { __typename?: 'Profile' } & Pick<Profile, 'id' | 'avatar' | 'description'> & {
            references?: Maybe<Array<{ __typename?: 'Reference' } & Pick<Reference, 'uri' | 'name' | 'description'>>>;
            tagsets?: Maybe<Array<{ __typename?: 'Tagset' } & Pick<Tagset, 'name' | 'tags'>>>;
          }
      >;
    };
};

export type UpdateOpportunityMutationVariables = Exact<{
  input: UpdateOpportunityInput;
}>;

export type UpdateOpportunityMutation = { __typename?: 'Mutation' } & {
  updateOpportunity: { __typename?: 'Opportunity' } & Pick<Opportunity, 'id' | 'displayName'>;
};

export type UpdateOrganizationMutationVariables = Exact<{
  input: UpdateOrganisationInput;
}>;

export type UpdateOrganizationMutation = { __typename?: 'Mutation' } & {
  updateOrganisation: { __typename?: 'Organisation' } & OrganizationProfileInfoFragment;
};

export type UpdateUserMutationVariables = Exact<{
  input: UpdateUserInput;
}>;

export type UpdateUserMutation = { __typename?: 'Mutation' } & {
  updateUser: { __typename?: 'User' } & UserDetailsFragment;
};

export type UploadAvatarMutationVariables = Exact<{
  file: Scalars['Upload'];
  input: UploadProfileAvatarInput;
}>;

export type UploadAvatarMutation = { __typename?: 'Mutation' } & {
  uploadAvatar: { __typename?: 'Profile' } & Pick<Profile, 'id' | 'avatar'>;
};

export type AllCommunitiesQueryVariables = Exact<{
  ecoverseId: Scalars['UUID_NAMEID'];
}>;

export type AllCommunitiesQuery = { __typename?: 'Query' } & {
  ecoverse: { __typename?: 'Ecoverse' } & {
    community?: Maybe<{ __typename?: 'Community' } & AllCommunityDetailsFragment>;
    challenges?: Maybe<
      Array<
        { __typename?: 'Challenge' } & { community?: Maybe<{ __typename?: 'Community' } & AllCommunityDetailsFragment> }
      >
    >;
    opportunities: Array<
      { __typename?: 'Opportunity' } & { community?: Maybe<{ __typename?: 'Community' } & AllCommunityDetailsFragment> }
    >;
  };
};

export type AllCommunityDetailsFragment = { __typename?: 'Community' } & Pick<Community, 'id' | 'displayName'>;

export type AllOpportunitiesQueryVariables = Exact<{
  ecoverseId: Scalars['UUID_NAMEID'];
}>;

export type AllOpportunitiesQuery = { __typename?: 'Query' } & {
  ecoverse: { __typename?: 'Ecoverse' } & Pick<Ecoverse, 'id'> & {
      opportunities: Array<{ __typename?: 'Opportunity' } & Pick<Opportunity, 'id' | 'nameID'>>;
    };
};

export type AuthenticationConfigurationQueryVariables = Exact<{ [key: string]: never }>;

export type AuthenticationConfigurationQuery = { __typename?: 'Query' } & {
  configuration: { __typename?: 'Config' } & {
    authentication: { __typename?: 'AuthenticationConfig' } & Pick<AuthenticationConfig, 'enabled'> & {
        providers: Array<
          { __typename?: 'AuthenticationProviderConfig' } & Pick<
            AuthenticationProviderConfig,
            'name' | 'label' | 'icon' | 'enabled'
          > & { config: { __typename: 'OryConfig' } & Pick<OryConfig, 'kratosPublicBaseURL' | 'issuer'> }
        >;
      };
  };
};

export type ChallengeCommunityQueryVariables = Exact<{
  ecoverseId: Scalars['UUID_NAMEID'];
  challengeId: Scalars['UUID_NAMEID'];
}>;

export type ChallengeCommunityQuery = { __typename?: 'Query' } & {
  ecoverse: { __typename?: 'Ecoverse' } & Pick<Ecoverse, 'id'> & {
      challenge: { __typename?: 'Challenge' } & Pick<Challenge, 'id' | 'displayName'> & {
          community?: Maybe<{ __typename?: 'Community' } & CommunityDetailsFragment>;
        };
    };
};

export type ChallengeGroupsQueryVariables = Exact<{
  ecoverseId: Scalars['UUID_NAMEID'];
  challengeId: Scalars['UUID_NAMEID'];
}>;

export type ChallengeGroupsQuery = { __typename?: 'Query' } & {
  ecoverse: { __typename?: 'Ecoverse' } & Pick<Ecoverse, 'id'> & {
      challenge: { __typename?: 'Challenge' } & {
        community?: Maybe<
          { __typename?: 'Community' } & {
            groups?: Maybe<Array<{ __typename?: 'UserGroup' } & Pick<UserGroup, 'id' | 'name'>>>;
          }
        >;
      };
    };
};

export type ChallengeMembersQueryVariables = Exact<{
  ecoverseId: Scalars['UUID_NAMEID'];
  challengeID: Scalars['UUID_NAMEID'];
}>;

export type ChallengeMembersQuery = { __typename?: 'Query' } & {
  ecoverse: { __typename?: 'Ecoverse' } & Pick<Ecoverse, 'id'> & {
      challenge: { __typename?: 'Challenge' } & {
        community?: Maybe<
          { __typename?: 'Community' } & {
            members?: Maybe<
              Array<{ __typename?: 'User' } & Pick<User, 'id' | 'displayName' | 'firstName' | 'lastName' | 'email'>>
            >;
          }
        >;
      };
    };
};

export type ChallengeNameQueryVariables = Exact<{
  ecoverseId: Scalars['UUID_NAMEID'];
  challengeId: Scalars['UUID_NAMEID'];
}>;

export type ChallengeNameQuery = { __typename?: 'Query' } & {
  ecoverse: { __typename?: 'Ecoverse' } & Pick<Ecoverse, 'id'> & {
      challenge: { __typename?: 'Challenge' } & Pick<Challenge, 'id' | 'displayName'> & {
          community?: Maybe<{ __typename?: 'Community' } & Pick<Community, 'id' | 'displayName'>>;
        };
    };
};

export type ChallengeProfileQueryVariables = Exact<{
  ecoverseId: Scalars['UUID_NAMEID'];
  challengeId: Scalars['UUID_NAMEID'];
}>;

export type ChallengeProfileQuery = { __typename?: 'Query' } & {
  ecoverse: { __typename?: 'Ecoverse' } & Pick<Ecoverse, 'id'> & {
      challenge: { __typename?: 'Challenge' } & Pick<Challenge, 'id' | 'nameID' | 'displayName'> & {
          lifecycle?: Maybe<{ __typename?: 'Lifecycle' } & Pick<Lifecycle, 'state'>>;
          context?: Maybe<{ __typename?: 'Context' } & ContextDetailsFragment>;
          community?: Maybe<
            { __typename?: 'Community' } & {
              members?: Maybe<Array<{ __typename?: 'User' } & Pick<User, 'displayName'>>>;
            }
          >;
          tagset?: Maybe<{ __typename?: 'Tagset' } & Pick<Tagset, 'name' | 'tags'>>;
          opportunities?: Maybe<
            Array<
              { __typename?: 'Opportunity' } & Pick<Opportunity, 'id' | 'displayName' | 'nameID'> & {
                  lifecycle?: Maybe<{ __typename?: 'Lifecycle' } & Pick<Lifecycle, 'state'>>;
                  context?: Maybe<{ __typename?: 'Context' } & ContextDetailsFragment>;
                  projects?: Maybe<
                    Array<
                      { __typename?: 'Project' } & Pick<Project, 'id' | 'nameID' | 'displayName' | 'description'> & {
                          lifecycle?: Maybe<{ __typename?: 'Lifecycle' } & Pick<Lifecycle, 'state'>>;
                        }
                    >
                  >;
                }
            >
          >;
          leadOrganisations: Array<
            { __typename?: 'Organisation' } & Pick<Organisation, 'id' | 'displayName'> & {
                profile: { __typename?: 'Profile' } & Pick<Profile, 'id' | 'avatar'>;
              }
          >;
        };
    };
};

export type ChallengeProfileInfoQueryVariables = Exact<{
  ecoverseId: Scalars['UUID_NAMEID'];
  challengeId: Scalars['UUID_NAMEID'];
}>;

export type ChallengeProfileInfoQuery = { __typename?: 'Query' } & {
  ecoverse: { __typename?: 'Ecoverse' } & Pick<Ecoverse, 'id'> & {
      challenge: { __typename?: 'Challenge' } & Pick<Challenge, 'id' | 'nameID' | 'displayName'> & {
          lifecycle?: Maybe<{ __typename?: 'Lifecycle' } & Pick<Lifecycle, 'state'>>;
          context?: Maybe<{ __typename?: 'Context' } & ContextDetailsFragment>;
        };
    };
};

export type ChallengeUserIdsQueryVariables = Exact<{
  ecoverseId: Scalars['UUID_NAMEID'];
  challengeId: Scalars['UUID_NAMEID'];
}>;

export type ChallengeUserIdsQuery = { __typename?: 'Query' } & {
  ecoverse: { __typename?: 'Ecoverse' } & Pick<Ecoverse, 'id'> & {
      challenge: { __typename?: 'Challenge' } & {
        community?: Maybe<
          { __typename?: 'Community' } & { members?: Maybe<Array<{ __typename?: 'User' } & Pick<User, 'id'>>> }
        >;
      };
    };
};

export type ChallengesQueryVariables = Exact<{
  ecoverseId: Scalars['UUID_NAMEID'];
}>;

export type ChallengesQuery = { __typename?: 'Query' } & {
  ecoverse: { __typename?: 'Ecoverse' } & Pick<Ecoverse, 'id'> & {
      challenges?: Maybe<
        Array<
          { __typename?: 'Challenge' } & Pick<Challenge, 'id' | 'displayName' | 'nameID'> & {
              context?: Maybe<
                { __typename?: 'Context' } & Pick<Context, 'tagline'> & {
                    references?: Maybe<Array<{ __typename?: 'Reference' } & Pick<Reference, 'name' | 'uri'>>>;
                  }
              >;
            }
        >
      >;
    };
};

export type ChallengesWithCommunityQueryVariables = Exact<{
  ecoverseId: Scalars['UUID_NAMEID'];
}>;

export type ChallengesWithCommunityQuery = { __typename?: 'Query' } & {
  ecoverse: { __typename?: 'Ecoverse' } & Pick<Ecoverse, 'id'> & {
      challenges?: Maybe<
        Array<
          { __typename?: 'Challenge' } & Pick<Challenge, 'id' | 'displayName'> & {
              community?: Maybe<{ __typename?: 'Community' } & Pick<Community, 'id' | 'displayName'>>;
            }
        >
      >;
    };
};

export type EcoverseCommunityQueryVariables = Exact<{
  ecoverseId: Scalars['UUID_NAMEID'];
}>;

export type EcoverseCommunityQuery = { __typename?: 'Query' } & {
  ecoverse: { __typename?: 'Ecoverse' } & Pick<Ecoverse, 'id'> & {
      community?: Maybe<{ __typename?: 'Community' } & CommunityDetailsFragment>;
    };
};

export type EcoverseGroupsListQueryVariables = Exact<{
  ecoverseId: Scalars['UUID_NAMEID'];
}>;

export type EcoverseGroupsListQuery = { __typename?: 'Query' } & {
  ecoverse: { __typename?: 'Ecoverse' } & Pick<Ecoverse, 'id'> & {
      groups: Array<{ __typename?: 'UserGroup' } & Pick<UserGroup, 'id' | 'name'>>;
    };
};

export type EcoverseHostReferencesQueryVariables = Exact<{
  ecoverseId: Scalars['UUID_NAMEID'];
}>;

export type EcoverseHostReferencesQuery = { __typename?: 'Query' } & {
  ecoverse: { __typename?: 'Ecoverse' } & Pick<Ecoverse, 'id'> & {
      host?: Maybe<
        { __typename?: 'Organisation' } & {
          profile: { __typename?: 'Profile' } & Pick<Profile, 'id'> & {
              references?: Maybe<Array<{ __typename?: 'Reference' } & Pick<Reference, 'name' | 'uri'>>>;
            };
        }
      >;
    };
};

export type EcoverseInfoQueryVariables = Exact<{
  ecoverseId: Scalars['UUID_NAMEID'];
}>;

export type EcoverseInfoQuery = { __typename?: 'Query' } & {
  ecoverse: { __typename?: 'Ecoverse' } & {
    community?: Maybe<{ __typename?: 'Community' } & Pick<Community, 'id' | 'displayName'>>;
  } & EcoverseDetailsFragment;
};

export type EcoverseUserIdsQueryVariables = Exact<{ [key: string]: never }>;

export type EcoverseUserIdsQuery = { __typename?: 'Query' } & {
  users: Array<{ __typename?: 'User' } & Pick<User, 'id'>>;
};

export type EcoversesQueryVariables = Exact<{ [key: string]: never }>;

export type EcoversesQuery = { __typename?: 'Query' } & {
  ecoverses: Array<{ __typename?: 'Ecoverse' } & EcoverseDetailsFragment>;
};

export type GroupQueryVariables = Exact<{
  ecoverseId: Scalars['UUID_NAMEID'];
  groupId: Scalars['UUID'];
}>;

export type GroupQuery = { __typename?: 'Query' } & {
  ecoverse: { __typename?: 'Ecoverse' } & Pick<Ecoverse, 'id'> & {
      group: { __typename?: 'UserGroup' } & Pick<UserGroup, 'id' | 'name'> & {
          profile?: Maybe<
            { __typename?: 'Profile' } & Pick<Profile, 'id' | 'avatar' | 'description'> & {
                references?: Maybe<
                  Array<{ __typename?: 'Reference' } & Pick<Reference, 'id' | 'uri' | 'name' | 'description'>>
                >;
                tagsets?: Maybe<Array<{ __typename?: 'Tagset' } & Pick<Tagset, 'id' | 'name' | 'tags'>>>;
              }
          >;
        };
    };
};

export type GroupCardQueryVariables = Exact<{
  ecoverseId: Scalars['UUID_NAMEID'];
  groupId: Scalars['UUID'];
}>;

export type GroupCardQuery = { __typename?: 'Query' } & {
  ecoverse: { __typename?: 'Ecoverse' } & Pick<Ecoverse, 'id'> & {
      group: { __typename: 'UserGroup' } & Pick<UserGroup, 'name'> & {
          parent?: Maybe<
            | ({ __typename: 'Community' } & Pick<Community, 'displayName'>)
            | ({ __typename: 'Organisation' } & Pick<Organisation, 'displayName'>)
          >;
          members?: Maybe<Array<{ __typename?: 'User' } & Pick<User, 'id' | 'displayName'>>>;
          profile?: Maybe<
            { __typename?: 'Profile' } & Pick<Profile, 'id' | 'avatar' | 'description'> & {
                references?: Maybe<Array<{ __typename?: 'Reference' } & Pick<Reference, 'name' | 'description'>>>;
                tagsets?: Maybe<Array<{ __typename?: 'Tagset' } & Pick<Tagset, 'name' | 'tags'>>>;
              }
          >;
        };
    };
};

export type GroupMembersQueryVariables = Exact<{
  ecoverseId: Scalars['UUID_NAMEID'];
  groupId: Scalars['UUID'];
}>;

export type GroupMembersQuery = { __typename?: 'Query' } & {
  ecoverse: { __typename?: 'Ecoverse' } & Pick<Ecoverse, 'id'> & {
      group: { __typename?: 'UserGroup' } & Pick<UserGroup, 'id' | 'name'> & {
          members?: Maybe<Array<{ __typename?: 'User' } & GroupMembersFragment>>;
        };
    };
};

export type MeQueryVariables = Exact<{ [key: string]: never }>;

export type MeQuery = { __typename?: 'Query' } & {
  me: { __typename?: 'User' } & UserDetailsFragment & UserAgentFragment;
};

export type MembershipQueryVariables = Exact<{
  input: MembershipInput;
}>;

export type MembershipQuery = { __typename?: 'Query' } & {
  membership: { __typename?: 'Membership' } & {
    ecoverses: Array<
      { __typename?: 'MembershipResultEntryEcoverse' } & Pick<
        MembershipResultEntryEcoverse,
        'id' | 'nameID' | 'displayName'
      > & {
          challenges: Array<
            { __typename?: 'MembershipResultEntry' } & Pick<MembershipResultEntry, 'id' | 'nameID' | 'displayName'>
          >;
          opportunities: Array<
            { __typename?: 'MembershipResultEntry' } & Pick<MembershipResultEntry, 'id' | 'nameID' | 'displayName'>
          >;
          userGroups: Array<
            { __typename?: 'MembershipResultEntry' } & Pick<MembershipResultEntry, 'id' | 'nameID' | 'displayName'>
          >;
        }
    >;
    organisations: Array<
      { __typename?: 'MembershipResultEntryOrganisation' } & Pick<
        MembershipResultEntryOrganisation,
        'id' | 'nameID' | 'displayName'
      > & {
          userGroups: Array<
            { __typename?: 'MembershipResultEntry' } & Pick<MembershipResultEntry, 'id' | 'nameID' | 'displayName'>
          >;
        }
    >;
  };
};

export type OpportunitiesQueryVariables = Exact<{
  ecoverseId: Scalars['UUID_NAMEID'];
  challengeId: Scalars['UUID_NAMEID'];
}>;

export type OpportunitiesQuery = { __typename?: 'Query' } & {
  ecoverse: { __typename?: 'Ecoverse' } & Pick<Ecoverse, 'id'> & {
      challenge: { __typename?: 'Challenge' } & {
        opportunities?: Maybe<Array<{ __typename?: 'Opportunity' } & Pick<Opportunity, 'id' | 'displayName'>>>;
      };
    };
};

export type OpportunityActorGroupsQueryVariables = Exact<{
  ecoverseId: Scalars['UUID_NAMEID'];
  opportunityId: Scalars['UUID_NAMEID'];
}>;

export type OpportunityActorGroupsQuery = { __typename?: 'Query' } & {
  ecoverse: { __typename?: 'Ecoverse' } & Pick<Ecoverse, 'id'> & {
      opportunity: { __typename?: 'Opportunity' } & {
        context?: Maybe<
          { __typename?: 'Context' } & {
            ecosystemModel?: Maybe<
              { __typename?: 'EcosystemModel' } & Pick<EcosystemModel, 'id'> & {
                  actorGroups?: Maybe<
                    Array<
                      { __typename?: 'ActorGroup' } & Pick<ActorGroup, 'id' | 'name' | 'description'> & {
                          actors?: Maybe<
                            Array<
                              { __typename?: 'Actor' } & Pick<Actor, 'id' | 'name' | 'description' | 'value' | 'impact'>
                            >
                          >;
                        }
                    >
                  >;
                }
            >;
          }
        >;
      };
    };
};

export type OpportunityAspectsQueryVariables = Exact<{
  ecoverseId: Scalars['UUID_NAMEID'];
  opportunityId: Scalars['UUID_NAMEID'];
}>;

export type OpportunityAspectsQuery = { __typename?: 'Query' } & {
  ecoverse: { __typename?: 'Ecoverse' } & Pick<Ecoverse, 'id'> & {
      opportunity: { __typename?: 'Opportunity' } & {
        context?: Maybe<
          { __typename?: 'Context' } & {
            aspects?: Maybe<Array<{ __typename?: 'Aspect' } & Pick<Aspect, 'title' | 'framing' | 'explanation'>>>;
          }
        >;
      };
    };
};

export type OpportunityCommunityQueryVariables = Exact<{
  ecoverseId: Scalars['UUID_NAMEID'];
  opportunityId: Scalars['UUID_NAMEID'];
}>;

export type OpportunityCommunityQuery = { __typename?: 'Query' } & {
  ecoverse: { __typename?: 'Ecoverse' } & Pick<Ecoverse, 'id'> & {
      opportunity: { __typename?: 'Opportunity' } & Pick<Opportunity, 'id' | 'displayName'> & {
          community?: Maybe<{ __typename?: 'Community' } & CommunityDetailsFragment>;
        };
    };
};

export type OpportunityGroupsQueryVariables = Exact<{
  ecoverseId: Scalars['UUID_NAMEID'];
  opportunityId: Scalars['UUID_NAMEID'];
}>;

export type OpportunityGroupsQuery = { __typename?: 'Query' } & {
  ecoverse: { __typename?: 'Ecoverse' } & Pick<Ecoverse, 'id'> & {
      opportunity: { __typename?: 'Opportunity' } & {
        community?: Maybe<
          { __typename?: 'Community' } & {
            groups?: Maybe<Array<{ __typename?: 'UserGroup' } & Pick<UserGroup, 'id' | 'name'>>>;
          }
        >;
      };
    };
};

export type OpportunityNameQueryVariables = Exact<{
  ecoverseId: Scalars['UUID_NAMEID'];
  opportunityId: Scalars['UUID_NAMEID'];
}>;

export type OpportunityNameQuery = { __typename?: 'Query' } & {
  ecoverse: { __typename?: 'Ecoverse' } & Pick<Ecoverse, 'id'> & {
      opportunity: { __typename?: 'Opportunity' } & Pick<Opportunity, 'id' | 'displayName'>;
    };
};

export type OpportunityProfileQueryVariables = Exact<{
  ecoverseId: Scalars['UUID_NAMEID'];
  opportunityId: Scalars['UUID_NAMEID'];
}>;

export type OpportunityProfileQuery = { __typename?: 'Query' } & {
  ecoverse: { __typename?: 'Ecoverse' } & Pick<Ecoverse, 'id'> & {
      opportunity: { __typename?: 'Opportunity' } & Pick<Opportunity, 'id' | 'nameID' | 'displayName'> & {
          lifecycle?: Maybe<{ __typename?: 'Lifecycle' } & Pick<Lifecycle, 'state'>>;
          context?: Maybe<
            { __typename?: 'Context' } & Pick<
              Context,
              'id' | 'tagline' | 'background' | 'vision' | 'impact' | 'who'
            > & {
                references?: Maybe<
                  Array<{ __typename?: 'Reference' } & Pick<Reference, 'id' | 'name' | 'uri' | 'description'>>
                >;
                aspects?: Maybe<
                  Array<{ __typename?: 'Aspect' } & Pick<Aspect, 'id' | 'title' | 'framing' | 'explanation'>>
                >;
                ecosystemModel?: Maybe<
                  { __typename?: 'EcosystemModel' } & Pick<EcosystemModel, 'id'> & {
                      actorGroups?: Maybe<
                        Array<
                          { __typename?: 'ActorGroup' } & Pick<ActorGroup, 'id' | 'name' | 'description'> & {
                              actors?: Maybe<
                                Array<
                                  { __typename?: 'Actor' } & Pick<
                                    Actor,
                                    'id' | 'name' | 'description' | 'value' | 'impact'
                                  >
                                >
                              >;
                            }
                        >
                      >;
                    }
                >;
              }
          >;
          community?: Maybe<
            { __typename?: 'Community' } & {
              members?: Maybe<Array<{ __typename?: 'User' } & Pick<User, 'displayName'>>>;
            }
          >;
          tagset?: Maybe<{ __typename?: 'Tagset' } & Pick<Tagset, 'name' | 'tags'>>;
          projects?: Maybe<Array<{ __typename?: 'Project' } & ProjectDetailsFragment>>;
          relations?: Maybe<
            Array<
              { __typename?: 'Relation' } & Pick<
                Relation,
                'id' | 'type' | 'actorRole' | 'actorName' | 'actorType' | 'description'
              >
            >
          >;
          activity?: Maybe<Array<{ __typename?: 'NVP' } & Pick<Nvp, 'name' | 'value'>>>;
        };
    };
};

export type OpportunityProfileInfoQueryVariables = Exact<{
  ecoverseId: Scalars['UUID_NAMEID'];
  opportunityId: Scalars['UUID_NAMEID'];
}>;

export type OpportunityProfileInfoQuery = { __typename?: 'Query' } & {
  ecoverse: { __typename?: 'Ecoverse' } & Pick<Ecoverse, 'id'> & {
      opportunity: { __typename?: 'Opportunity' } & Pick<Opportunity, 'id' | 'nameID' | 'displayName'> & {
          context?: Maybe<{ __typename?: 'Context' } & ContextDetailsFragment>;
        };
    };
};

export type OpportunityRelationsQueryVariables = Exact<{
  ecoverseId: Scalars['UUID_NAMEID'];
  opportunityId: Scalars['UUID_NAMEID'];
}>;

export type OpportunityRelationsQuery = { __typename?: 'Query' } & {
  ecoverse: { __typename?: 'Ecoverse' } & Pick<Ecoverse, 'id'> & {
      opportunity: { __typename?: 'Opportunity' } & {
        relations?: Maybe<
          Array<
            { __typename?: 'Relation' } & Pick<
              Relation,
              'actorRole' | 'actorName' | 'actorType' | 'description' | 'type'
            >
          >
        >;
      };
    };
};

export type OpportunityTemplateQueryVariables = Exact<{ [key: string]: never }>;

export type OpportunityTemplateQuery = { __typename?: 'Query' } & {
  configuration: { __typename?: 'Config' } & {
    template: { __typename?: 'Template' } & {
      opportunities: Array<
        { __typename?: 'OpportunityTemplate' } & Pick<OpportunityTemplate, 'aspects' | 'actorGroups'>
      >;
    };
  };
};

export type OpportunityUserIdsQueryVariables = Exact<{
  ecoverseId: Scalars['UUID_NAMEID'];
  opportunityId: Scalars['UUID_NAMEID'];
}>;

export type OpportunityUserIdsQuery = { __typename?: 'Query' } & {
  ecoverse: { __typename?: 'Ecoverse' } & Pick<Ecoverse, 'id'> & {
      opportunity: { __typename?: 'Opportunity' } & {
        community?: Maybe<
          { __typename?: 'Community' } & { members?: Maybe<Array<{ __typename?: 'User' } & Pick<User, 'id'>>> }
        >;
      };
    };
};

export type OrganizationCardQueryVariables = Exact<{
  id: Scalars['UUID_NAMEID'];
}>;

export type OrganizationCardQuery = { __typename?: 'Query' } & {
  organisation: { __typename?: 'Organisation' } & Pick<Organisation, 'id' | 'displayName'> & {
      groups?: Maybe<Array<{ __typename?: 'UserGroup' } & Pick<UserGroup, 'name'>>>;
      members?: Maybe<Array<{ __typename?: 'User' } & Pick<User, 'id'>>>;
      profile: { __typename?: 'Profile' } & Pick<Profile, 'id' | 'description' | 'avatar'>;
    };
};

export type OrganizationDetailsQueryVariables = Exact<{
  id: Scalars['UUID_NAMEID'];
}>;

export type OrganizationDetailsQuery = { __typename?: 'Query' } & {
  organisation: { __typename?: 'Organisation' } & Pick<Organisation, 'id' | 'displayName'> & {
      profile: { __typename?: 'Profile' } & Pick<Profile, 'id' | 'avatar' | 'description'> & {
          references?: Maybe<Array<{ __typename?: 'Reference' } & Pick<Reference, 'name' | 'uri'>>>;
          tagsets?: Maybe<Array<{ __typename?: 'Tagset' } & Pick<Tagset, 'id' | 'name' | 'tags'>>>;
        };
      groups?: Maybe<
        Array<
          { __typename?: 'UserGroup' } & Pick<UserGroup, 'id' | 'name'> & {
              members?: Maybe<Array<{ __typename?: 'User' } & Pick<User, 'id' | 'displayName'>>>;
            }
        >
      >;
    };
};

export type OrganizationGroupsQueryVariables = Exact<{
  id: Scalars['UUID_NAMEID'];
}>;

export type OrganizationGroupsQuery = { __typename?: 'Query' } & {
  organisation: { __typename?: 'Organisation' } & {
    groups?: Maybe<Array<{ __typename?: 'UserGroup' } & Pick<UserGroup, 'id' | 'name'>>>;
  };
};

export type OrganizationNameQueryVariables = Exact<{
  id: Scalars['UUID_NAMEID'];
}>;

export type OrganizationNameQuery = { __typename?: 'Query' } & {
  organisation: { __typename?: 'Organisation' } & Pick<Organisation, 'displayName'>;
};

export type OrganizationProfileInfoQueryVariables = Exact<{
  id: Scalars['UUID_NAMEID'];
}>;

export type OrganizationProfileInfoQuery = { __typename?: 'Query' } & {
  organisation: { __typename?: 'Organisation' } & OrganizationProfileInfoFragment;
};

export type OrganizationsListQueryVariables = Exact<{ [key: string]: never }>;

export type OrganizationsListQuery = { __typename?: 'Query' } & {
  organisations: Array<{ __typename?: 'Organisation' } & Pick<Organisation, 'id' | 'displayName'>>;
};

export type ProjectProfileQueryVariables = Exact<{
  ecoverseId: Scalars['UUID_NAMEID'];
  projectId: Scalars['UUID_NAMEID'];
}>;

export type ProjectProfileQuery = { __typename?: 'Query' } & {
  ecoverse: { __typename?: 'Ecoverse' } & Pick<Ecoverse, 'id'> & {
      project: { __typename?: 'Project' } & ProjectDetailsFragment;
    };
};

export type ProjectsQueryVariables = Exact<{
  ecoverseId: Scalars['UUID_NAMEID'];
}>;

export type ProjectsQuery = { __typename?: 'Query' } & {
  ecoverse: { __typename?: 'Ecoverse' } & Pick<Ecoverse, 'id'> & {
      projects: Array<
        { __typename?: 'Project' } & Pick<Project, 'id' | 'nameID' | 'displayName' | 'description'> & {
            lifecycle?: Maybe<{ __typename?: 'Lifecycle' } & Pick<Lifecycle, 'state'>>;
          }
      >;
    };
};

export type ProjectsChainHistoryQueryVariables = Exact<{
  ecoverseId: Scalars['UUID_NAMEID'];
}>;

export type ProjectsChainHistoryQuery = { __typename?: 'Query' } & {
  ecoverse: { __typename?: 'Ecoverse' } & Pick<Ecoverse, 'id'> & {
      challenges?: Maybe<
        Array<
          { __typename?: 'Challenge' } & Pick<Challenge, 'displayName' | 'nameID'> & {
              opportunities?: Maybe<
                Array<
                  { __typename?: 'Opportunity' } & Pick<Opportunity, 'nameID'> & {
                      projects?: Maybe<Array<{ __typename?: 'Project' } & Pick<Project, 'nameID'>>>;
                    }
                >
              >;
            }
        >
      >;
    };
};

export type RelationsQueryVariables = Exact<{
  ecoverseId: Scalars['UUID_NAMEID'];
  opportunityId: Scalars['UUID_NAMEID'];
}>;

export type RelationsQuery = { __typename?: 'Query' } & {
  ecoverse: { __typename?: 'Ecoverse' } & Pick<Ecoverse, 'id'> & {
      opportunity: { __typename?: 'Opportunity' } & {
        relations?: Maybe<
          Array<
            { __typename?: 'Relation' } & Pick<
              Relation,
              'id' | 'type' | 'actorName' | 'actorType' | 'actorRole' | 'description'
            >
          >
        >;
      };
    };
};

export type SearchQueryVariables = Exact<{
  searchData: SearchInput;
}>;

export type SearchQuery = { __typename?: 'Query' } & {
  search: Array<
    { __typename?: 'SearchResultEntry' } & Pick<SearchResultEntry, 'score' | 'terms'> & {
        result?: Maybe<
          | ({ __typename?: 'Organisation' } & Pick<Organisation, 'displayName' | 'id'>)
          | ({ __typename?: 'User' } & Pick<User, 'displayName' | 'id'>)
          | ({ __typename?: 'UserGroup' } & Pick<UserGroup, 'name' | 'id'>)
        >;
      }
  >;
};

export type ServerMetadataQueryVariables = Exact<{ [key: string]: never }>;

export type ServerMetadataQuery = { __typename?: 'Query' } & {
  metadata: { __typename?: 'Metadata' } & {
    services: Array<{ __typename?: 'ServiceMetadata' } & Pick<ServiceMetadata, 'name' | 'version'>>;
  };
};

export type TagsetsTemplateQueryVariables = Exact<{ [key: string]: never }>;

export type TagsetsTemplateQuery = { __typename?: 'Query' } & {
  configuration: { __typename?: 'Config' } & {
    template: { __typename?: 'Template' } & {
      users: Array<
        { __typename?: 'UserTemplate' } & {
          tagsets?: Maybe<Array<{ __typename?: 'TagsetTemplate' } & Pick<TagsetTemplate, 'name' | 'placeholder'>>>;
        }
      >;
    };
  };
};

export type UserQueryVariables = Exact<{
  id: Scalars['UUID_NAMEID_EMAIL'];
}>;

export type UserQuery = { __typename?: 'Query' } & {
  user: { __typename?: 'User' } & UserDetailsFragment & UserAgentFragment;
};

export type UserAvatarsQueryVariables = Exact<{
  ids: Array<Scalars['UUID_NAMEID_EMAIL']> | Scalars['UUID_NAMEID_EMAIL'];
}>;

export type UserAvatarsQuery = { __typename?: 'Query' } & {
  usersById: Array<
    { __typename?: 'User' } & Pick<User, 'id' | 'displayName'> & {
        profile?: Maybe<{ __typename?: 'Profile' } & Pick<Profile, 'id' | 'avatar'>>;
      }
  >;
};

export type UserCardDataQueryVariables = Exact<{
  ids: Array<Scalars['UUID_NAMEID_EMAIL']> | Scalars['UUID_NAMEID_EMAIL'];
}>;

export type UserCardDataQuery = { __typename?: 'Query' } & {
  usersById: Array<{ __typename: 'User' } & UserDetailsFragment & UserAgentFragment>;
};

export type UsersQueryVariables = Exact<{ [key: string]: never }>;

export type UsersQuery = { __typename?: 'Query' } & { users: Array<{ __typename?: 'User' } & UserDetailsFragment> };

export type UsersWithCredentialsQueryVariables = Exact<{
  input: UsersWithAuthorizationCredentialInput;
}>;

export type UsersWithCredentialsQuery = { __typename?: 'Query' } & {
  usersWithAuthorizationCredential: Array<
    { __typename?: 'User' } & Pick<User, 'id' | 'displayName' | 'firstName' | 'lastName' | 'email'>
  >;
};
