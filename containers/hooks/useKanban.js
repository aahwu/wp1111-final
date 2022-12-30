import { useState, useEffect, createContext, useContext } from "react";

const KanbanContext = createContext({
  lists: [],
  kanbans: [],
  handleDelete: () => {},
  selectedKanbanId: '',
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
  const [selectedKanbanId, setSelectedKanbanId] = useState('');

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


  return (
    <KanbanContext.Provider
      value={{
        lists, kanbans, selectedKanbanId, setLists, setKanbans, setSelectedKanbanId, 
        handleDelete, handleOnClick
      }}
      {...props}
    />
  ); 
}

const useKanban = () => useContext(KanbanContext);

export { KanbanProvider, useKanban }