import DDWrapper from "../components/Common/rbd/DDContextWrapper";
import Kanban from "./Kanban";
import { useKanban } from "./hooks/useKanban";
import { useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import Loading from "../components/Common/Loading";
import { GET_KANBANS_QUERY, GET_LISTS_QUERY, GET_LISTS_BY_ID_QUERY } from "../graphql/queries";
import { Box, IconButton, TextField } from '@mui/material'
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import CardModal from "./CardModal";

const Board = () => {

  // hook
  const {
    selectedKanbanId,
    kanbans,
    setKanbans,
    setLists,
    setSelectedKanbanId,
    deleteKanban,
    updateKanbanName,
    updateKanbanDescription,
  } = useKanban();
  const [isFavourite, setIsFavourite] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('')
  
  useEffect(() => {
    if (selectedKanbanId) {
      const selectedKanban = kanbans.find((kanbanObject) => kanbanObject._id === selectedKanbanId);
      setTitle(selectedKanban.name);
      setDescription(selectedKanban.description);
    }
  }, [selectedKanbanId])

  // graphql query
  const {
    loading, error, data: listsData, subscribeToMore,
  } = useQuery(GET_LISTS_BY_ID_QUERY, {
    variables: {
      input: selectedKanbanId
    },
    // fetchPolicy: 'cache-and-network',
  });

  useEffect(() => {
    if(typeof listsData !== 'undefined') {
      setLists(listsData.getListsById);
    }
  }, [listsData])

  const handleAddFavourite = async () => {
    try {
    } catch (err) {
      alert(err)
    }
  }

  const handleDeleteKanban = async () => {
    try {
      setLists([]);
      setKanbans([...kanbans.filter((kanban) => kanban._id !== selectedKanbanId)]);
      await deleteKanban({
        variables: {
          kanbanId: selectedKanbanId,
        }
      });
      setSelectedKanbanId('');
    } catch (err) {
      alert(err)
    }
  }

  const handleUpdateKanbanName = async (e) => {
    const newName = e.target.value;
    setTitle(newName);
    const newKanbans = [...kanbans];
    const index = newKanbans.findIndex((kanbanObject) => kanbanObject._id === selectedKanbanId);
    const newKanban = {...newKanbans[index]}
    newKanban.name = newName;
    newKanbans[index] = newKanban;
    setKanbans([...newKanbans])
    try {
      await updateKanbanName({
        variables: {
          kanbanId: selectedKanbanId,
          newData: {
            name: newName,
          }
        }
      });
    } catch (err) {
      alert(err)
    }
  }

  const handleUpdateKanbanDescription = async (e) => {
    const newDescription = e.target.value;
    setDescription(newDescription);
    const newKanbans = [...kanbans];
    const index = newKanbans.findIndex((kanbanObject) => kanbanObject._id === selectedKanbanId);
    const newKanban = {...newKanbans[index]}
    newKanban.description = newDescription;
    newKanbans[index] = newKanban;
    setKanbans([...newKanbans])
    try {
      await updateKanbanDescription({
        variables: {
          kanbanId: selectedKanbanId,
          newData: {
            description: newDescription,
          }
        }
      });
    } catch (err) {
      alert(err)
    }
  }

  return (
    loading ? <Loading /> : 
      selectedKanbanId === '' ? <p>nothing</p> :
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%'
        }}
      >
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          flex: 0,
        }}>
          <IconButton variant='outlined' onClick={handleAddFavourite}>
            {
              isFavourite ? (
                <StarOutlinedIcon color='warning' />
              ) : (
                <StarBorderOutlinedIcon />
              )
            }
          </IconButton>
          <IconButton variant='outlined' color='error' onClick={handleDeleteKanban}>
            <DeleteOutlinedIcon />
          </IconButton>
        </div>
        <div
          style={{
            padding: '10px 50px',
            flex: 2,

            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div>
            {/* <EmojiPicker icon={icon} onChange={onIconChange} /> */}
            <TextField
              value={title}
              onChange={handleUpdateKanbanName}
              placeholder='Untitled'
              variant='outlined'
              fullWidth
              sx={{
                '& .MuiOutlinedInput-input': { padding: 0 },
                '& .MuiOutlinedInput-notchedOutline': { border: 'unset ' },
                '& .MuiOutlinedInput-root': { fontSize: '2rem', fontWeight: '700' }
              }}
            />
            <TextField
              value={description}
              onChange={handleUpdateKanbanDescription}
              placeholder='Add a description'
              variant='outlined'
              multiline
              fullWidth
              sx={{
                '& .MuiOutlinedInput-input': { padding: 0 },
                '& .MuiOutlinedInput-notchedOutline': { border: 'unset ' },
                '& .MuiOutlinedInput-root': { fontSize: '0.8rem' }
              }}
            />
          </div>
          <Kanban />
        </div>
        <CardModal />
      </div>
  )
}

export default Board;