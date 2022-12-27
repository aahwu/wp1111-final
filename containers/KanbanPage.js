import React, { useState, useEffect } from "react";
import { useQuery } from '@apollo/client';
import DDWrapper from "../components/DDContextWrapper";
import { useKanban } from "./hooks/useKanban";
import { GET_KANBANS_QUERY, GET_LISTS_QUERY } from "../graphql/queries";

const KanbanPage = () => {

  // graphql query
  const {
    loading, error, data: listsData, subscribeToMore,
  } = useQuery(GET_LISTS_QUERY, {
    variables: {
      input: "AAHLS"
    }
  });

  // hook
  const { kanban, setKanban, handleDelete } = useKanban();
  useEffect(() => {
    if(listsData) {
      const { lists } = listsData;
      setKanban(lists);
    }
  }, [listsData])

  // move element from startIndex to endIndex
  const reorder = (listObject, startIndex, endIndex) => {
    const result = Array.from(listObject.cards);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    const newListObject = {...listObject};
    newListObject.cards = result;
    
    return newListObject;
  };

  // move element across list
  const move = (sourceObject, destinationObject, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(sourceObject.cards);
    const destClone = Array.from(destinationObject.cards);
    const [removed] = sourceClone.splice(droppableSource.index, 1);
  
    destClone.splice(droppableDestination.index, 0, removed);
  
    const result = {};
    const newSourceObject = {...sourceObject};
    const newDestinationObject = {...destinationObject};
    newSourceObject.cards = sourceClone;
    newDestinationObject.cards = destClone;
    result[droppableSource.droppableId] = newSourceObject;
    result[droppableDestination.droppableId] = newDestinationObject;
  
    return result;
  };

  // onDragEnd function
  const onDragEnd = (result) => {
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
      return;
    }
    const sInd = +source.droppableId;
    const dInd = +destination.droppableId;

    if (sInd === dInd) {
      const items = reorder(kanban[sInd], source.index, destination.index);
      console.log(items)
      const newKanban = [...kanban];
      newKanban[sInd] = items;
      console.log(newKanban)
      setKanban(newKanban);
    } else {
      const result = move(kanban[sInd], kanban[dInd], source, destination);
      const newKanban = [...kanban];
      newKanban[sInd] = result[sInd];
      newKanban[dInd] = result[dInd];

      setKanban(newKanban);
    }
  }
  return (
    <DDWrapper kanban={kanban} onDragEnd={onDragEnd} handleDelete={handleDelete} />
  )
}

export default KanbanPage;