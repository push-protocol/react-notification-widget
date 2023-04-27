export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
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
  DateTime: any;
  JSON: any;
};

export type AnalyticsRangeInput = {
  days: Scalars['Float'];
};

export type Audience = {
  __typename?: 'Audience';
  createdAt: Scalars['DateTime'];
  id: Scalars['String'];
  type: AudienceType;
  updatedAt: Scalars['DateTime'];
  values: Scalars['JSON'];
  workflowId: Scalars['String'];
};

export enum AudienceType {
  AllEpnsSubscribers = 'ALL_EPNS_SUBSCRIBERS',
  ContractCallData = 'CONTRACT_CALL_DATA',
  IncomingWebhookData = 'INCOMING_WEBHOOK_DATA',
  Manual = 'MANUAL',
  NewSubscriber = 'NEW_SUBSCRIBER'
}

export type BatchActionResponse = {
  __typename?: 'BatchActionResponse';
  count: Scalars['Float'];
};

export type ChannelForUser = {
  __typename?: 'ChannelForUser';
  channelAddress: Scalars['String'];
  icon: Scalars['String'];
  name: Scalars['String'];
  processed: Scalars['Boolean'];
  type: ChannelForUserType;
};

export enum ChannelForUserType {
  Delegate = 'DELEGATE',
  Messenger = 'MESSENGER',
  Owner = 'OWNER'
}

export enum ChannelUserRole {
  Messenger = 'MESSENGER',
  Owner = 'OWNER',
  Subscriber = 'SUBSCRIBER'
}

export type ChannelsForUserInput = {
  chainId: Scalars['Float'];
  userAddress: Scalars['String'];
};

export type CommsChannel = {
  __typename?: 'CommsChannel';
  analytics: CommsChannelAnalytics;
  chainId: Scalars['Int'];
  channelAddress: Scalars['String'];
  createdAt: Scalars['DateTime'];
  delegateWalletAddress?: Maybe<Scalars['String']>;
  discordBotAdded: Scalars['Boolean'];
  discordChannelId?: Maybe<Scalars['String']>;
  discordGuildId?: Maybe<Scalars['String']>;
  discordGuildUrl?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  isDelegate: Scalars['Boolean'];
  logo?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  partnerApiKey: Scalars['String'];
  slug?: Maybe<Scalars['String']>;
  subscribers: Array<CommsChannelSubscriber>;
  type: CommsChannelType;
  updatedAt: Scalars['DateTime'];
};

export type CommsChannelAnalytics = {
  __typename?: 'CommsChannelAnalytics';
  subscribers: Array<CommsChannelStats>;
};


export type CommsChannelAnalyticsSubscribersArgs = {
  range: AnalyticsRangeInput;
};

export type CommsChannelDiscovered = {
  __typename?: 'CommsChannelDiscovered';
  address: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  icon?: Maybe<Scalars['String']>;
  id: Scalars['Float'];
  name: Scalars['String'];
  subscriberCount?: Maybe<Scalars['Float']>;
  url?: Maybe<Scalars['String']>;
};

export type CommsChannelStats = {
  __typename?: 'CommsChannelStats';
  chainId: Scalars['Int'];
  commsChannelAddress: Scalars['String'];
  date: Scalars['DateTime'];
  id: Scalars['String'];
  subscriberCount: Scalars['Int'];
  type: CommsChannelType;
};

export type CommsChannelSubscriber = {
  __typename?: 'CommsChannelSubscriber';
  emailConnected: Scalars['Boolean'];
  telegramConnected: Scalars['Boolean'];
  tokens: Array<CommsChannelSubscriberToken>;
  walletAddress: Scalars['String'];
};

export type CommsChannelSubscriberToken = {
  __typename?: 'CommsChannelSubscriberToken';
  address: Scalars['String'];
  amount: Scalars['Float'];
  decimals: Scalars['Float'];
  symbol: Scalars['String'];
};

