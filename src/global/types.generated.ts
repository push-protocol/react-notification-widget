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
  workflowId: Scalars['String'];
};

export enum AudienceType {
  AllEpnsSubscribers = 'ALL_EPNS_SUBSCRIBERS',
  ContractEvent = 'CONTRACT_EVENT',
  Manual = 'MANUAL'
}

export type BatchActionResponse = {
  __typename?: 'BatchActionResponse';
  count: Scalars['Float'];
};

export type CommsChannel = {
  __typename?: 'CommsChannel';
  analytics: CommsChannelAnalytics;
  channelAddress: Scalars['String'];
  createdAt: Scalars['DateTime'];
  id: Scalars['String'];
  isDelegate: Scalars['Boolean'];
  logo?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  partnerApiKey: Scalars['String'];
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

export type CommsChannelStats = {
  __typename?: 'CommsChannelStats';
  commsChannelAddress: Scalars['String'];
  date: Scalars['DateTime'];
  id: Scalars['String'];
  subscriberCount: Scalars['Int'];
  type: CommsChannelType;
};

export type CommsChannelSubscriber = {
  __typename?: 'CommsChannelSubscriber';
  emailConnected: Scalars['Boolean'];
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

export enum CommsChannelType {
  Epns = 'EPNS'
}

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

export type IncomingWebhookLog = {
  __typename?: 'IncomingWebhookLog';
  createdAt: Scalars['DateTime'];
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
  Email = 'EMAIL',
  Epns = 'EPNS'
}

export type Mutation = {
  __typename?: 'Mutation';
  emailUnsubscribe: GeneralResolverResponse;
  incomingWebhookCreate: IncomingWebhook;
  incomingWebhookUpdate: IncomingWebhook;
  messageSend: Scalars['Boolean'];
  nonceGenerate: Nonce;
  projecTokenSave: GeneralResolverResponse;
  refreshToken: RefreshTokenPayload;
  userEmailDelete: GeneralResolverResponse;
  userEmailUpdate: GeneralResolverResponse;
  userEmailValidate: GeneralResolverResponse;
  userLogin: UserLoginPayload;
  userNotificationRead: GeneralResolverResponse;
  workflowCreate: Workflow;
  workflowDelete: BatchActionResponse;
};


export type MutationEmailUnsubscribeArgs = {
  input: EmailUnsubscribeInput;
};


export type MutationIncomingWebhookCreateArgs = {
  input: IncomingWebhookCreateInput;
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


export type MutationUserEmailUpdateArgs = {
  input: UserEmailUpdateInput;
};


export type MutationUserEmailValidateArgs = {
  input: UserEmailValidateInput;
};


export type MutationUserLoginArgs = {
  input: UserLoginInput;
};


export type MutationWorkflowCreateArgs = {
  input: WorkflowCreateInput;
};


export type MutationWorkflowDeleteArgs = {
  input: WorkflowDeleteInput;
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

export type PartnerInfoInput = {
  partnerApiKey: Scalars['String'];
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
  commsChannel: CommsChannel;
  incomingWebhooks: Array<IncomingWebhook>;
  me: User;
  partnerInfo: CommsChannel;
  projectToken?: Maybe<ProjectToken>;
  userCommunicationChannels: UserCommunicationChannelsPayload;
  workflows: Array<Workflow>;
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

export type Trigger = {
  __typename?: 'Trigger';
  id: Scalars['String'];
  incomingWebhookId?: Maybe<Scalars['String']>;
  type: TriggerType;
  updatedAt: Scalars['DateTime'];
  workflowId: Scalars['String'];
};

export enum TriggerType {
  ContractEvent = 'CONTRACT_EVENT',
  Webhook = 'WEBHOOK'
}

export type User = {
  __typename?: 'User';
  createdAt: Scalars['DateTime'];
  email?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  lastName?: Maybe<Scalars['String']>;
  lastReadAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  walletAddress: Scalars['String'];
};

export type UserCommunicationChannel = {
  __typename?: 'UserCommunicationChannel';
  exists: Scalars['Boolean'];
  hint?: Maybe<Scalars['String']>;
};

export type UserCommunicationChannelsPayload = {
  __typename?: 'UserCommunicationChannelsPayload';
  email: UserCommunicationChannel;
  epns: UserCommunicationChannel;
};

export type UserEmailUpdateInput = {
  email: Scalars['String'];
};

export type UserEmailValidateInput = {
  code: Scalars['String'];
  email: Scalars['String'];
};

export type UserLoginInput = {
  channel: Scalars['String'];
  message: Scalars['String'];
  signature: Scalars['String'];
};

export type UserLoginPayload = {
  __typename?: 'UserLoginPayload';
  refreshToken: Scalars['String'];
  token: Scalars['String'];
  user: User;
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
  message?: Maybe<MessageStep>;
  name: Scalars['String'];
  org?: Maybe<Scalars['String']>;
  trigger?: Maybe<Trigger>;
  updatedAt: Scalars['DateTime'];
};

export type WorkflowCreateAudienceInput = {
  addresses?: InputMaybe<Array<Scalars['String']>>;
  allSubscribers?: InputMaybe<Scalars['Boolean']>;
  contractEventFields?: InputMaybe<Array<Scalars['String']>>;
  segmentId?: InputMaybe<Scalars['String']>;
};

export type WorkflowCreateInput = {
  audience: WorkflowCreateAudienceInput;
  message: WorkflowCreateMessageInput;
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
  type: Scalars['String'];
};

export type WorkflowDeleteInput = {
  ids: Array<Scalars['String']>;
};
