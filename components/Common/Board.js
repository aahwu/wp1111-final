import Kanban from "./Kanban";
import { useKanban } from "../hooks/useKanban";
import { useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import Loading from "./Loading";
import { GET_LISTS_BY_ID_QUERY } from "../../graphql/queries";
import { IconButton, TextField } from '@mui/material'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined'
import StarOutlinedIcon from '@mui/icons-material/StarOutlined'
import CardModal from "./CardModal";
import { useRouter } from 'next/router'

let timer
const timeout = 500

const Board = () => {
  
  // router
  const router = useRouter();

  // hook
  const {
    token,
    selectedKanbanId,
    kanbans,
    setKanbans,
    setLists,
    setSelectedKanbanId,
    deleteKanban,
    updateKanbanName,
    updateKanbanDescription,
    updateKanbanFavorite,
  } = useKanban();
  const [previousId, setPreviousId] = useState('');
  const [isFavourite, setIsFavourite] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('')
  
  useEffect(() => {
    if (selectedKanbanId) {
      const selectedKanban = kanbans.find((kanbanObject) => kanbanObject._id === selectedKanbanId);
      setTitle(selectedKanban.name);
      setDescription(selectedKanban.description);
      setIsFavourite(selectedKanban.favorite);
    }
  }, [selectedKanbanId])

  // graphql query
  const {
    loading, error, data: listsData, subscribeToMore,
  } = useQuery(GET_LISTS_BY_ID_QUERY, {
    variables: {
      input: selectedKanbanId
    },
    fetchPolicy: 'cache-and-network',
    context: {
      headers: {
        authorization: token,
      }
    },
  });

  useEffect(() => {
    if(typeof listsData !== 'undefined') {
      setLists(listsData.getListsById);
    }
  }, [listsData])

  const handleUpdateKanbanFavorite = async () => {
    const nextIsFavorite = !isFavourite;
    const newKanbans = [...kanbans];
    const index = newKanbans.findIndex((kanbanObject) => kanbanObject._id === selectedKanbanId);
    const newKanban = {...newKanbans[index]}
    newKanban.favorite = nextIsFavorite;
    newKanbans[index] = newKanban;
    setKanbans([...newKanbans])
    setIsFavourite(nextIsFavorite);
    await updateKanbanFavorite({
      variables: {
        kanbanId: selectedKanbanId,
        newData: {
          favorite: nextIsFavorite
        }
      }
    });
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
      router.push('/kanban')
      setSelectedKanbanId('');
    } catch (err) {
      alert(err)
    }
  }

  const handleUpdateKanbanName = async (e) => {
    clearTimeout(timer)
    const newName = e.target.value;
    setTitle(newName);
    const newKanbans = [...kanbans];
    const index = newKanbans.findIndex((kanbanObject) => kanbanObject._id === selectedKanbanId);
    const newKanban = {...newKanbans[index]}
    newKanban.name = newName;
    newKanbans[index] = newKanban;
    setKanbans([...newKanbans])
    timer = setTimeout(async () => {
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
    }, timeout);
  }

  const handleUpdateKanbanDescription = async (e) => {
    clearTimeout(timer)
    const newDescription = e.target.value;
    setDescription(newDescription);
    const newKanbans = [...kanbans];
    const index = newKanbans.findIndex((kanbanObject) => kanbanObject._id === selectedKanbanId);
    const newKanban = {...newKanbans[index]}
    newKanban.description = newDescription;
    newKanbans[index] = newKanban;
    setKanbans([...newKanbans])
    timer = setTimeout(async () => {
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
    }, timeout)
  }

  return (
    loading ? <Loading /> : 
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
          <IconButton variant='outlined' onClick={handleUpdateKanbanFavorite}>
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