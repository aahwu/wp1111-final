import { gql } from '@apollo/client';

const CREATE_CARD_MUTATION = gql`
  mutation CreateCard($listId: ID!) {
    createCard(listId: $listId) {
      _id
      parentId,
      name,
      body,
      position,
    }
  }
`;

const DELETE_CARD_MUTATION = gql`
  mutation DeleteCard($cardId: ID!) {
    deleteCard(cardId: $cardId) {
      _id
      parentId
    }
  }
`;

const UPDATE_CARD_MUTATION = gql`
  mutation UpdateCard($cardId: ID!, $newData: UpdateCardInput!) {
    updateCard(cardId: $cardId, data: $newData) {
      _id
      parentId
      name
      body
    }
  }
`

const UPDATE_CARD_POSITION_MUTATION = gql`
  mutation UpdateCardPosition($data: UpdateCardPositionInput!) {
    updateCardPosition(data: $data)
  }
`

export { CREATE_CARD_MUTATION, DELETE_CARD_MUTATION, UPDATE_CARD_MUTATION, UPDATE_CARD_POSITION_MUTATION }