import { gql } from '@apollo/client';

export const LOGIN_USER_QUERY = gql`
  query Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      user {
        _id
        name
      }
      token
      payload
      errorMsg
    }
  }
`;

export const GET_KANBANS_QUERY = gql`
  query Kanbans {
    kanbans {
      _id
      name
      description
    }
  }
`;

export const GET_LISTS_QUERY = gql`
  query Lists($input: String!) {
    lists(query: $input) {
      _id
      name
      cards {
        _id
        name
        body
      }
    }
  }
`;

export const GET_LISTS_BY_ID_QUERY = gql`
  query GetListsById($input: ID!) {
    getListsById(query: $input) {
      _id
      name
      cards {
        _id
        name
        body
        position
        parentId
      }
    }
  }
`;