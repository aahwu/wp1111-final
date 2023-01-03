import { useKanban } from "../hooks/useKanban";
import { Box, Button, Typography, Divider } from '@mui/material'
import List from "./List";
import { DragDropContext } from "react-beautiful-dnd";
import { LoadingButton } from '@mui/lab';
import { useState } from "react";

const Kanban = () => {

  // hook
  const { lists, setLists, selectedKanbanId, updateCardPosition, createList } = useKanban();
  const [loading, setLoading] = useState(false);

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
    const destClone = (destinationObject.cards) ? Array.from(destinationObject.cards) : [];
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
  const onDragEnd = async (result) => {
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
      return;
    }
    const sInd = +source.droppableId;
    const dInd = +destination.droppableId;

    if (sInd === dInd) {
      const items = reorder(lists[sInd], source.index, destination.index);
      const newLists = [...lists];
      newLists[sInd] = items;
      setLists(newLists);
      await updateCardPosition({
        variables: {
          data: {
            destinationListId: lists[dInd]._id,
            destinationCardsId: items.cards.map((card) => card._id),
          }
        }
      })
    } else {
      const result = move(lists[sInd], lists[dInd], source, destination);
      const newLists = [...lists];
      newLists[sInd] = result[sInd];
      newLists[dInd] = result[dInd];
      setLists(newLists);
      await updateCardPosition({
        variables: {
          data: {
            sourceListId: lists[sInd]._id,
            destinationListId: lists[dInd]._id,
            sourceCardsId: result[sInd].cards.map((card) => card._id),
            destinationCardsId: result[dInd].cards.map((card) => card._id),
          }
        }
      })

    }
  }

  const handleCreateList = async () => {
    try {
      setLoading(true);
      await createList({
        variables: {
          kanbanId: selectedKanbanId
        }
      });
      setLoading(false);
    } catch (err) {
      alert(err)
    }
  }

  return (
    <>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flex: 0,
      }}>
        <Button onClick={handleCreateList}>
          Add list
        </Button>
        <Typography variant='body2' fontWeight='700' color='black'>
          {lists ? lists.length : 0} Lists
        </Typography>
      </div>
      <Divider sx={{ margin: '10px 0', flex: 0 }} />
      {!lists ? 
      <div 
        style={{
          width: '100%',
          height: '100%',
          color: 'black',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <LoadingButton
          variant='outlined'
          color='success'
          onClick={handleCreateList}
          loading={loading}
          style={{
            marginBottom: '10px'
          }}
        >
          Add list
        </LoadingButton>
      </div>
      
      : <Box sx={{
          display: 'flex',
          alignItems: 'flex-start',
          overflowX: 'auto',
          displayPrint: 'table-row',
          flex: 2,
        }}>
          <DragDropContext onDragEnd={onDragEnd}>
            {lists.map((list, index) => (
              <div 
                key={list._id}
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  // backgroundColor: 'rgba(0, 0, 0, 0.1)',
                  marginRight: '10px', 
                  borderRadius: '5px'
                }}  
              >
                <List list={list} listInd={index} key={list._id} />
                <Divider orientation="vertical" variant="middle" flexItem />
              </div>
            ))}
          </DragDropContext>
        </Box>
      }
    </>
  )
}

export default Kanban;