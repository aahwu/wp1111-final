import { gql } from '@apollo/client';

export const INITIALIZATION = gql`
  query Initialization {
    initialization
  }
`;

export const GET_KANBANS_QUERY = gql`
  query Kanbans($username: String) {
    kanbans(username: $username) {
      _id
      name
      description
      favorite
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