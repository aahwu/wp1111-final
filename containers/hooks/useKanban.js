import { useState, useEffect, createContext, useContext } from "react";

const KanbanContext = createContext({
  kanban: [],
  handleDelete: () => {},
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

  const [kanban, setKanban] = useState([]);

  // handleDelete
  const handleDelete = (listInd, cardInd) => () => {
    const newKanban = [...kanban];
    const listObject = newKanban[listInd];
    const result = Array.from(listObject.cards);
    console.log(result);
    result.splice(cardInd, 1);

    const newListObject = {...listObject};
    newListObject.cards = result;
    newKanban[listInd] = newListObject;

    setKanban(
      newKanban
    );
  }

  useEffect(() => {
    // console.log(kanban)
  }, [kanban])

  return (
    <KanbanContext.Provider
      value={{
        kanban, setKanban, handleDelete
      }}
      {...props}
    />
  ); 
}

const useKanban = () => useContext(KanbanContext);

export { KanbanProvider, useKanban }