export type CommsChannelTag = {
  __typename?: 'CommsChannelTag';
  commsChannelId: Scalars['String'];
  createdAt: Scalars['DateTime'];
  createdByAddress: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  name: Scalars['String'];
  optIns: CommsChannelTagOptInsPayload;
  order: Scalars['Int'];
  subtype: CommsChannelTagSubtype;
  type: CommsChannelTagType;
  updatedAt: Scalars['DateTime'];
};

export type CommsChannelTagCreateInput = {
  description?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  order: Scalars['Float'];
  subtype: CommsChannelTagSubtype;
  type: CommsChannelTagType;
};

export type CommsChannelTagDeleteInput = {
  id: Scalars['String'];
};

export type CommsChannelTagOptInsPayload = {
  __typename?: 'CommsChannelTagOptInsPayload';
  count: Scalars['Float'];
};

export type CommsChannelTagReorderInput = {
  ids: Array<Scalars['String']>;
};

export enum CommsChannelTagSubtype {
  Channel = 'CHANNEL',
  TokenReceived = 'TOKEN_RECEIVED'
}

export enum CommsChannelTagType {
  MessageCategory = 'MESSAGE_CATEGORY'
}

export type CommsChannelTagUpdateInput = {
  description?: InputMaybe<Scalars['String']>;
  id: Scalars['String'];
  name: Scalars['String'];
};

export enum CommsChannelType {
  Epns = 'EPNS'
}

export type CommsChannelUserCreateInput = {
  role?: InputMaybe<ChannelUserRole>;
  userAddress: Scalars['String'];
};

export type CommsChannelUsersInput = {
  roles: Array<ChannelUserRole>;
};

export type CommsChannelsOnUsers = {
  __typename?: 'CommsChannelsOnUsers';
  commsChannelId: Scalars['String'];
  createdAt: Scalars['DateTime'];
  id: Scalars['String'];
  role: ChannelUserRole;
  userAddress: Scalars['String'];
};

export type ContractTrigger = {
  __typename?: 'ContractTrigger';
  contractAddress: Scalars['String'];
  eventName: Scalars['String'];
  id: Scalars['String'];
  triggerId: Scalars['String'];
};

export type ContractTriggerInput = {
  contractAddress: Scalars['String'];
  eventName: Scalars['String'];
};

export type EmailUnsubscribeInput = {
  email: Scalars['String'];
  token: Scalars['String'];
};

export type GeneralResolverResponse = {
  __typename?: 'GeneralResolverResponse';
  message?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
};

export type IncomingWebhook = {
  __typename?: 'IncomingWebhook';
  commsChannelId: Scalars['String'];
  createdAt: Scalars['DateTime'];
  createdByAddress: Scalars['String'];
  id: Scalars['String'];
  isActive: Scalars['Boolean'];
  logs: Array<IncomingWebhookLog>;
  name: Scalars['String'];
  parameters: Array<IncomingWebhookParameter>;
  secret: Scalars['String'];
};

export type IncomingWebhookCreateInput = {
  isActive: Scalars['Boolean'];
  name: Scalars['String'];
  parameters: Array<IncomingWebhookCreateInputParameter>;
};

export type IncomingWebhookCreateInputParameter = {
  name: Scalars['String'];
};

export type IncomingWebhookDeleteInput = {
  incomingWebhookId: Scalars['String'];
};

export type IncomingWebhookFindInput = {
  ids?: InputMaybe<Array<Scalars['String']>>;
};

export type IncomingWebhookLog = {
  __typename?: 'IncomingWebhookLog';
  createdAt: Scalars['DateTime'];
  error?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  incomingWebhookId: Scalars['String'];
  receivedData: Scalars['JSON'];
  triggeredWorkflowsCount: Scalars['Int'];
};

export type IncomingWebhookParameter = {
  __typename?: 'IncomingWebhookParameter';
  id: Scalars['String'];
  incomingWebhookId: Scalars['String'];
  name: Scalars['String'];
  type: IncomingWebhookParameterType;
};

