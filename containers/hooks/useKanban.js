import { useMutation } from "@apollo/client";
import { useState, useEffect, createContext, useContext } from "react";
import { CREATE_CARD_MUTATION, DELETE_CARD_MUTATION, UPDATE_CARD_MUTATION, UPDATE_CARD_POSITION_MUTATION } from "../../graphql/mutations";

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

  // graphql mutation
  const [createCard, { data: newCardData }] = useMutation(CREATE_CARD_MUTATION);
  const [deleteCard, { data: deletedCardData }] = useMutation(DELETE_CARD_MUTATION);
  const [updateCard, { data: updatedCardData }] = useMutation(UPDATE_CARD_MUTATION);
  const [updateCardPosition] = useMutation(UPDATE_CARD_POSITION_MUTATION);

  // useEffect for mutation
  useEffect(() => {
    if (newCardData) {
      const newCard = newCardData.createCard;
      const newLists = [...lists];
      const listInd = newLists.findIndex((listObject) => listObject._id === newCard.parentId);
      const listObject = newLists[listInd];
      const result = (listObject) ? Array.from(listObject.cards) : [];
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
      console.log(deletedCard)
      const newLists = [...lists];
      const listInd = newLists.findIndex((listObject) => listObject._id === deletedCard.parentId);
      const listObject = newLists[listInd];
      let result = Array.from(listObject.cards);
      result = result.filter((cardObject) => cardObject._id !== deletedCard._id);
      console.log(result);

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
      console.log(updatedCard);
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

  return (
    <KanbanContext.Provider
      value={{
        lists, kanbans, selectedKanbanId, selectedCard, modalOpened,
        setLists, setKanbans, setSelectedKanbanId, setSelectedCard, setModalOpened,
        handleDelete, handleOnClick,
        createCard, deleteCard, updateCard, updateCardPosition
      }}
      {...props}
    />
  ); 
}

const useKanban = () => useContext(KanbanContext);

export { KanbanProvider, useKanban }