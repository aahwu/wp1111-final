import { useMutation } from "@apollo/client";
import { useState, useEffect, createContext, useContext, useDebugValue } from "react";
import {
  CREATE_CARD_MUTATION, 
  DELETE_CARD_MUTATION,
  UPDATE_CARD_MUTATION,
  UPDATE_CARD_POSITION_MUTATION,
  CREATE_LIST_MUTATION,
  DELETE_LIST_MUTATION,
  UPDATE_LIST_MUTATION,
} from "../../graphql/mutations";

const KanbanContext = createContext({
  lists: [],
  kanbans: [],
  selectedKanbanId: '',
  selectedCard: {},
  modalOpened: false,
  handleDelete: () => {},

  // card mutation
  createCard: () => {},
  deleteCard: () => {},
  updateCard: () => {},
  updateCardPosition: () => {},

  // list mutation
  createList: () => {},
  deleteList: () => {},
  updateList: () => {},
});

// generate fake array data: [ { id: ..., content: 'item ${ k+offset }}, ... ]
const getItems = (count, offset = 0) => {
  return Array.from({ length: count }, (v, k) => k)
    .map(k => ({
      id: `item-${k + offset}-${new Date().getTime()}`,
      content: `item ${k + offset}`
    })
  );
};

const KanbanProvider = (props) => {

  const [lists, setLists] = useState([]);
  const [kanbans, setKanbans] = useState([]);
  const [modalOpened, setModalOpened] = useState(false);
  const [selectedKanbanId, setSelectedKanbanId] = useState('');
  const [selectedCard, setSelectedCard] = useState({});

  // handleDelete
  const handleDelete = (listInd, cardInd) => () => {
    const newLists = [...lists];
    const listObject = newLists[listInd];
    const result = Array.from(listObject.cards);
    console.log(result);
    result.splice(cardInd, 1);

    const newListObject = {...listObject};
    newListObject.cards = result;
    newLists[listInd] = newListObject;

    setLists(
      newLists
    );
  }

  // handle onclick of menu
  const handleOnClick = ({ key }) => {
    setSelectedKanbanId(key)
    console.log(key)
  }

  // card mutation
  const [createCard, { data: newCardData }] = useMutation(CREATE_CARD_MUTATION);
  const [deleteCard, { data: deletedCardData }] = useMutation(DELETE_CARD_MUTATION);
  const [updateCard, { data: updatedCardData }] = useMutation(UPDATE_CARD_MUTATION);
  const [updateCardPosition] = useMutation(UPDATE_CARD_POSITION_MUTATION);

  // useEffect for card mutation
  useEffect(() => {
    if (newCardData) {
      const newCard = newCardData.createCard;
      const newLists = [...lists];
      const listInd = newLists.findIndex((listObject) => listObject._id === newCard.parentId);
      const listObject = newLists[listInd];
      const result = (listObject.cards) ? Array.from(listObject.cards) : [];
      result.push(newCard);

      const newListObject = {...listObject};
      newListObject.cards = result;
      newLists[listInd] = newListObject;

      setLists(
        [...newLists]
      );
    }
  }, [newCardData]);

  useEffect(() => {
    if (deletedCardData) {
      const deletedCard = deletedCardData.deleteCard;
      const newLists = [...lists];
      const listInd = newLists.findIndex((listObject) => listObject._id === deletedCard.parentId);
      const listObject = newLists[listInd];
      let result = Array.from(listObject.cards);
      result = result.filter((cardObject) => cardObject._id !== deletedCard._id);

      const newListObject = {...listObject};
      newListObject.cards = result;
      newLists[listInd] = newListObject;

      setLists(
        [...newLists]
      );
    }
  }, [deletedCardData])

  useEffect(() => {
    if (updatedCardData) {
      const updatedCard = updatedCardData.updateCard;
      const newLists = [...lists];
      const listInd = newLists.findIndex((listObject) => listObject._id === updatedCard.parentId);
      const listObject = newLists[listInd];
      const result = Array.from(listObject.cards);
      const cardInd = result.findIndex((cardObject) => cardObject._id === updatedCard._id);
      const cardObject = {...result[cardInd], name: updatedCard.name, body: updatedCard.body};
      result[cardInd] = cardObject;

      const newListObject = {...listObject};
      newListObject.cards = result;
      newLists[listInd] = newListObject;

      setLists(
        [...newLists]
      );

    }
  }, [updatedCardData])

  // list mutation
  const [createList, { data: newListData }] = useMutation(CREATE_LIST_MUTATION);
  const [deleteList, { data: deletedListData }] = useMutation(DELETE_LIST_MUTATION);
  const [updateList, { data: updatedListData }] = useMutation(UPDATE_LIST_MUTATION);

  // useEffect for list mutation
  useEffect(() => {
    if (newListData) {
      const newList = newListData.createList;
      const newLists = [...lists, newList];
      setLists(newLists);
    }
  }, [newListData])

  useEffect(() => {
    if (deletedListData) {
      const deletedList = deletedListData.deleteList;
      let newLists = [...lists];
      newLists = newLists.filter((listObject) => listObject._id !== deletedList._id);
      setLists(newLists);
    }
  }, [deletedListData])

  useEffect(() => {
    if (updatedListData) {
      const updatedList = updatedListData.updateList;
      const newLists = [...lists];
      const index = newLists.findIndex((listObject) => listObject._id === updatedList._id);
      const newList = {...newLists[index]}
      newList.name = updatedList.name;
      newLists[index] = newList;
      console.log(newLists)
      setLists([...newLists])
    }
  }, [updatedListData])

  return (
    <KanbanContext.Provider
      value={{
        lists, kanbans, selectedKanbanId, selectedCard, modalOpened,
        setLists, setKanbans, setSelectedKanbanId, setSelectedCard, setModalOpened,
        handleDelete, handleOnClick,
        createCard, deleteCard, updateCard, updateCardPosition,
        createList, deleteList, updateList,
      }}
      {...props}
    />
  ); 
}

const useKanban = () => useContext(KanbanContext);

export { KanbanProvider, useKanban }