export enum IncomingWebhookParameterType {
  String = 'STRING'
}

export type IncomingWebhookUpdateInput = {
  id: Scalars['String'];
  isActive: Scalars['Boolean'];
  name: Scalars['String'];
  parameters: Array<IncomingWebhookCreateInputParameter>;
};

export type MessageSendInput = {
  addresses: Array<Scalars['String']>;
  apps: Array<MessagingApp>;
  body: Scalars['String'];
  clickUrl?: InputMaybe<Scalars['String']>;
  imgUrl?: InputMaybe<Scalars['String']>;
  messageCategoryIds: Array<Scalars['String']>;
  subject: Scalars['String'];
};

export type MessageStep = {
  __typename?: 'MessageStep';
  apps: Array<MessageStepApp>;
  body: Scalars['String'];
  clickUrl?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  imgUrl?: Maybe<Scalars['String']>;
  subject: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  workflowId: Scalars['String'];
};

export type MessageStepApp = {
  __typename?: 'MessageStepApp';
  app: MessagingApp;
  id: Scalars['String'];
  messageStepId: Scalars['String'];
};

export enum MessagingApp {
  Discord = 'DISCORD',
  Email = 'EMAIL',
  Epns = 'EPNS',
  Telegram = 'TELEGRAM'
}

export type Mutation = {
  __typename?: 'Mutation';
  commsChannelTagCreate: CommsChannelTag;
  commsChannelTagDelete: GeneralResolverResponse;
  commsChannelTagReorder: Array<CommsChannelTag>;
  commsChannelTagUpdate: CommsChannelTag;
  commsChannelUserCreate: CommsChannelsOnUsers;
  commsChannelUserDelete: GeneralResolverResponse;
  emailUnsubscribe: GeneralResolverResponse;
  incomingWebhookCreate: IncomingWebhook;
  incomingWebhookDelete: GeneralResolverResponse;
  incomingWebhookUpdate: IncomingWebhook;
  messageSend: Scalars['Boolean'];
  nonceGenerate: Nonce;
  projecTokenSave: GeneralResolverResponse;
  refreshToken: RefreshTokenPayload;
  telegramVerificationLinkGenerate: UserTelegramVerificationLinkPayload;
  userCommunicationsChannelDelete: GeneralResolverResponse;
  userDiscordVerify: GeneralResolverResponse;
  userEmailUpdate: GeneralResolverResponse;
  userEmailValidate: GeneralResolverResponse;
  userLogin: UserLoginPayload;
  userPreferencesUpdate?: Maybe<UserPreference>;
  userSubscribeToChannel: User;
  userUnsubscribeFromChannel: User;
  userUpdateLastReadAt: User;
  workflowCreate: Workflow;
  workflowDelete: BatchActionResponse;
  workflowUpdate: Workflow;
};


export type MutationCommsChannelTagCreateArgs = {
  input: CommsChannelTagCreateInput;
};


export type MutationCommsChannelTagDeleteArgs = {
  input: CommsChannelTagDeleteInput;
};


export type MutationCommsChannelTagReorderArgs = {
  input: CommsChannelTagReorderInput;
};


export type MutationCommsChannelTagUpdateArgs = {
  input: CommsChannelTagUpdateInput;
};


export type MutationCommsChannelUserCreateArgs = {
  input: CommsChannelUserCreateInput;
};


export type MutationCommsChannelUserDeleteArgs = {
  input: CommsChannelUserCreateInput;
};


export type MutationEmailUnsubscribeArgs = {
  input: EmailUnsubscribeInput;
};


export type MutationIncomingWebhookCreateArgs = {
  input: IncomingWebhookCreateInput;
};


export type MutationIncomingWebhookDeleteArgs = {
  input: IncomingWebhookDeleteInput;
};


export type MutationIncomingWebhookUpdateArgs = {
  input: IncomingWebhookUpdateInput;
};


