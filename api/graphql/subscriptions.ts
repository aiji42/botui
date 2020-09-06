/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateSession = /* GraphQL */ `
  subscription OnCreateSession(
    $id: ID
    $accountId: String
    $title: String
    $proposals: AWSJSON
    $active: Boolean
  ) {
    onCreateSession(
      id: $id
      accountId: $accountId
      title: $title
      proposals: $proposals
      active: $active
    ) {
      id
      accountId
      title
      proposals
      active
    }
  }
`;
export const onUpdateSession = /* GraphQL */ `
  subscription OnUpdateSession(
    $id: ID
    $accountId: String
    $title: String
    $proposals: AWSJSON
    $active: Boolean
  ) {
    onUpdateSession(
      id: $id
      accountId: $accountId
      title: $title
      proposals: $proposals
      active: $active
    ) {
      id
      accountId
      title
      proposals
      active
    }
  }
`;
export const onDeleteSession = /* GraphQL */ `
  subscription OnDeleteSession(
    $id: ID
    $accountId: String
    $title: String
    $proposals: AWSJSON
    $active: Boolean
  ) {
    onDeleteSession(
      id: $id
      accountId: $accountId
      title: $title
      proposals: $proposals
      active: $active
    ) {
      id
      accountId
      title
      proposals
      active
    }
  }
`;
