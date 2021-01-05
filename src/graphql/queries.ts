/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getEntry = /* GraphQL */ `
  query GetEntry($id: ID!) {
    getEntry(id: $id) {
      id
      owner
      sessionId
      inputs
      createdAt
      updatedAt
    }
  }
`;
export const listEntrys = /* GraphQL */ `
  query ListEntrys(
    $filter: ModelEntryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listEntrys(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        owner
        sessionId
        inputs
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const entryByOwnerAndSession = /* GraphQL */ `
  query EntryByOwnerAndSession(
    $owner: String
    $sessionId: ModelIDKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelEntryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    entryByOwnerAndSession(
      owner: $owner
      sessionId: $sessionId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        owner
        sessionId
        inputs
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getSession = /* GraphQL */ `
  query GetSession($id: ID!) {
    getSession(id: $id) {
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
export const listSessions = /* GraphQL */ `
  query ListSessions(
    $filter: ModelSessionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSessions(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
