import DDWrapper from "../components/Common/rbd/DDContextWrapper";
import { useKanban } from "./hooks/useKanban";
import { useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import Loading from "../components/Common/Loading";
import { GET_KANBANS_QUERY, GET_LISTS_QUERY, GET_LISTS_BY_ID_QUERY } from "../graphql/queries";

const Kanban = () => {

  // hook
  const { lists, setLists, selectedKanbanId, handleDelete } = useKanban();
  
  // graphql query
  const {
    loading, error, data: listsData, subscribeToMore,
  } = useQuery(GET_LISTS_BY_ID_QUERY, {
    variables: {
      input: selectedKanbanId
    }
  });

  useEffect(() => {
    if(typeof listsData !== 'undefined') {
      console.log(listsData)
      setLists(listsData.getListsById);
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
      const items = reorder(lists[sInd], source.index, destination.index);
      console.log(items)
      const newLists = [...lists];
      newLists[sInd] = items;
      console.log(newLists)
      setLists(newLists);
    } else {
      const result = move(lists[sInd], lists[dInd], source, destination);
      const newLists = [...lists];
      newLists[sInd] = result[sInd];
      newLists[dInd] = result[dInd];

      setLists(newLists);
    }
  }
  return (
    loading ? <Loading /> : <DDWrapper lists={lists} onDragEnd={onDragEnd} handleDelete={handleDelete} />
  )
}

export default Kanban;