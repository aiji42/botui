/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateSession = /* GraphQL */ `
  subscription OnCreateSession($owner: String!) {
    onCreateSession(owner: $owner) {
      id
      owner
      title
      active
      theme
      proposals
      images
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateSession = /* GraphQL */ `
  subscription OnUpdateSession($owner: String!) {
    onUpdateSession(owner: $owner) {
      id
      owner
      title
      active
      theme
      proposals
      images
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteSession = /* GraphQL */ `
  subscription OnDeleteSession($owner: String!) {
    onDeleteSession(owner: $owner) {
      id
      owner
      title
      active
      theme
      proposals
      images
      createdAt
      updatedAt
    }
  }
`;
