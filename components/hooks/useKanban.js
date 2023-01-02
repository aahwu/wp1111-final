import { useLazyQuery, useMutation } from "@apollo/client";
import { useState, useEffect, createContext, useContext, useDebugValue } from "react";
import { message } from 'antd'
import {
  CREATE_CARD_MUTATION, 
  DELETE_CARD_MUTATION,
  UPDATE_CARD_MUTATION,
  UPDATE_CARD_POSITION_MUTATION,
  CREATE_LIST_MUTATION,
  DELETE_LIST_MUTATION,
  UPDATE_LIST_MUTATION,
  CREATE_KANBAN_MUTATION,
  DELETE_KANBAN_MUTATION,
  UPDATE_KANBAN_NAME_MUTATION,
  UPDATE_KANBAN_DESCRIPTION_MUTATION,
  CREATE_USER_MUTATION,

  LOGIN_USER_MUTATION,

} from "../../graphql/mutations";
import { getClient } from "../../lib/getClient";
import { useRouter } from 'next/router'

const client = getClient();

const KanbanContext = createContext({
  username: '',
  token: '',
  selectedKanbanId: '',
  kanbans: [],
  lists: [],
  selectedCard: {},
  modalOpened: false,
  login: false,

  // card mutation
  createCard: () => {},
  deleteCard: () => {},
  updateCard: () => {},
  updateCardPosition: () => {},

  // list mutation
  createList: () => {},
  deleteList: () => {},
  updateList: () => {},

  // kanban mutation
  createKanban: () => {},
  deleteKanban: () => {},
  updateKanbanName: () => {},
  updateKanbanDescription: () => {},

  // user mutation
  createUser: () => {},

  loginUser: () => {},
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

  const [username, setUsername] = useState('');
  const [token, setToken] = useState('');
  const [selectedKanbanId, setSelectedKanbanId] = useState('');
  const [kanbans, setKanbans] = useState([]);
  const [lists, setLists] = useState([]);
  const [selectedCard, setSelectedCard] = useState({});
  const [modalOpened, setModalOpened] = useState(false);
  const [login, setLogin] = useState(false);
  const router = useRouter()

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

  // useEffect(() => {
  //   if (deletedCardData) {
  //     const deletedCard = deletedCardData.deleteCard;
  //     const newLists = [...lists];
  //     const listInd = newLists.findIndex((listObject) => listObject._id === deletedCard.parentId);
  //     const listObject = newLists[listInd];
  //     let result = Array.from(listObject.cards);
  //     result = result.filter((cardObject) => cardObject._id !== deletedCard._id);

  //     const newListObject = {...listObject};
  //     newListObject.cards = result;
  //     newLists[listInd] = newListObject;

  //     setLists(
  //       [...newLists]
  //     );
  //   }
  // }, [deletedCardData])

  // useEffect(() => {
  //   if (updatedCardData) {
  //     const updatedCard = updatedCardData.updateCard;
  //     const newLists = [...lists];
  //     const listInd = newLists.findIndex((listObject) => listObject._id === updatedCard.parentId);
  //     const listObject = newLists[listInd];
  //     const result = Array.from(listObject.cards);
  //     const cardInd = result.findIndex((cardObject) => cardObject._id === updatedCard._id);
  //     const cardObject = {...result[cardInd], name: updatedCard.name, body: updatedCard.body};
  //     result[cardInd] = cardObject;

  //     const newListObject = {...listObject};
  //     newListObject.cards = result;
  //     newLists[listInd] = newListObject;

  //     setLists(
  //       [...newLists]
  //     );

  //   }
  // }, [updatedCardData])

  // list mutation
  const [createList, { data: newListData }] = useMutation(CREATE_LIST_MUTATION);
  const [deleteList, { data: deletedListData }] = useMutation(DELETE_LIST_MUTATION);
  const [updateList, { data: updatedListData }] = useMutation(UPDATE_LIST_MUTATION);

  // useEffect for list mutation
  useEffect(() => {
    if (newListData) {
      const newList = newListData.createList;
      const newLists = lists ? [...lists, newList] : [newList];
      setLists(newLists);
    }
  }, [newListData])

  // useEffect(() => {
  //   if (deletedListData) {
  //     const deletedList = deletedListData.deleteList;
  //     let newLists = [...lists];
  //     newLists = newLists.filter((listObject) => listObject._id !== deletedList._id);
  //     setLists(newLists);
  //   }
  // }, [deletedListData])

  // useEffect(() => {
  //   if (updatedListData) {
  //     const updatedList = updatedListData.updateList;
  //     const newLists = [...lists];
  //     const index = newLists.findIndex((listObject) => listObject._id === updatedList._id);
  //     const newList = {...newLists[index]}
  //     newList.name = updatedList.name;
  //     newLists[index] = newList;
  //     console.log(newLists)
  //     setLists([...newLists])
  //   }
  // }, [updatedListData])

  // kanban mutation
  const [createKanban, { data: createdKanbanData }] = useMutation(CREATE_KANBAN_MUTATION, { context: { headers: { authorization: token } } });
  const [deleteKanban, { data: deletedKanbanData }] = useMutation(DELETE_KANBAN_MUTATION, { context: { headers: { authorization: token } } });
  const [updateKanbanName, { data: updatedKanbanName }] = useMutation(UPDATE_KANBAN_NAME_MUTATION, { context: { headers: { authorization: token } } });
  const [updateKanbanDescription, { data: updatedKanbanDescription }] = useMutation(UPDATE_KANBAN_DESCRIPTION_MUTATION, { context: { headers: { authorization: token } } });

  // useEffect for kanban mutation
  useEffect(() => {
    if (createdKanbanData) {
      const newKanban = createdKanbanData.createKanban;
      const newKanbans = kanbans ? [...kanbans, newKanban] : [newKanban];
      setKanbans(newKanbans)
      router.push(`/kanban/${newKanban._id}`)
      setSelectedKanbanId(newKanban._id);
    }
  }, [createdKanbanData])

  // user mutation
  const [createUser, { data: createdUserData }] = useMutation(CREATE_USER_MUTATION);
  const [loginUser, { data: loggedinUserData }] = useMutation(LOGIN_USER_MUTATION);
  
  // useEffect for user mutation
  useEffect(() => {
    if (createdUserData) {
      const createdUser = createdUserData.createUser;
      const payload = createdUser.payload;
      if (payload === 'SUCCESS') {
        displayStatus({
          type: payload,
          msg: 'Register successfully!'
        })
        setUsername(createdUser.user.name);
        router.push('/auth/login')
      } else {
        displayStatus({
          type: payload,
          msg: 'User exist. Please try another username.'
        })
      }
    }
  }, [createdUserData])

  useEffect(() => {
    if (loggedinUserData) {
      const loggedinUser = loggedinUserData.login;
      const payload = loggedinUser.payload;
      if (payload === 'SUCCESS') {
        setToken(loggedinUser.token);
        setUsername(loggedinUser.user.name);
        setLogin(true);
        router.push('/kanban')
        displayStatus({
          type: payload,
          msg: "Log in successfully!",
        })
      } else {
        displayStatus({
          type: payload,
          msg: loggedinUser.errorMsg,
        })
      }
    }
  }, [loggedinUserData])

  const displayStatus = (s) => {
    if (s.msg) {
      const { type, msg } = s;
      const content = { content: msg, duration: 1 }
      switch (type) {
        case 'info':
          message.info(content);
          break;
        case 'warning':
          message.warning(content);
          break;
        case 'SUCCESS':
          message.success(content);
          break;
        case 'FAIL':
          message.error(content);
          break;
        default:
          message.error(content);
          break;
      }
    }
  }


  return (
    <KanbanContext.Provider
      value={{
        username, token, selectedKanbanId, kanbans, lists, selectedCard, modalOpened, login,
        setUsername, setToken, setSelectedKanbanId, setKanbans, setLists, setSelectedCard, setModalOpened, setLogin,
        createCard, deleteCard, updateCard, updateCardPosition,
        createList, deleteList, updateList,
        createKanban, deleteKanban, updateKanbanName, updateKanbanDescription,
        createUser,
        loginUser,
        displayStatus,
      }}
      {...props}
    />
  ); 
}

const useKanban = () => useContext(KanbanContext);

export { KanbanProvider, useKanban }