/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateSession = /* GraphQL */ `
  subscription OnCreateSession(
    $id: ID
    $identity: String
    $accountId: String
    $title: String
    $images: AWSJSON
    $theme: AWSJSON
    $proposals: AWSJSON
    $active: Boolean
  ) {
    onCreateSession(
      id: $id
      identity: $identity
      accountId: $accountId
      title: $title
      images: $images
      theme: $theme
      proposals: $proposals
      active: $active
    ) {
      id
      identity
      accountId
      title
      images
      theme
      proposals
      active
    }
  }
`;
export const onUpdateSession = /* GraphQL */ `
  subscription OnUpdateSession(
    $id: ID
    $identity: String
    $accountId: String
    $title: String
    $images: AWSJSON
    $theme: AWSJSON
    $proposals: AWSJSON
    $active: Boolean
  ) {
    onUpdateSession(
      id: $id
      identity: $identity
      accountId: $accountId
      title: $title
      images: $images
      theme: $theme
      proposals: $proposals
      active: $active
    ) {
      id
      identity
      accountId
      title
      images
      theme
      proposals
      active
    }
  }
`;
export const onDeleteSession = /* GraphQL */ `
  subscription OnDeleteSession(
    $id: ID
    $identity: String
    $accountId: String
    $title: String
    $images: AWSJSON
    $theme: AWSJSON
    $proposals: AWSJSON
    $active: Boolean
  ) {
    onDeleteSession(
      id: $id
      identity: $identity
      accountId: $accountId
      title: $title
      images: $images
      theme: $theme
      proposals: $proposals
      active: $active
    ) {
      id
      identity
      accountId
      title
      images
      theme
      proposals
      active
    }
  }
`;
