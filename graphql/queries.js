import { gql } from '@apollo/client';

export const GET_KANBANS_QUERY = gql`
  query Kanbans($input: String) {
    kanbans(query: $input) {
      _id
      name
      lists {
        _id
        name
        cards {
          _id
          body
        }
      }
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
        body
      }
    }
  }
`;