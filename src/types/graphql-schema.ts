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
  /** A short text based identifier, 3 <= length <= 20. Used for URL paths in clients. Characters allowed: a-z,A-Z,0-9. */
  TextID: string;
  /** The `Upload` scalar type represents a file upload. */
  Upload: File;
};

export type AadAuthProviderConfig = {
  __typename?: 'AadAuthProviderConfig';
  /** Config for accessing the Cherrytwist API. */
  apiConfig: ApiConfig;
  /** Scopes required for the user login. For OpenID Connect login flows, these are openid and profile + optionally offline_access if refresh tokens are utilized. */
  loginRequest: Scope;
  /** Config for MSAL authentication library on Cherrytwist Web Client. */
  msalConfig: MsalConfig;
  /** Scopes for silent token acquisition. Cherrytwist API scope + OpenID mandatory scopes. */
  silentRequest: Scope;
  /** Scopes for requesting a token. This is the Cherrytwist API app registration URI + ./default. */
  tokenRequest: Scope;
};

export type Actor = {
  __typename?: 'Actor';
  /** A description of this actor */
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
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
  /** A description of this group of actors */
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type ApiConfig = {
  __typename?: 'ApiConfig';
  /** Configuration payload for the Cherrytwist API. */
  resourceScope: Scalars['String'];
};

export type Application = {
  __typename?: 'Application';
  id: Scalars['ID'];
  lifecycle: Lifecycle;
  questions: Array<Question>;
  user: User;
};

export type ApplicationEventInput = {
  ID: Scalars['Float'];
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
  explanation: Scalars['String'];
  framing: Scalars['String'];
  id: Scalars['ID'];
  title: Scalars['String'];
};

export type AssignChallengeLeadInput = {
  challengeID: Scalars['String'];
  organisationID: Scalars['String'];
};

export type AssignCommunityMemberInput = {
  communityID: Scalars['Float'];
  userID: Scalars['Float'];
};

export type AssignUserGroupFocalPointInput = {
  groupID: Scalars['Float'];
  userID: Scalars['Float'];
};

export type AssignUserGroupMemberInput = {
  groupID: Scalars['Float'];
  userID: Scalars['Float'];
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

export type AuthenticationProviderConfigUnion = AadAuthProviderConfig | DemoAuthProviderConfig;

export type Challenge = {
  __typename?: 'Challenge';
  /** The community for the challenge. */
  community?: Maybe<Community>;
  /** The shared understanding for the challenge */
  context?: Maybe<Context>;
  id: Scalars['ID'];
  /** The Organisations that are leading this Challenge. */
  leadOrganisations: Array<Organisation>;
  /** The lifeycle for the Challenge. */
  lifecycle?: Maybe<Lifecycle>;
  /** The name of the challenge */
  name: Scalars['String'];
  /** The set of opportunities within this challenge. */
  opportunities?: Maybe<Array<Opportunity>>;
  /** The set of tags for the challenge */
  tagset?: Maybe<Tagset>;
  /** A short text identifier for this challenge */
  textID: Scalars['String'];
};

export type ChallengeEventInput = {
  ID: Scalars['Float'];
  eventName: Scalars['String'];
};

export type ChallengeTemplate = {
  __typename?: 'ChallengeTemplate';
  /** Application templates. */
  applications?: Maybe<Array<ApplicationTemplate>>;
  /** Challenge template name. */
  name: Scalars['String'];
};

export type CommunicationMessageResult = {
  __typename?: 'CommunicationMessageResult';
  /** The message being sent */
  message: Scalars['String'];
  /** The sender email */
  sender: Scalars['String'];
  /** The server timestamp in UTC */
  timestamp: Scalars['Float'];
};

export type CommunicationRoomDetailsResult = {
  __typename?: 'CommunicationRoomDetailsResult';
  /** The identifier of the room */
  id: Scalars['String'];
  /** Indicates whether this is a DM room */
  isDirect: Scalars['Boolean'];
  /** The message being sent */
  messages: Array<CommunicationMessageResult>;
  /** The recepient userID */
  receiverID?: Maybe<Scalars['String']>;
};

export type CommunicationRoomResult = {
  __typename?: 'CommunicationRoomResult';
  /** The identifier of the room */
  id: Scalars['String'];
  /** Indicates whether this is a DM room */
  isDirect: Scalars['Boolean'];
  /** The recepient userID */
  receiverID?: Maybe<Scalars['String']>;
};

export type CommunicationSendMessageInput = {
  /** The content of the message */
  message: Scalars['String'];
  /** The user ID of the receiver if attempting to direct message someone */
  receiverID: Scalars['ID'];
  /** The identifier of the room */
  roomID?: Maybe<Scalars['String']>;
};

export type Community = {
  __typename?: 'Community';
  /** Application available for this community. */
  applications: Array<Application>;
  /** Groups of users related to a Community. */
  groups?: Maybe<Array<UserGroup>>;
  id: Scalars['ID'];
  /** All users that are contributing to this Community. */
  members?: Maybe<Array<User>>;
  /** The name of the Community */
  name: Scalars['String'];
  /** The type of the Community */
  type: Scalars['String'];
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
  /** A detailed description of the current situation */
  background?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
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
  name: Scalars['String'];
  parentID: Scalars['Float'];
};

export type CreateActorInput = {
  description?: Maybe<Scalars['String']>;
  impact?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  parentID: Scalars['Float'];
  value?: Maybe<Scalars['String']>;
};

export type CreateApplicationInput = {
  parentID: Scalars['Float'];
  questions: Array<CreateNvpInput>;
  userId: Scalars['Float'];
};

export type CreateAspectInput = {
  explanation: Scalars['String'];
  framing: Scalars['String'];
  parentID: Scalars['Float'];
  title: Scalars['String'];
};

export type CreateChallengeInput = {
  context?: Maybe<CreateContextInput>;
  lifecycleTemplate?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  parentID: Scalars['Float'];
  tags?: Maybe<Array<Scalars['String']>>;
  textID: Scalars['TextID'];
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
  /** Context for the Ecoverse. */
  context?: Maybe<CreateContextInput>;
  /** The host Organisation for the ecoverse */
  hostID?: Maybe<Scalars['String']>;
  /** The name for the ecoverse */
  name: Scalars['String'];
  /** The set of tags to apply to this Ecoverse */
  tags?: Maybe<Array<Scalars['String']>>;
  /** The unique text ID for the ecoverse */
  textID: Scalars['TextID'];
};

export type CreateNvpInput = {
  name: Scalars['String'];
  value: Scalars['String'];
};

export type CreateOpportunityInput = {
  context?: Maybe<CreateContextInput>;
  lifecycleTemplate?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  parentID: Scalars['String'];
  tags?: Maybe<Array<Scalars['String']>>;
  textID: Scalars['TextID'];
};

export type CreateOrganisationInput = {
  /** The name for this organisation */
  name: Scalars['String'];
  profileData?: Maybe<CreateProfileInput>;
  /** The unique text based ID for this organisation */
  textID: Scalars['TextID'];
};

export type CreateProfileInput = {
  avatar?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  referencesData?: Maybe<Array<CreateReferenceInput>>;
  tagsetsData?: Maybe<Array<CreateTagsetInput>>;
};

export type CreateProjectInput = {
  description?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  parentID: Scalars['Float'];
  textID: Scalars['TextID'];
};

export type CreateReferenceInput = {
  description?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  parentID?: Maybe<Scalars['Float']>;
  uri?: Maybe<Scalars['String']>;
};

export type CreateRelationInput = {
  actorName: Scalars['String'];
  actorRole?: Maybe<Scalars['String']>;
  actorType?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  parentID: Scalars['Float'];
  type: Scalars['String'];
};

export type CreateTagsetInput = {
  name: Scalars['String'];
  parentID?: Maybe<Scalars['Float']>;
  tags?: Maybe<Array<Scalars['String']>>;
};

export type CreateUserGroupInput = {
  name: Scalars['String'];
  parentID: Scalars['Float'];
  profileData?: Maybe<CreateProfileInput>;
};

export type CreateUserInput = {
  accountUpn?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  firstName?: Maybe<Scalars['String']>;
  gender?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  profileData?: Maybe<CreateProfileInput>;
};

export type DeleteActorGroupInput = {
  ID: Scalars['Float'];
};

export type DeleteActorInput = {
  ID: Scalars['Float'];
};

export type DeleteApplicationInput = {
  ID: Scalars['Float'];
};

export type DeleteAspectInput = {
  ID: Scalars['Float'];
};

export type DeleteChallengeInput = {
  ID: Scalars['Float'];
};

export type DeleteOpportunityInput = {
  ID: Scalars['Float'];
};

export type DeleteOrganisationInput = {
  ID: Scalars['Float'];
};

export type DeleteProjectInput = {
  ID: Scalars['Float'];
};

export type DeleteReferenceInput = {
  ID: Scalars['Float'];
};

export type DeleteRelationInput = {
  ID: Scalars['Float'];
};

export type DeleteUserGroupInput = {
  ID: Scalars['Float'];
};

export type DeleteUserInput = {
  ID: Scalars['Float'];
};

export type DemoAuthProviderConfig = {
  __typename?: 'DemoAuthProviderConfig';
  /** Demo authentication provider issuer endpoint. */
  issuer: Scalars['String'];
  /** Demo authentication provider token endpoint. Use json payload in the form of username + password to login and obtain valid jwt token. */
  tokenEndpoint: Scalars['String'];
};

export type Ecoverse = {
  __typename?: 'Ecoverse';
  /** All applications to join */
  application: Application;
  /** A particular Challenge, either by its ID or textID */
  challenge: Challenge;
  /** The challenges for the ecoverse. */
  challenges?: Maybe<Array<Challenge>>;
  /** The community for the ecoverse. */
  community?: Maybe<Community>;
  /** The shared understanding for the Ecoverse */
  context?: Maybe<Context>;
  /** The user group with the specified id anywhere in the ecoverse */
  group: UserGroup;
  /** The User Groups on this Ecoverse */
  groups: Array<UserGroup>;
  /** All groups on this Ecoverse that have the provided tag */
  groupsWithTag: Array<UserGroup>;
  /** The organisation that hosts this Ecoverse instance */
  host?: Maybe<Organisation>;
  id: Scalars['ID'];
  name: Scalars['String'];
  /** All opportunities within the ecoverse */
  opportunities: Array<Opportunity>;
  /** A particular opportunitiy, identified by the ID or textID */
  opportunity: Opportunity;
  /** A particular Project, identified by the ID */
  project: Project;
  /** All projects within this ecoverse */
  projects: Array<Project>;
  /** The set of tags for the ecoverse */
  tagset?: Maybe<Tagset>;
  /** A short text identifier for this Ecoverse */
  textID: Scalars['String'];
};

export type EcoverseApplicationArgs = {
  ID: Scalars['Float'];
};

export type EcoverseChallengeArgs = {
  ID: Scalars['String'];
};

export type EcoverseGroupArgs = {
  ID: Scalars['String'];
};

export type EcoverseGroupsWithTagArgs = {
  tag: Scalars['String'];
};

export type EcoverseOpportunityArgs = {
  ID: Scalars['String'];
};

export type EcoverseProjectArgs = {
  ID: Scalars['String'];
};

export type EcoverseTemplate = {
  __typename?: 'EcoverseTemplate';
  /** Application templates. */
  applications?: Maybe<Array<ApplicationTemplate>>;
  /** Ecoverse template name. */
  name: Scalars['String'];
};

export type Lifecycle = {
  __typename?: 'Lifecycle';
  id: Scalars['ID'];
  /** The machine definition, describing the states, transitions etc for this Lifeycle. */
  machineDef: Scalars['JSON'];
  /** The next events of this Lifecycle. */
  nextEvents?: Maybe<Array<Scalars['String']>>;
  /** The current state of this Lifecycle. */
  state?: Maybe<Scalars['String']>;
  /** The Lifecycle template identifier. */
  templateId?: Maybe<Scalars['String']>;
};

export type MemberOf = {
  __typename?: 'MemberOf';
  /** References to the Communities the user is a member of */
  communities: Array<Community>;
  /** References to the orgnaisaitons the user is a member of */
  organisations: Array<Organisation>;
};

export type Message = {
  __typename?: 'Message';
  id: Scalars['ID'];
  message: Scalars['String'];
  reciever: Scalars['String'];
  sender: Scalars['String'];
  timestamp: Scalars['Float'];
};

export type Metadata = {
  __typename?: 'Metadata';
  /** Collection of metadata about Cherrytwist services. */
  services: Array<ServiceMetadata>;
};

export type MsalAuth = {
  __typename?: 'MsalAuth';
  /** Azure Active Directory OpenID Connect Authority. */
  authority: Scalars['String'];
  /** Cherrytwist Web Client App Registration Client Id. */
  clientId: Scalars['String'];
  /** Cherrytwist Web Client Login Redirect Uri. */
  redirectUri: Scalars['String'];
};

export type MsalCache = {
  __typename?: 'MsalCache';
  /** Cache location, e.g. localStorage.  */
  cacheLocation?: Maybe<Scalars['String']>;
  /** Is the authentication information stored in a cookie? */
  storeAuthStateInCookie?: Maybe<Scalars['Boolean']>;
};

export type MsalConfig = {
  __typename?: 'MsalConfig';
  /** Azure Active Directory OpenID Connect endpoint configuration. */
  auth: MsalAuth;
  /** Token cache configuration.  */
  cache: MsalCache;
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Assigns an organisation as a lead for the Challenge. */
  assignChallengeLead: Challenge;
  /** Assigns a User as the focal point of the specified User Group. */
  assignGroupFocalPoint?: Maybe<UserGroup>;
  /** Assigns a User as a member of the specified Community. */
  assignUserToCommunity: UserGroup;
  /** Assigns a User as a member of the specified User Group. */
  assignUserToGroup: UserGroup;
  /** Creates a new Actor in the specified ActorGroup. */
  createActor: Actor;
  /** Create a new Actor Group on the Opportunity. */
  createActorGroup: ActorGroup;
  /** Creates Application for a User to join this Community. */
  createApplication: Application;
  /** Create a new Aspect on the Opportunity. */
  createAspect: Aspect;
  /** Create a new Aspect on the Project. */
  createAspectOnProject: Aspect;
  /** Creates a new Challenge within the specified Ecoverse. */
  createChallenge: Challenge;
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
  /** Deletes the Opportunity. */
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
  /** Trigger an event on an Opportunity. */
  eventOnOpportunity: Opportunity;
  /** Trigger an event on the Project. */
  eventOnProject: Project;
  /** Sends a message on the specified User`s behalf and returns the room id */
  message: Scalars['String'];
  /** Remove an organisation as a lead for the Challenge. */
  removeChallengeLead: Challenge;
  /** Removes the focal point for the specified User Group. */
  removeGroupFocalPoint?: Maybe<UserGroup>;
  /** Removes a User as a member of the specified Community. */
  removeUserFromCommunity: UserGroup;
  /** Removes the specified User from specified user group */
  removeUserFromGroup: UserGroup;
  /** Updates the specified Actor. */
  updateActor: Actor;
  /** Updates the specified Aspect. */
  updateAspect: Aspect;
  /** Updates the specified Challenge. */
  updateChallenge: Challenge;
  /** Updates the Ecoverse. */
  updateEcoverse: Ecoverse;
  /** Updates the Opportunity. */
  updateOpportunity: Opportunity;
  /** Updates the specified Organisation. */
  updateOrganisation: Organisation;
  /** Updates the specified Profile. */
  updateProfile: Profile;
  /** Updates the specified Project. */
  updateProject: Project;
  /** Update the specified Reference. */
  updateReference: Reference;
  /** Updates the Tagset. */
  updateTagset: Tagset;
  /** Updates the User. Note: email address cannot be updated. */
  updateUser: User;
  /** Updates the specified User Group. */
  updateUserGroup: UserGroup;
  /** Uploads and sets an avatar image for the specified Profile. */
  uploadAvatar: Profile;
};

export type MutationAssignChallengeLeadArgs = {
  assignInput: AssignChallengeLeadInput;
};

export type MutationAssignGroupFocalPointArgs = {
  membershipData: AssignUserGroupFocalPointInput;
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
  referenceInput: CreateReferenceInput;
};

export type MutationCreateReferenceOnProfileArgs = {
  referenceInput: CreateReferenceInput;
};

export type MutationCreateRelationArgs = {
  relationData: CreateRelationInput;
};

export type MutationCreateTagsetOnProfileArgs = {
  tagsetData: CreateTagsetInput;
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

export type MutationMessageArgs = {
  msgData: CommunicationSendMessageInput;
};

export type MutationRemoveChallengeLeadArgs = {
  removeData: RemoveChallengeLeadInput;
};

export type MutationRemoveGroupFocalPointArgs = {
  removeData: RemoveUserGroupFocalPoint;
};

export type MutationRemoveUserFromCommunityArgs = {
  membershipData: RemoveCommunityMemberInput;
};

export type MutationRemoveUserFromGroupArgs = {
  membershipData: RemoveUserGroupMemberInput;
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

export type MutationUpdateReferenceArgs = {
  updateData: UpdateReferenceInput;
};

export type MutationUpdateTagsetArgs = {
  tagsetData: UpdateTagsetInput;
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

export type Opportunity = {
  __typename?: 'Opportunity';
  /** The set of actor groups within the context of this Opportunity. */
  actorGroups?: Maybe<Array<ActorGroup>>;
  /** The set of aspects within the context of this Opportunity. */
  aspects?: Maybe<Array<Aspect>>;
  /** The community for the opportunity. */
  community?: Maybe<Community>;
  /** The shared understanding for the opportunity */
  context?: Maybe<Context>;
  id: Scalars['ID'];
  /** The lifeycle for the Challenge. */
  lifecycle?: Maybe<Lifecycle>;
  /** The name of the Opportunity */
  name: Scalars['String'];
  /** The set of projects within the context of this Opportunity */
  projects?: Maybe<Array<Project>>;
  /** The set of relations within the context of this Opportunity. */
  relations?: Maybe<Array<Relation>>;
  /** The set of tags for the Opportunity */
  tagset?: Maybe<Tagset>;
  /** A short text identifier for this Opportunity */
  textID: Scalars['String'];
};

export type OpportunityEventInput = {
  ID: Scalars['Float'];
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

export type Organisation = {
  __typename?: 'Organisation';
  /** Groups defined on this organisation. */
  groups?: Maybe<Array<UserGroup>>;
  id: Scalars['ID'];
  /** Users that are contributing to this organisation. */
  members?: Maybe<Array<User>>;
  name: Scalars['String'];
  /** The profile for this organisation. */
  profile: Profile;
  /** A short text identifier for this Organisation */
  textID: Scalars['String'];
};

export type Profile = {
  __typename?: 'Profile';
  /** A URI that points to the location of an avatar, either on a shared location or a gravatar */
  avatar?: Maybe<Scalars['String']>;
  /** A short description of the entity associated with this profile. */
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  /** A list of URLs to relevant information. */
  references?: Maybe<Array<Reference>>;
  /** A list of named tagsets, each of which has a list of tags. */
  tagsets?: Maybe<Array<Tagset>>;
};

export type Project = {
  __typename?: 'Project';
  /** The set of aspects for this Project. Note: likley to change. */
  aspects?: Maybe<Array<Aspect>>;
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  /** The maturity phase of the project i.e. new, being refined, committed, in-progress, closed etc */
  lifecycle?: Maybe<Lifecycle>;
  name: Scalars['String'];
  /** The set of tags for the project */
  tagset?: Maybe<Tagset>;
  /** A short text identifier for this Opportunity */
  textID: Scalars['String'];
};

export type ProjectEventInput = {
  ID: Scalars['Float'];
  eventName: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  /** Cherrytwist configuration. Provides configuration to external services in the Cherrytwist ecosystem. */
  configuration: Config;
  /** An ecoverse. If no ID is specified then the first Ecoverse is returned. */
  ecoverse: Ecoverse;
  /** The currently logged in user */
  me: User;
  messages: Array<Message>;
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
  /** The users who have profiles on this platform */
  users: Array<User>;
  /** The users filtered by list of IDs. */
  usersById: Array<User>;
};

export type QueryEcoverseArgs = {
  ID?: Maybe<Scalars['Float']>;
};

export type QueryOrganisationArgs = {
  ID: Scalars['String'];
};

export type QuerySearchArgs = {
  searchData: SearchInput;
};

export type QueryUserArgs = {
  ID: Scalars['String'];
};

export type QueryUsersByIdArgs = {
  IDs: Array<Scalars['String']>;
};

export type Question = {
  __typename?: 'Question';
  id: Scalars['ID'];
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
  description: Scalars['String'];
  id: Scalars['ID'];
  name: Scalars['String'];
  uri: Scalars['String'];
};

export type Relation = {
  __typename?: 'Relation';
  actorName: Scalars['String'];
  actorRole: Scalars['String'];
  actorType: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  type: Scalars['String'];
};

export type RemoveChallengeLeadInput = {
  challengeID: Scalars['String'];
  organisationID: Scalars['String'];
};

export type RemoveCommunityMemberInput = {
  communityID: Scalars['Float'];
  userID: Scalars['Float'];
};

export type RemoveUserGroupFocalPoint = {
  groupID: Scalars['Float'];
};

export type RemoveUserGroupMemberInput = {
  groupID: Scalars['Float'];
  userID: Scalars['Float'];
};

export type Scope = {
  __typename?: 'Scope';
  /** OpenID Scopes. */
  scopes: Array<Scalars['String']>;
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

export type SearchResult = Organisation | User | UserGroup;

export type SearchResultEntry = {
  __typename?: 'SearchResultEntry';
  /** Each search result contains either a User, UserGroup or Organisation */
  result?: Maybe<SearchResult>;
  /** The score for this search result; more matches means a higher score. */
  score?: Maybe<Scalars['Float']>;
  /** The terms that were matched for this result */
  terms?: Maybe<Array<Scalars['String']>>;
};

export type ServiceMetadata = {
  __typename?: 'ServiceMetadata';
  /** Service name e.g. CT Server */
  name?: Maybe<Scalars['String']>;
  /** Version in the format {major.minor.patch} - using SemVer. */
  version?: Maybe<Scalars['String']>;
};

export type Subscription = {
  __typename?: 'Subscription';
  avatarUploaded: Profile;
  messageReceived: Message;
};

export type Tagset = {
  __typename?: 'Tagset';
  id: Scalars['ID'];
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
  ID: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  impact?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

export type UpdateAspectInput = {
  ID: Scalars['String'];
  explanation?: Maybe<Scalars['String']>;
  framing?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
};

export type UpdateChallengeInput = {
  ID: Scalars['String'];
  context?: Maybe<UpdateContextInput>;
  name?: Maybe<Scalars['String']>;
  tags?: Maybe<Array<Scalars['String']>>;
};

export type UpdateContextInput = {
  background?: Maybe<Scalars['String']>;
  impact?: Maybe<Scalars['String']>;
  tagline?: Maybe<Scalars['String']>;
  vision?: Maybe<Scalars['String']>;
  who?: Maybe<Scalars['String']>;
};

export type UpdateEcoverseInput = {
  ID: Scalars['String'];
  /** Updated context for the ecoverse; will be merged with existing context */
  context?: Maybe<UpdateContextInput>;
  /** The host Organisation for the ecoverse */
  hostID?: Maybe<Scalars['String']>;
  /** The new name for the ecoverse */
  name?: Maybe<Scalars['String']>;
  /** The set of tags to apply to this ecoverse */
  tags?: Maybe<Array<Scalars['String']>>;
};

export type UpdateOpportunityInput = {
  ID: Scalars['String'];
  context?: Maybe<UpdateContextInput>;
  name?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['String']>;
  tags?: Maybe<Array<Scalars['String']>>;
};

export type UpdateOrganisationInput = {
  ID: Scalars['String'];
  /** The name for this organisation */
  name?: Maybe<Scalars['String']>;
  profileData?: Maybe<UpdateProfileInput>;
};

export type UpdateProfileInput = {
  ID: Scalars['String'];
  avatar?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
};

export type UpdateProjectInput = {
  ID: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  textID: Scalars['String'];
};

export type UpdateReferenceInput = {
  ID: Scalars['Float'];
  description?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  uri?: Maybe<Scalars['String']>;
};

export type UpdateTagsetInput = {
  ID: Scalars['Float'];
  name?: Maybe<Scalars['String']>;
  tags?: Maybe<Array<Scalars['String']>>;
};

export type UpdateUserGroupInput = {
  ID: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  profileData?: Maybe<UpdateProfileInput>;
};

export type UpdateUserInput = {
  ID: Scalars['String'];
  accountUpn?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  gender?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  profileData?: Maybe<UpdateProfileInput>;
};

export type UploadProfileAvatarInput = {
  file: Scalars['String'];
  profileID: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  /** The unique personal identifier (upn) for the account associated with this user profile */
  accountUpn: Scalars['String'];
  city: Scalars['String'];
  country: Scalars['String'];
  email: Scalars['String'];
  firstName: Scalars['String'];
  gender: Scalars['String'];
  id: Scalars['ID'];
  lastName: Scalars['String'];
  /** An overview of the groups this user is a memberof. Note: all groups are returned without members to avoid recursion. */
  memberof?: Maybe<MemberOf>;
  name: Scalars['String'];
  phone: Scalars['String'];
  /** The profile for this user */
  profile?: Maybe<Profile>;
  /** An overview of the rooms this user is a member of */
  room?: Maybe<CommunicationRoomDetailsResult>;
  /** An overview of the rooms this user is a member of */
  rooms?: Maybe<Array<CommunicationRoomResult>>;
};

export type UserRoomArgs = {
  roomID: Scalars['String'];
};

export type UserGroup = {
  __typename?: 'UserGroup';
  /** The User that is the focal point of this User Group. */
  focalPoint?: Maybe<User>;
  id: Scalars['ID'];
  /** The Users that are members of this User Group. */
  members?: Maybe<Array<User>>;
  name: Scalars['String'];
  /** Containing entity for this UserGroup. */
  parent?: Maybe<UserGroupParent>;
  /** The profile for the user group */
  profile?: Maybe<Profile>;
};

export type UserGroupParent = Community | Organisation;

export type UserTemplate = {
  __typename?: 'UserTemplate';
  /** User template name. */
  name: Scalars['String'];
  /** Tagset templates. */
  tagsets?: Maybe<Array<TagsetTemplate>>;
};

export type CommunityDetailsFragment = { __typename?: 'Community' } & Pick<Community, 'id' | 'name' | 'type'> & {
    applications: Array<{ __typename?: 'Application' } & Pick<Application, 'id'>>;
    groups?: Maybe<
      Array<
        { __typename?: 'UserGroup' } & Pick<UserGroup, 'id' | 'name'> & {
            members?: Maybe<
              Array<{ __typename?: 'User' } & Pick<User, 'id' | 'name' | 'firstName' | 'lastName' | 'email'>>
            >;
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

export type GroupDetailsFragment = { __typename?: 'UserGroup' } & Pick<UserGroup, 'id' | 'name'>;

export type GroupMembersFragment = { __typename?: 'User' } & Pick<
  User,
  'id' | 'name' | 'firstName' | 'lastName' | 'email'
>;

export type NewChallengeFragment = { __typename?: 'Challenge' } & Pick<Challenge, 'id' | 'textID' | 'name'>;

export type NewOpportunityFragment = { __typename?: 'Opportunity' } & Pick<Opportunity, 'id' | 'textID' | 'name'>;

export type ProjectDetailsFragment = { __typename?: 'Project' } & Pick<
  Project,
  'id' | 'textID' | 'name' | 'description'
> & {
    lifecycle?: Maybe<{ __typename?: 'Lifecycle' } & Pick<Lifecycle, 'state'>>;
    tagset?: Maybe<{ __typename?: 'Tagset' } & Pick<Tagset, 'name' | 'tags'>>;
    aspects?: Maybe<Array<{ __typename?: 'Aspect' } & Pick<Aspect, 'title' | 'framing' | 'explanation'>>>;
  };

export type UserDetailsFragment = { __typename?: 'User' } & Pick<
  User,
  'id' | 'name' | 'firstName' | 'lastName' | 'email' | 'gender' | 'country' | 'city' | 'phone' | 'accountUpn'
> & {
    profile?: Maybe<
      { __typename?: 'Profile' } & Pick<Profile, 'id' | 'description' | 'avatar'> & {
          references?: Maybe<Array<{ __typename?: 'Reference' } & Pick<Reference, 'id' | 'name' | 'uri'>>>;
          tagsets?: Maybe<Array<{ __typename?: 'Tagset' } & Pick<Tagset, 'id' | 'name' | 'tags'>>>;
        }
    >;
  };

export type UserMembersFragment = { __typename?: 'User' } & {
  memberof?: Maybe<
    { __typename?: 'MemberOf' } & {
      communities: Array<
        { __typename?: 'Community' } & Pick<Community, 'id' | 'name' | 'type'> & {
            groups?: Maybe<Array<{ __typename?: 'UserGroup' } & Pick<UserGroup, 'name'>>>;
          }
      >;
      organisations: Array<{ __typename?: 'Organisation' } & Pick<Organisation, 'id' | 'name'>>;
    }
  >;
};

export type AssignUserToCommunityMutationVariables = Exact<{
  membershipData: AssignCommunityMemberInput;
}>;

export type AssignUserToCommunityMutation = { __typename?: 'Mutation' } & {
  assignUserToCommunity: { __typename?: 'UserGroup' } & Pick<UserGroup, 'id' | 'name'>;
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
  createAspect: { __typename?: 'Aspect' } & Pick<Aspect, 'title'>;
};

export type CreateChallengeMutationVariables = Exact<{
  input: CreateChallengeInput;
}>;

export type CreateChallengeMutation = { __typename?: 'Mutation' } & {
  createChallenge: { __typename?: 'Challenge' } & NewChallengeFragment;
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
  createOrganisation: { __typename?: 'Organisation' } & Pick<Organisation, 'id' | 'textID' | 'name'>;
};

export type CreateProjectMutationVariables = Exact<{
  input: CreateProjectInput;
}>;

export type CreateProjectMutation = { __typename?: 'Mutation' } & {
  createProject: { __typename?: 'Project' } & ProjectDetailsFragment;
};

export type CreateRelationMutationVariables = Exact<{
  input: CreateRelationInput;
}>;

export type CreateRelationMutation = { __typename?: 'Mutation' } & {
  createRelation: { __typename?: 'Relation' } & Pick<Relation, 'id'>;
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

export type RemoveUserFromGroupMutationVariables = Exact<{
  input: RemoveUserGroupMemberInput;
}>;

export type RemoveUserFromGroupMutation = { __typename?: 'Mutation' } & {
  removeUserFromGroup: { __typename?: 'UserGroup' } & Pick<UserGroup, 'id' | 'name'> & {
      members?: Maybe<Array<{ __typename?: 'User' } & GroupMembersFragment>>;
    };
};

export type SendMessageMutationVariables = Exact<{
  msgData: CommunicationSendMessageInput;
}>;

export type SendMessageMutation = { __typename?: 'Mutation' } & Pick<Mutation, 'message'>;

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
  updateChallenge: { __typename?: 'Challenge' } & Pick<Challenge, 'id' | 'textID' | 'name'>;
};

export type UpdateOpportunityMutationVariables = Exact<{
  opportunityData: UpdateOpportunityInput;
}>;

export type UpdateOpportunityMutation = { __typename?: 'Mutation' } & {
  updateOpportunity: { __typename?: 'Opportunity' } & Pick<Opportunity, 'id' | 'name'>;
};

export type UpdateOrganizationMutationVariables = Exact<{
  input: UpdateOrganisationInput;
}>;

export type UpdateOrganizationMutation = { __typename?: 'Mutation' } & {
  updateOrganisation: { __typename?: 'Organisation' } & Pick<Organisation, 'id' | 'name'>;
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

export type AllOpportunitiesQueryVariables = Exact<{ [key: string]: never }>;

export type AllOpportunitiesQuery = { __typename?: 'Query' } & {
  ecoverse: { __typename?: 'Ecoverse' } & Pick<Ecoverse, 'id'> & {
      opportunities: Array<{ __typename?: 'Opportunity' } & Pick<Opportunity, 'id' | 'textID'>>;
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
          > & {
              config:
                | ({ __typename: 'AadAuthProviderConfig' } & {
                    msalConfig: { __typename?: 'MsalConfig' } & {
                      auth: { __typename?: 'MsalAuth' } & Pick<MsalAuth, 'authority' | 'clientId' | 'redirectUri'>;
                      cache: { __typename?: 'MsalCache' } & Pick<MsalCache, 'cacheLocation' | 'storeAuthStateInCookie'>;
                    };
                    apiConfig: { __typename?: 'ApiConfig' } & Pick<ApiConfig, 'resourceScope'>;
                    loginRequest: { __typename?: 'Scope' } & Pick<Scope, 'scopes'>;
                    tokenRequest: { __typename?: 'Scope' } & Pick<Scope, 'scopes'>;
                    silentRequest: { __typename?: 'Scope' } & Pick<Scope, 'scopes'>;
                  })
                | ({ __typename: 'DemoAuthProviderConfig' } & Pick<DemoAuthProviderConfig, 'issuer' | 'tokenEndpoint'>);
            }
        >;
      };
  };
};

export type ChallengeCommunityQueryVariables = Exact<{
  id: Scalars['String'];
}>;

export type ChallengeCommunityQuery = { __typename?: 'Query' } & {
  ecoverse: { __typename?: 'Ecoverse' } & Pick<Ecoverse, 'id'> & {
      challenge: { __typename?: 'Challenge' } & Pick<Challenge, 'id' | 'name'> & {
          community?: Maybe<{ __typename?: 'Community' } & CommunityDetailsFragment>;
        };
    };
};

export type ChallengeGroupsQueryVariables = Exact<{
  id: Scalars['String'];
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
  challengeID: Scalars['String'];
}>;

export type ChallengeMembersQuery = { __typename?: 'Query' } & {
  ecoverse: { __typename?: 'Ecoverse' } & Pick<Ecoverse, 'id'> & {
      challenge: { __typename?: 'Challenge' } & {
        community?: Maybe<
          { __typename?: 'Community' } & {
            members?: Maybe<
              Array<{ __typename?: 'User' } & Pick<User, 'id' | 'name' | 'firstName' | 'lastName' | 'email'>>
            >;
          }
        >;
      };
    };
};

export type ChallengeNameQueryVariables = Exact<{
  id: Scalars['String'];
}>;

export type ChallengeNameQuery = { __typename?: 'Query' } & {
  ecoverse: { __typename?: 'Ecoverse' } & Pick<Ecoverse, 'id'> & {
      challenge: { __typename?: 'Challenge' } & Pick<Challenge, 'id' | 'name'> & {
          community?: Maybe<{ __typename?: 'Community' } & Pick<Community, 'id' | 'name'>>;
        };
    };
};

export type ChallengeProfileQueryVariables = Exact<{
  id: Scalars['String'];
}>;

export type ChallengeProfileQuery = { __typename?: 'Query' } & {
  ecoverse: { __typename?: 'Ecoverse' } & Pick<Ecoverse, 'id'> & {
      challenge: { __typename?: 'Challenge' } & Pick<Challenge, 'id' | 'textID' | 'name'> & {
          lifecycle?: Maybe<{ __typename?: 'Lifecycle' } & Pick<Lifecycle, 'state'>>;
          context?: Maybe<{ __typename?: 'Context' } & ContextDetailsFragment>;
          community?: Maybe<
            { __typename?: 'Community' } & { members?: Maybe<Array<{ __typename?: 'User' } & Pick<User, 'name'>>> }
          >;
          tagset?: Maybe<{ __typename?: 'Tagset' } & Pick<Tagset, 'name' | 'tags'>>;
          opportunities?: Maybe<
            Array<
              { __typename?: 'Opportunity' } & Pick<Opportunity, 'id' | 'name' | 'textID'> & {
                  lifecycle?: Maybe<{ __typename?: 'Lifecycle' } & Pick<Lifecycle, 'state'>>;
                  context?: Maybe<{ __typename?: 'Context' } & ContextDetailsFragment>;
                  projects?: Maybe<
                    Array<
                      { __typename?: 'Project' } & Pick<Project, 'id' | 'textID' | 'name' | 'description'> & {
                          lifecycle?: Maybe<{ __typename?: 'Lifecycle' } & Pick<Lifecycle, 'state'>>;
                        }
                    >
                  >;
                }
            >
          >;
          leadOrganisations: Array<
            { __typename?: 'Organisation' } & Pick<Organisation, 'id' | 'name'> & {
                profile: { __typename?: 'Profile' } & Pick<Profile, 'id' | 'avatar'>;
              }
          >;
        };
    };
};

export type ChallengeProfileInfoQueryVariables = Exact<{
  id: Scalars['String'];
}>;

export type ChallengeProfileInfoQuery = { __typename?: 'Query' } & {
  ecoverse: { __typename?: 'Ecoverse' } & Pick<Ecoverse, 'id'> & {
      challenge: { __typename?: 'Challenge' } & Pick<Challenge, 'id' | 'textID' | 'name'> & {
          lifecycle?: Maybe<{ __typename?: 'Lifecycle' } & Pick<Lifecycle, 'state'>>;
          context?: Maybe<{ __typename?: 'Context' } & ContextDetailsFragment>;
        };
    };
};

export type ChallengeUserIdsQueryVariables = Exact<{
  id: Scalars['String'];
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

export type ChallengesQueryVariables = Exact<{ [key: string]: never }>;

export type ChallengesQuery = { __typename?: 'Query' } & {
  ecoverse: { __typename?: 'Ecoverse' } & Pick<Ecoverse, 'id'> & {
      challenges?: Maybe<
        Array<
          { __typename?: 'Challenge' } & Pick<Challenge, 'id' | 'name' | 'textID'> & {
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

export type ChallengesWithCommunityQueryVariables = Exact<{ [key: string]: never }>;

export type ChallengesWithCommunityQuery = { __typename?: 'Query' } & {
  ecoverse: { __typename?: 'Ecoverse' } & Pick<Ecoverse, 'id'> & {
      challenges?: Maybe<
        Array<
          { __typename?: 'Challenge' } & Pick<Challenge, 'id' | 'name'> & {
              community?: Maybe<{ __typename?: 'Community' } & Pick<Community, 'id' | 'name'>>;
            }
        >
      >;
    };
};

export type EcoverseCommunityQueryVariables = Exact<{ [key: string]: never }>;

export type EcoverseCommunityQuery = { __typename?: 'Query' } & {
  ecoverse: { __typename?: 'Ecoverse' } & Pick<Ecoverse, 'id'> & {
      community?: Maybe<{ __typename?: 'Community' } & CommunityDetailsFragment>;
    };
};

export type EcoverseGroupsListQueryVariables = Exact<{ [key: string]: never }>;

export type EcoverseGroupsListQuery = { __typename?: 'Query' } & {
  ecoverse: { __typename?: 'Ecoverse' } & Pick<Ecoverse, 'id'> & {
      groups: Array<{ __typename?: 'UserGroup' } & Pick<UserGroup, 'id' | 'name'>>;
    };
};

export type EcoverseHostReferencesQueryVariables = Exact<{ [key: string]: never }>;

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

export type EcoverseInfoQueryVariables = Exact<{ [key: string]: never }>;

export type EcoverseInfoQuery = { __typename?: 'Query' } & {
  ecoverse: { __typename?: 'Ecoverse' } & Pick<Ecoverse, 'id' | 'textID' | 'name'> & {
      context?: Maybe<
        { __typename?: 'Context' } & Pick<Context, 'tagline' | 'vision' | 'impact' | 'background'> & {
            references?: Maybe<Array<{ __typename?: 'Reference' } & Pick<Reference, 'name' | 'uri'>>>;
          }
      >;
      community?: Maybe<{ __typename?: 'Community' } & Pick<Community, 'id' | 'name'>>;
    };
};

export type EcoverseUserIdsQueryVariables = Exact<{ [key: string]: never }>;

export type EcoverseUserIdsQuery = { __typename?: 'Query' } & {
  users: Array<{ __typename?: 'User' } & Pick<User, 'id'>>;
};

export type GroupCardQueryVariables = Exact<{
  id: Scalars['String'];
}>;

export type GroupCardQuery = { __typename?: 'Query' } & {
  ecoverse: { __typename?: 'Ecoverse' } & Pick<Ecoverse, 'id'> & {
      group: { __typename: 'UserGroup' } & Pick<UserGroup, 'name'> & {
          parent?: Maybe<
            | ({ __typename: 'Community' } & Pick<Community, 'name'>)
            | ({ __typename: 'Organisation' } & Pick<Organisation, 'name'>)
          >;
          members?: Maybe<Array<{ __typename?: 'User' } & Pick<User, 'id' | 'name'>>>;
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
  id: Scalars['String'];
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
  me: { __typename?: 'User' } & UserDetailsFragment & UserMembersFragment;
};

export type MessagesQueryVariables = Exact<{ [key: string]: never }>;

export type MessagesQuery = { __typename?: 'Query' } & {
  messages: Array<{ __typename?: 'Message' } & Pick<Message, 'id' | 'message' | 'reciever' | 'sender' | 'timestamp'>>;
};

export type MyCommunitiesQueryVariables = Exact<{ [key: string]: never }>;

export type MyCommunitiesQuery = { __typename?: 'Query' } & {
  me: { __typename?: 'User' } & {
    memberof?: Maybe<
      { __typename?: 'MemberOf' } & {
        communities: Array<
          { __typename?: 'Community' } & Pick<Community, 'id' | 'name' | 'type'> & {
              members?: Maybe<Array<{ __typename?: 'User' } & UserDetailsFragment>>;
            }
        >;
      }
    >;
  };
};

export type OpportunitiesQueryVariables = Exact<{
  id: Scalars['String'];
}>;

export type OpportunitiesQuery = { __typename?: 'Query' } & {
  ecoverse: { __typename?: 'Ecoverse' } & Pick<Ecoverse, 'id'> & {
      challenge: { __typename?: 'Challenge' } & {
        opportunities?: Maybe<Array<{ __typename?: 'Opportunity' } & Pick<Opportunity, 'id' | 'name'>>>;
      };
    };
};

export type OpportunityActorGroupsQueryVariables = Exact<{
  id: Scalars['String'];
}>;

export type OpportunityActorGroupsQuery = { __typename?: 'Query' } & {
  ecoverse: { __typename?: 'Ecoverse' } & Pick<Ecoverse, 'id'> & {
      opportunity: { __typename?: 'Opportunity' } & {
        actorGroups?: Maybe<
          Array<
            { __typename?: 'ActorGroup' } & Pick<ActorGroup, 'id' | 'name' | 'description'> & {
                actors?: Maybe<
                  Array<{ __typename?: 'Actor' } & Pick<Actor, 'id' | 'name' | 'description' | 'value' | 'impact'>>
                >;
              }
          >
        >;
      };
    };
};

export type OpportunityAspectsQueryVariables = Exact<{
  id: Scalars['String'];
}>;

export type OpportunityAspectsQuery = { __typename?: 'Query' } & {
  ecoverse: { __typename?: 'Ecoverse' } & Pick<Ecoverse, 'id'> & {
      opportunity: { __typename?: 'Opportunity' } & {
        aspects?: Maybe<Array<{ __typename?: 'Aspect' } & Pick<Aspect, 'title' | 'framing' | 'explanation'>>>;
      };
    };
};

export type OpportunityCommunityQueryVariables = Exact<{
  id: Scalars['String'];
}>;

export type OpportunityCommunityQuery = { __typename?: 'Query' } & {
  ecoverse: { __typename?: 'Ecoverse' } & Pick<Ecoverse, 'id'> & {
      opportunity: { __typename?: 'Opportunity' } & Pick<Opportunity, 'id' | 'name'> & {
          community?: Maybe<{ __typename?: 'Community' } & CommunityDetailsFragment>;
        };
    };
};

export type OpportunityGroupsQueryVariables = Exact<{
  id: Scalars['String'];
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
  id: Scalars['String'];
}>;

export type OpportunityNameQuery = { __typename?: 'Query' } & {
  ecoverse: { __typename?: 'Ecoverse' } & Pick<Ecoverse, 'id'> & {
      opportunity: { __typename?: 'Opportunity' } & Pick<Opportunity, 'id' | 'name'>;
    };
};

export type OpportunityProfileQueryVariables = Exact<{
  id: Scalars['String'];
}>;

export type OpportunityProfileQuery = { __typename?: 'Query' } & {
  ecoverse: { __typename?: 'Ecoverse' } & Pick<Ecoverse, 'id'> & {
      opportunity: { __typename?: 'Opportunity' } & Pick<Opportunity, 'id' | 'textID' | 'name'> & {
          lifecycle?: Maybe<{ __typename?: 'Lifecycle' } & Pick<Lifecycle, 'state'>>;
          aspects?: Maybe<Array<{ __typename?: 'Aspect' } & Pick<Aspect, 'id' | 'title' | 'framing' | 'explanation'>>>;
          context?: Maybe<
            { __typename?: 'Context' } & Pick<
              Context,
              'id' | 'tagline' | 'background' | 'vision' | 'impact' | 'who'
            > & { references?: Maybe<Array<{ __typename?: 'Reference' } & Pick<Reference, 'id' | 'name' | 'uri'>>> }
          >;
          community?: Maybe<
            { __typename?: 'Community' } & {
              groups?: Maybe<
                Array<
                  { __typename?: 'UserGroup' } & Pick<UserGroup, 'name'> & {
                      members?: Maybe<Array<{ __typename?: 'User' } & Pick<User, 'name'>>>;
                    }
                >
              >;
            }
          >;
          relations?: Maybe<
            Array<
              { __typename?: 'Relation' } & Pick<
                Relation,
                'id' | 'actorRole' | 'actorName' | 'actorType' | 'description' | 'type'
              >
            >
          >;
          actorGroups?: Maybe<
            Array<
              { __typename?: 'ActorGroup' } & Pick<ActorGroup, 'id' | 'name' | 'description'> & {
                  actors?: Maybe<
                    Array<{ __typename?: 'Actor' } & Pick<Actor, 'id' | 'name' | 'description' | 'value' | 'impact'>>
                  >;
                }
            >
          >;
          projects?: Maybe<
            Array<
              { __typename?: 'Project' } & Pick<Project, 'id' | 'textID' | 'name' | 'description'> & {
                  lifecycle?: Maybe<{ __typename?: 'Lifecycle' } & Pick<Lifecycle, 'state'>>;
                }
            >
          >;
        };
    };
};

export type OpportunityProfileInfoQueryVariables = Exact<{
  id: Scalars['String'];
}>;

export type OpportunityProfileInfoQuery = { __typename?: 'Query' } & {
  ecoverse: { __typename?: 'Ecoverse' } & Pick<Ecoverse, 'id'> & {
      opportunity: { __typename?: 'Opportunity' } & Pick<Opportunity, 'id' | 'textID' | 'name'> & {
          context?: Maybe<{ __typename?: 'Context' } & ContextDetailsFragment>;
        };
    };
};

export type OpportunityRelationsQueryVariables = Exact<{
  id: Scalars['String'];
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
  id: Scalars['String'];
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
  id: Scalars['String'];
}>;

export type OrganizationCardQuery = { __typename?: 'Query' } & {
  organisation: { __typename?: 'Organisation' } & Pick<Organisation, 'id' | 'name'> & {
      groups?: Maybe<Array<{ __typename?: 'UserGroup' } & Pick<UserGroup, 'name'>>>;
      members?: Maybe<Array<{ __typename?: 'User' } & Pick<User, 'id'>>>;
      profile: { __typename?: 'Profile' } & Pick<Profile, 'id' | 'description' | 'avatar'>;
    };
};

export type OrganizationDetailsQueryVariables = Exact<{
  id: Scalars['String'];
}>;

export type OrganizationDetailsQuery = { __typename?: 'Query' } & {
  organisation: { __typename?: 'Organisation' } & Pick<Organisation, 'id' | 'name'> & {
      profile: { __typename?: 'Profile' } & Pick<Profile, 'id' | 'avatar' | 'description'> & {
          references?: Maybe<Array<{ __typename?: 'Reference' } & Pick<Reference, 'name' | 'uri'>>>;
          tagsets?: Maybe<Array<{ __typename?: 'Tagset' } & Pick<Tagset, 'id' | 'name' | 'tags'>>>;
        };
      groups?: Maybe<
        Array<
          { __typename?: 'UserGroup' } & Pick<UserGroup, 'id' | 'name'> & {
              members?: Maybe<Array<{ __typename?: 'User' } & Pick<User, 'id' | 'name'>>>;
            }
        >
      >;
    };
};

export type OrganizationGroupsQueryVariables = Exact<{
  id: Scalars['String'];
}>;

export type OrganizationGroupsQuery = { __typename?: 'Query' } & {
  organisation: { __typename?: 'Organisation' } & {
    groups?: Maybe<Array<{ __typename?: 'UserGroup' } & Pick<UserGroup, 'id' | 'name'>>>;
  };
};

export type OrganizationNameQueryVariables = Exact<{
  id: Scalars['String'];
}>;

export type OrganizationNameQuery = { __typename?: 'Query' } & {
  organisation: { __typename?: 'Organisation' } & Pick<Organisation, 'name'>;
};

export type OrganizationProfileInfoQueryVariables = Exact<{
  id: Scalars['String'];
}>;

export type OrganizationProfileInfoQuery = { __typename?: 'Query' } & {
  organisation: { __typename?: 'Organisation' } & Pick<Organisation, 'id' | 'textID' | 'name'> & {
      profile: { __typename?: 'Profile' } & Pick<Profile, 'id' | 'avatar' | 'description'> & {
          references?: Maybe<Array<{ __typename?: 'Reference' } & Pick<Reference, 'id' | 'name' | 'uri'>>>;
          tagsets?: Maybe<Array<{ __typename?: 'Tagset' } & Pick<Tagset, 'id' | 'name' | 'tags'>>>;
        };
    };
};

export type OrganizationsListQueryVariables = Exact<{ [key: string]: never }>;

export type OrganizationsListQuery = { __typename?: 'Query' } & {
  organisations: Array<{ __typename?: 'Organisation' } & Pick<Organisation, 'id' | 'name'>>;
};

export type ProjectProfileQueryVariables = Exact<{
  id: Scalars['String'];
}>;

export type ProjectProfileQuery = { __typename?: 'Query' } & {
  ecoverse: { __typename?: 'Ecoverse' } & Pick<Ecoverse, 'id'> & {
      project: { __typename?: 'Project' } & ProjectDetailsFragment;
    };
};

export type ProjectsQueryVariables = Exact<{ [key: string]: never }>;

export type ProjectsQuery = { __typename?: 'Query' } & {
  ecoverse: { __typename?: 'Ecoverse' } & Pick<Ecoverse, 'id'> & {
      projects: Array<
        { __typename?: 'Project' } & Pick<Project, 'id' | 'textID' | 'name' | 'description'> & {
            lifecycle?: Maybe<{ __typename?: 'Lifecycle' } & Pick<Lifecycle, 'state'>>;
          }
      >;
    };
};

export type ProjectsChainHistoryQueryVariables = Exact<{ [key: string]: never }>;

export type ProjectsChainHistoryQuery = { __typename?: 'Query' } & {
  ecoverse: { __typename?: 'Ecoverse' } & Pick<Ecoverse, 'id'> & {
      challenges?: Maybe<
        Array<
          { __typename?: 'Challenge' } & Pick<Challenge, 'name' | 'textID'> & {
              opportunities?: Maybe<
                Array<
                  { __typename?: 'Opportunity' } & Pick<Opportunity, 'textID'> & {
                      projects?: Maybe<Array<{ __typename?: 'Project' } & Pick<Project, 'textID'>>>;
                    }
                >
              >;
            }
        >
      >;
    };
};

export type RelationsQueryVariables = Exact<{
  id: Scalars['String'];
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

export type RoomQueryVariables = Exact<{
  id: Scalars['String'];
}>;

export type RoomQuery = { __typename?: 'Query' } & {
  me: { __typename?: 'User' } & Pick<User, 'id'> & {
      room?: Maybe<
        { __typename?: 'CommunicationRoomDetailsResult' } & Pick<
          CommunicationRoomDetailsResult,
          'id' | 'isDirect' | 'receiverID'
        > & {
            messages: Array<
              { __typename?: 'CommunicationMessageResult' } & Pick<
                CommunicationMessageResult,
                'message' | 'sender' | 'timestamp'
              >
            >;
          }
      >;
    };
};

export type RoomsQueryVariables = Exact<{ [key: string]: never }>;

export type RoomsQuery = { __typename?: 'Query' } & {
  me: { __typename?: 'User' } & Pick<User, 'id'> & {
      rooms?: Maybe<
        Array<
          { __typename?: 'CommunicationRoomResult' } & Pick<CommunicationRoomResult, 'id' | 'isDirect' | 'receiverID'>
        >
      >;
    };
};

export type SearchQueryVariables = Exact<{
  searchData: SearchInput;
}>;

export type SearchQuery = { __typename?: 'Query' } & {
  search: Array<
    { __typename?: 'SearchResultEntry' } & Pick<SearchResultEntry, 'score' | 'terms'> & {
        result?: Maybe<
          | ({ __typename?: 'Organisation' } & Pick<Organisation, 'name' | 'id'>)
          | ({ __typename?: 'User' } & Pick<User, 'name' | 'id'>)
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
  id: Scalars['String'];
}>;

export type UserQuery = { __typename?: 'Query' } & {
  user: { __typename?: 'User' } & UserDetailsFragment & UserMembersFragment;
};

export type UserAvatarsQueryVariables = Exact<{
  ids: Array<Scalars['String']> | Scalars['String'];
}>;

export type UserAvatarsQuery = { __typename?: 'Query' } & {
  usersById: Array<
    { __typename?: 'User' } & Pick<User, 'id' | 'name'> & {
        profile?: Maybe<{ __typename?: 'Profile' } & Pick<Profile, 'id' | 'avatar'>>;
      }
  >;
};

export type UserCardDataQueryVariables = Exact<{
  ids: Array<Scalars['String']> | Scalars['String'];
}>;

export type UserCardDataQuery = { __typename?: 'Query' } & {
  usersById: Array<
    { __typename: 'User' } & {
      memberof?: Maybe<
        { __typename?: 'MemberOf' } & {
          communities: Array<{ __typename?: 'Community' } & Pick<Community, 'name'>>;
          organisations: Array<{ __typename?: 'Organisation' } & Pick<Organisation, 'name'>>;
        }
      >;
    } & UserDetailsFragment
  >;
};

export type UsersQueryVariables = Exact<{ [key: string]: never }>;

export type UsersQuery = { __typename?: 'Query' } & { users: Array<{ __typename?: 'User' } & UserDetailsFragment> };

export type OnMessageReceivedSubscriptionVariables = Exact<{ [key: string]: never }>;

export type OnMessageReceivedSubscription = { __typename?: 'Subscription' } & {
  messageReceived: { __typename?: 'Message' } & Pick<Message, 'id' | 'message' | 'reciever' | 'sender' | 'timestamp'>;
};