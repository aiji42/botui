/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createSession = /* GraphQL */ `
  mutation CreateSession($input: CreateSessionInput!) {
    createSession(input: $input) {
      id
      accountId
      title
      proposals
      active
    }
  }
`;
export const updateSession = /* GraphQL */ `
  mutation UpdateSession($input: UpdateSessionInput!) {
    updateSession(input: $input) {
      id
      accountId
      title
      proposals
      active
    }
  }
`;
export const deleteSession = /* GraphQL */ `
  mutation DeleteSession($input: DeleteSessionInput!) {
    deleteSession(input: $input) {
      id
      accountId
      title
      proposals
      active
    }
  }
`;