export type MutationMessageSendArgs = {
  input: MessageSendInput;
};


export type MutationNonceGenerateArgs = {
  input: NonceGenerateInput;
};


export type MutationProjecTokenSaveArgs = {
  input: ProjectTokenSaveInput;
};


export type MutationRefreshTokenArgs = {
  input: RefreshTokenInput;
};


export type MutationUserCommunicationsChannelDeleteArgs = {
  input: UserCommunicationChannelDeleteInput;
};


export type MutationUserDiscordVerifyArgs = {
  input: UserDiscordVerifyInput;
};


export type MutationUserEmailUpdateArgs = {
  input: UserEmailUpdateInput;
};


export type MutationUserEmailValidateArgs = {
  input: UserEmailValidateInput;
};


export type MutationUserLoginArgs = {
  input: UserLoginInput;
};


export type MutationUserPreferencesUpdateArgs = {
  input: UserPreferenceUpdateInput;
};


export type MutationUserSubscribeToChannelArgs = {
  input?: InputMaybe<UserSubscribeToChannelInput>;
};


export type MutationUserUnsubscribeFromChannelArgs = {
  input?: InputMaybe<UserUnsubscribeFromChannelInput>;
};


export type MutationWorkflowCreateArgs = {
  input: WorkflowCreateInput;
};


export type MutationWorkflowDeleteArgs = {
  input: WorkflowDeleteInput;
};


export type MutationWorkflowUpdateArgs = {
  input: WorkflowUpdateInput;
};

export type Nonce = {
  __typename?: 'Nonce';
  createdAt: Scalars['DateTime'];
  id: Scalars['String'];
  nonce: Scalars['String'];
  walletAddress: Scalars['String'];
};

export type NonceGenerateInput = {
  userAddress: Scalars['String'];
};

export type PartnerInfo = {
  __typename?: 'PartnerInfo';
  chainId: Scalars['Float'];
  channelAddress: Scalars['String'];
  discordGuildUrl?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  logo?: Maybe<Scalars['String']>;
  messageCategories: Array<CommsChannelTag>;
  name: Scalars['String'];
  partnerApiKey: Scalars['String'];
  slug?: Maybe<Scalars['String']>;
};

export type PartnerInfoInput = {
  partnerApiKey?: InputMaybe<Scalars['String']>;
  slug?: InputMaybe<Scalars['String']>;
};

export type ProjectToken = {
  __typename?: 'ProjectToken';
  commsChannelId: Scalars['String'];
  id: Scalars['String'];
  tokenId: Scalars['String'];
  tokenName: Scalars['String'];
};

export type ProjectTokenSaveInput = {
  tokenId: Scalars['String'];
  tokenName: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  channelsForUser: Array<ChannelForUser>;
  commsChannel: CommsChannel;
  commsChannelDiscover: Array<CommsChannelDiscovered>;
  commsChannelTags: Array<CommsChannelTag>;
  commsChannelUsers: Array<CommsChannelsOnUsers>;
  incomingWebhooks: Array<IncomingWebhook>;
  me: User;
  partnerInfo: PartnerInfo;
  projectToken?: Maybe<ProjectToken>;
  user: User;
  userCommunicationChannels: UserCommunicationChannelsPayload;
  userSubscriptions: Array<UserSubscription>;
  workflows: Array<Workflow>;
};


export type QueryChannelsForUserArgs = {
  input: ChannelsForUserInput;
};


export type QueryCommsChannelUsersArgs = {
  input: CommsChannelUsersInput;
};


export type QueryIncomingWebhooksArgs = {
  input?: InputMaybe<IncomingWebhookFindInput>;
};


export type QueryPartnerInfoArgs = {
  input: PartnerInfoInput;
};


export type QueryUserCommunicationChannelsArgs = {
  address: Scalars['String'];
};

export type RefreshTokenInput = {
  refreshToken: Scalars['String'];
};

export type RefreshTokenPayload = {
  __typename?: 'RefreshTokenPayload';
  refreshToken: Scalars['String'];
  token: Scalars['String'];
};

