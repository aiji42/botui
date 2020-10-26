/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getSession = /* GraphQL */ `
  query GetSession($id: ID!) {
    getSession(id: $id) {
      id
      identity
      title
      images
      theme
      proposals
      active
    }
  }
`;
export const listSessions = /* GraphQL */ `
  query ListSessions(
    $filter: TableSessionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSessions(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        identity
        title
        images
        theme
        proposals
        active
      }
      nextToken
    }
  }
`;
