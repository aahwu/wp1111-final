import { gql } from '@apollo/client';

// user mutation
export const CREATE_USER_MUTATION = gql`
  mutation CreateUser($username: String!, $password: String!) {
    createUser(username: $username, password: $password) {
      user {
        _id
        name
      }
      payload
    }
  }
`

// kanban mutation
export const CREATE_KANBAN_MUTATION = gql`
  mutation CreateKanban {
    createKanban {
      _id
      name
      description
    }
  }
`;

export const DELETE_KANBAN_MUTATION = gql`
  mutation DeleteKanban($kanbanId: ID!) {
    deleteKanban(kanbanId: $kanbanId) {
      _id
    }
  }
`;

export const UPDATE_KANBAN_NAME_MUTATION = gql`
  mutation UpdateKanbanName($kanbanId: ID!, $newData: UpdateKanbanNameInput!) {
    updateKanbanName(kanbanId: $kanbanId, data: $newData) {
      _id
      name
    }
  }
`

export const UPDATE_KANBAN_DESCRIPTION_MUTATION = gql`
  mutation UpdateKanbanDescription($kanbanId: ID!, $newData: UpdateKanbanDescriptionInput!) {
    updateKanbanDescription(kanbanId: $kanbanId, data: $newData) {
      _id
      description
    }
  }
`

// list mutation
export const CREATE_LIST_MUTATION = gql`
  mutation CreateList($kanbanId: ID!) {
    createList(kanbanId: $kanbanId) {
      _id
      parentId,
      name,
    }
  }
`;

export const DELETE_LIST_MUTATION = gql`
  mutation DeleteList($listId: ID!) {
    deleteList(listId: $listId) {
      _id
      parentId
    }
  }
`;

export const UPDATE_LIST_MUTATION = gql`
  mutation UpdateList($listId: ID!, $newData: UpdateListInput!) {
    updateList(listId: $listId, data: $newData) {
      _id
      parentId
      name
    }
  }
`

// card mutation
export const CREATE_CARD_MUTATION = gql`
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

export const DELETE_CARD_MUTATION = gql`
  mutation DeleteCard($cardId: ID!) {
    deleteCard(cardId: $cardId) {
      _id
      parentId
    }
  }
`;

export const UPDATE_CARD_MUTATION = gql`
  mutation UpdateCard($cardId: ID!, $newData: UpdateCardInput!) {
    updateCard(cardId: $cardId, data: $newData) {
      _id
      parentId
      name
      body
    }
  }
`

export const UPDATE_CARD_POSITION_MUTATION = gql`
  mutation UpdateCardPosition($data: UpdateCardPositionInput!) {
    updateCardPosition(data: $data)
  }
`