export type SnapshotTrigger = {
  __typename?: 'SnapshotTrigger';
  event: SnapshotTriggerEvent;
  id: Scalars['String'];
  space: Scalars['String'];
  triggerId: Scalars['String'];
};

export enum SnapshotTriggerEvent {
  ProposalCreated = 'PROPOSAL_CREATED',
  ProposalDeleted = 'PROPOSAL_DELETED',
  ProposalEnded = 'PROPOSAL_ENDED',
  ProposalEndsIn_1 = 'PROPOSAL_ENDS_IN_1',
  ProposalEndsIn_12 = 'PROPOSAL_ENDS_IN_12',
  ProposalEndsIn_24 = 'PROPOSAL_ENDS_IN_24',
  ProposalStarted = 'PROPOSAL_STARTED'
}

export type Trigger = {
  __typename?: 'Trigger';
  contract?: Maybe<ContractTrigger>;
  id: Scalars['String'];
  incomingWebhook?: Maybe<IncomingWebhook>;
  incomingWebhookId?: Maybe<Scalars['String']>;
  snapshot?: Maybe<SnapshotTrigger>;
  type: TriggerType;
  updatedAt: Scalars['DateTime'];
  workflowId: Scalars['String'];
};

export enum TriggerType {
  ContractCall = 'CONTRACT_CALL',
  IncomingWebhook = 'INCOMING_WEBHOOK',
  NewSubscriber = 'NEW_SUBSCRIBER',
  SnapshotEvent = 'SNAPSHOT_EVENT'
}

export type User = {
  __typename?: 'User';
  createdAt: Scalars['DateTime'];
  discordId?: Maybe<Scalars['String']>;
  discordUsername?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  lastReadAt: Scalars['DateTime'];
  preferences: Array<UserPreference>;
  subscriptions: Array<UserSubscription>;
  telegramId?: Maybe<Scalars['String']>;
  telegramUsername?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
  walletAddress: Scalars['String'];
};

export type UserCommunicationChannel = {
  __typename?: 'UserCommunicationChannel';
  exists: Scalars['Boolean'];
  hint?: Maybe<Scalars['String']>;
};

export type UserCommunicationChannelDeleteInput = {
  app: MessagingApp;
};

export type UserCommunicationChannelsPayload = {
  __typename?: 'UserCommunicationChannelsPayload';
  discord: UserCommunicationChannel;
  email: UserCommunicationChannel;
  epns: UserCommunicationChannel;
  telegram: UserCommunicationChannel;
};

export type UserDiscordVerifyInput = {
  token: Scalars['String'];
};

export type UserEmailUpdateInput = {
  email: Scalars['String'];
};

export type UserEmailValidateInput = {
  code: Scalars['String'];
  email: Scalars['String'];
};

export type UserLoginInput = {
  chainId: Scalars['Float'];
  channel: Scalars['String'];
  message: Scalars['String'];
  signature: Scalars['String'];
};

export type UserLoginPayload = {
  __typename?: 'UserLoginPayload';
  refreshToken: Scalars['String'];
  refreshTokenExpiresAt: Scalars['DateTime'];
  token: Scalars['String'];
  tokenExpiresAt: Scalars['DateTime'];
  user: User;
};

export type UserPreference = {
  __typename?: 'UserPreference';
  commsChannelTagId: Scalars['String'];
  discord: Scalars['Boolean'];
  email: Scalars['Boolean'];
  enabled: Scalars['Boolean'];
  id: Scalars['String'];
  telegram: Scalars['Boolean'];
  userAddress: Scalars['String'];
};

export type UserPreferenceUpdateInput = {
  commsChannelTagId: Scalars['String'];
  discord: Scalars['Boolean'];
  email: Scalars['Boolean'];
  enabled: Scalars['Boolean'];
  telegram: Scalars['Boolean'];
};

