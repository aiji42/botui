/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateSessionInput = {
  identity: string,
  title: string,
  images: string,
  theme: string,
  proposals: string,
  active: boolean,
};

export type UpdateSessionInput = {
  id: string,
  identity?: string | null,
  accountId?: string | null,
  title?: string | null,
  images?: string | null,
  theme?: string | null,
  proposals?: string | null,
  active?: boolean | null,
};

export type DeleteSessionInput = {
  id: string,
};

export type TableSessionFilterInput = {
  id?: TableIDFilterInput | null,
  identity?: TableStringFilterInput | null,
  accountId?: TableStringFilterInput | null,
  title?: TableStringFilterInput | null,
};

export type TableIDFilterInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
};

export type TableStringFilterInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
};

export type CreateSessionMutationVariables = {
  input: CreateSessionInput,
};

export type CreateSessionMutation = {
  createSession:  {
    __typename: "Session",
    id: string,
    identity: string,
    accountId: string,
    title: string,
    images: string,
    theme: string,
    proposals: string,
    active: boolean,
  } | null,
};

export type UpdateSessionMutationVariables = {
  input: UpdateSessionInput,
};

export type UpdateSessionMutation = {
  updateSession:  {
    __typename: "Session",
    id: string,
    identity: string,
    accountId: string,
    title: string,
    images: string,
    theme: string,
    proposals: string,
    active: boolean,
  } | null,
};

export type DeleteSessionMutationVariables = {
  input: DeleteSessionInput,
};

export type DeleteSessionMutation = {
  deleteSession:  {
    __typename: "Session",
    id: string,
    identity: string,
    accountId: string,
    title: string,
    images: string,
    theme: string,
    proposals: string,
    active: boolean,
  } | null,
};

export type GetSessionQueryVariables = {
  id: string,
};

export type GetSessionQuery = {
  getSession:  {
    __typename: "Session",
    id: string,
    identity: string,
    accountId: string,
    title: string,
    images: string,
    theme: string,
    proposals: string,
    active: boolean,
  } | null,
};

export type ListSessionsQueryVariables = {
  filter?: TableSessionFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListSessionsQuery = {
  listSessions:  {
    __typename: "SessionConnection",
    items:  Array< {
      __typename: "Session",
      id: string,
      identity: string,
      accountId: string,
      title: string,
      images: string,
      theme: string,
      proposals: string,
      active: boolean,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type OnCreateSessionSubscriptionVariables = {
  id?: string | null,
  identity?: string | null,
  accountId?: string | null,
  title?: string | null,
  images?: string | null,
  theme?: string | null,
  proposals?: string | null,
  active?: boolean | null,
};

export type OnCreateSessionSubscription = {
  onCreateSession:  {
    __typename: "Session",
    id: string,
    identity: string,
    accountId: string,
    title: string,
    images: string,
    theme: string,
    proposals: string,
    active: boolean,
  } | null,
};

export type OnUpdateSessionSubscriptionVariables = {
  id?: string | null,
  identity?: string | null,
  accountId?: string | null,
  title?: string | null,
  images?: string | null,
  theme?: string | null,
  proposals?: string | null,
  active?: boolean | null,
};

export type OnUpdateSessionSubscription = {
  onUpdateSession:  {
    __typename: "Session",
    id: string,
    identity: string,
    accountId: string,
    title: string,
    images: string,
    theme: string,
    proposals: string,
    active: boolean,
  } | null,
};

export type OnDeleteSessionSubscriptionVariables = {
  id?: string | null,
  identity?: string | null,
  accountId?: string | null,
  title?: string | null,
  images?: string | null,
  theme?: string | null,
  proposals?: string | null,
  active?: boolean | null,
};

export type OnDeleteSessionSubscription = {
  onDeleteSession:  {
    __typename: "Session",
    id: string,
    identity: string,
    accountId: string,
    title: string,
    images: string,
    theme: string,
    proposals: string,
    active: boolean,
  } | null,
};
