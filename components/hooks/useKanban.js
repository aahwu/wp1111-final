import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { useState, useEffect, createContext, useContext } from "react";
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
  UPDATE_KANBAN_FAVORITE_MUTATION,
  CREATE_USER_MUTATION,

  LOGIN_USER_MUTATION,

} from "../../graphql/mutations";
import { GET_LISTS_BY_ID_QUERY, INITIALIZATION } from "../../graphql/queries";
import { GET_KANBANS_QUERY } from "../../graphql/queries";
import { useApolloClient } from '@apollo/client';
import { useRouter } from 'next/router'

const KanbanContext = createContext({
  username: '',
  token: '',
  selectedKanbanId: '',
  selectedItem: '',
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
  updateKanbanFavorite: () => {},
  queryKanbans: () => {},

  // user mutation
  createUser: () => {},
  loginUser: () => {},

  // write client query
  writeClient: () => {},

});

const KanbanProvider = (props) => {

  const [username, setUsername] = useState('');
  const [token, setToken] = useState('');
  const [selectedKanbanId, setSelectedKanbanId] = useState('');
  const [selectedItem, setSelectedItem] = useState('');
  const [kanbans, setKanbans] = useState([]);
  const [lists, setLists] = useState([]);
  const [selectedCard, setSelectedCard] = useState({});
  const [modalOpened, setModalOpened] = useState(false);
  const [login, setLogin] = useState(false);
  const router = useRouter()
  const client = useApolloClient();

  // initialization
  const { data } = useQuery(INITIALIZATION);

  // card mutation
  const [createCard, { data: newCardData }] = useMutation(CREATE_CARD_MUTATION, { context: { headers: { authorization: token } } });
  const [deleteCard, { data: deletedCardData }] = useMutation(DELETE_CARD_MUTATION, { context: { headers: { authorization: token } } });
  const [updateCard, { data: updatedCardData }] = useMutation(UPDATE_CARD_MUTATION, { context: { headers: { authorization: token } } });
  const [updateCardPosition] = useMutation(UPDATE_CARD_POSITION_MUTATION, { context: { headers: { authorization: token } } });

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
      setSelectedCard(newCard);
      setModalOpened(true);
    }
  }, [newCardData]);

  // list mutation
  const [createList, { data: newListData }] = useMutation(CREATE_LIST_MUTATION, { context: { headers: { authorization: token } } });
  const [deleteList, { data: deletedListData }] = useMutation(DELETE_LIST_MUTATION, { context: { headers: { authorization: token } } });
  const [updateList, { data: updatedListData }] = useMutation(UPDATE_LIST_MUTATION, { context: { headers: { authorization: token } } });

  // useEffect for list mutation
  useEffect(() => {
    if (newListData) {
      const newList = newListData.createList;
      const newLists = lists ? [...lists, newList] : [newList];
      setLists(newLists);
    }
  }, [newListData])

  // useE

  // kanban mutation
  const [createKanban, { data: createdKanbanData }] = useMutation(CREATE_KANBAN_MUTATION, { context: { headers: { authorization: token } } });
  const [deleteKanban, { data: deletedKanbanData }] = useMutation(DELETE_KANBAN_MUTATION, { context: { headers: { authorization: token } } });
  const [updateKanbanName, { data: updatedKanbanName }] = useMutation(UPDATE_KANBAN_NAME_MUTATION, { context: { headers: { authorization: token } } });
  const [updateKanbanDescription, { data: updatedKanbanDescription }] = useMutation(UPDATE_KANBAN_DESCRIPTION_MUTATION, { context: { headers: { authorization: token } } });
  const [updateKanbanFavorite, { data: updatedKanbanFavorite }] = useMutation(UPDATE_KANBAN_FAVORITE_MUTATION, { context: { headers: { authorization: token } } });
  const [queryKanbans, { data: kanbansData }] = useLazyQuery(GET_KANBANS_QUERY, { context: { headers: { authorization: token } } });

  // useEffect for kanban mutation
  useEffect(() => {
    if (createdKanbanData) {
      const newKanban = createdKanbanData.createKanban;
      const newKanbans = kanbans ? [...kanbans, newKanban] : [newKanban];
      setKanbans(newKanbans)
      router.push(`/kanban/${newKanban._id}`)
      setSelectedKanbanId(newKanban._id);
      setSelectedItem(newKanban._id);
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
        setUsername(loggedinUser.user.nickname === '' ? loggedinUser.user.name : loggedinUser.user.nickname);
        setLogin(true);
        setKanbans(loggedinUser.kanbans);
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

  const writeClient = (previousId, previousLists) => {
    client.writeQuery({
      query: GET_LISTS_BY_ID_QUERY,
      data: { // Contains the data to write
        getListsById: !previousLists ? [] : previousLists.map(
          (listObject) => ({
            _id: listObject._id,
            name: listObject.name,
            cards: !listObject.cards ? [] : listObject.cards.map(
              (cardObject) => ({
                _id: cardObject._id,
                name: cardObject.name,
                body: cardObject.body,
                position: cardObject.position,
                parentId: cardObject.parentId,
              })
            )
          })
        )
      },
      variables: {
        input: previousId
      },
    });
  }

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
        username, token, selectedKanbanId, selectedItem, kanbans, lists, selectedCard, modalOpened, login,
        setUsername, setToken, setSelectedKanbanId, setSelectedItem, setKanbans, setLists, setSelectedCard, setModalOpened, setLogin,
        createCard, deleteCard, updateCard, updateCardPosition,
        createList, deleteList, updateList,
        createKanban, deleteKanban, updateKanbanName, updateKanbanDescription, updateKanbanFavorite, queryKanbans,
        createUser, loginUser,
        writeClient,
        displayStatus,
      }}
      {...props}
    />
  ); 
}

const useKanban = () => useContext(KanbanContext);

export { KanbanProvider, useKanban }