export enum UserSubscribeSource {
  Discord = 'Discord',
  PassportDiscovery = 'PASSPORT_DISCOVERY'
}

export type UserSubscribeToChannelInput = {
  channel?: InputMaybe<UserSubscribeToDiscoveredChannelInput>;
  source?: InputMaybe<UserSubscribeSource>;
};

export type UserSubscribeToDiscoveredChannelInput = {
  chainId: Scalars['Float'];
  channelAddress: Scalars['String'];
};

export type UserSubscription = {
  __typename?: 'UserSubscription';
  address: Scalars['String'];
  chainId: Scalars['Float'];
  commsChannelTags?: Maybe<Array<CommsChannelTag>>;
  icon?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  name: Scalars['String'];
  source: UserSubscriptionSource;
};

export enum UserSubscriptionSource {
  Push = 'Push',
  Wherever = 'Wherever'
}

export type UserTelegramVerificationLinkPayload = {
  __typename?: 'UserTelegramVerificationLinkPayload';
  link: Scalars['String'];
};

export type UserUnsubscribeFromChannelInput = {
  chainId?: InputMaybe<Scalars['Float']>;
  channelAddress?: InputMaybe<Scalars['String']>;
};

export type Workflow = {
  __typename?: 'Workflow';
  audience?: Maybe<Audience>;
  channelAddress: Scalars['String'];
  commsChannelId: Scalars['String'];
  createdAt: Scalars['DateTime'];
  createdByAddress: Scalars['String'];
  id: Scalars['String'];
  isActive: Scalars['Boolean'];
  logs: Array<WorkflowRunLog>;
  message?: Maybe<MessageStep>;
  messageCategoryIds: Scalars['JSON'];
  name: Scalars['String'];
  org?: Maybe<Scalars['String']>;
  trigger?: Maybe<Trigger>;
  updatedAt: Scalars['DateTime'];
};

export type WorkflowCreateAudienceInput = {
  addresses?: InputMaybe<Array<Scalars['String']>>;
  allSubscribers?: InputMaybe<Scalars['Boolean']>;
  contractEventFields?: InputMaybe<Array<Scalars['String']>>;
  incomingWebhookDataField?: InputMaybe<Scalars['String']>;
  newSubscriber?: InputMaybe<Scalars['Boolean']>;
};

export type WorkflowCreateInput = {
  audience: WorkflowCreateAudienceInput;
  message: WorkflowCreateMessageInput;
  messageCategoryIds: Array<Scalars['String']>;
  name: Scalars['String'];
  trigger: WorkflowCreateTriggerInput;
};

export type WorkflowCreateMessageInput = {
  apps: Array<Scalars['String']>;
  body: Scalars['String'];
  clickUrl?: InputMaybe<Scalars['String']>;
  imgUrl?: InputMaybe<Scalars['String']>;
  subject: Scalars['String'];
};

export type WorkflowCreateTriggerInput = {
  contract?: InputMaybe<ContractTriggerInput>;
  incomingWebhookId?: InputMaybe<Scalars['String']>;
  snapshot?: InputMaybe<WorkflowCreateTriggerSnapshotInput>;
  type: TriggerType;
};

export type WorkflowCreateTriggerSnapshotInput = {
  event: SnapshotTriggerEvent;
  space: Scalars['String'];
};

export type WorkflowDeleteInput = {
  ids: Array<Scalars['String']>;
};

export type WorkflowRunLog = {
  __typename?: 'WorkflowRunLog';
  createdAt: Scalars['DateTime'];
  id: Scalars['String'];
  recipients: Scalars['JSON'];
  success: Scalars['Boolean'];
  workflowId: Scalars['String'];
};

export type WorkflowUpdateInput = {
  audience: WorkflowCreateAudienceInput;
  id: Scalars['String'];
  message: WorkflowCreateMessageInput;
  messageCategoryIds: Array<Scalars['String']>;
  name: Scalars['String'];
  trigger: WorkflowCreateTriggerInput;
};
