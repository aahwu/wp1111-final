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
  const { lists, setLists, selectedKanbanId, handleDelete } = useKanban();
  const [isFavourite, setIsFavourite] = useState(false)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  
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

  const addFavourite = async () => {
    try {
    } catch (err) {
      alert(err)
    }
  }

  const deleteBoard = async () => {
    try {
    } catch (err) {
      alert(err)
    }
  }

  const updateTitle = async (e) => {
    clearTimeout(timer)
    const newTitle = e.target.value
    setTitle(newTitle)

    let temp = [...boards]
    const index = temp.findIndex(e => e.id === boardId)
    temp[index] = { ...temp[index], title: newTitle }

    if (isFavourite) {
      let tempFavourite = [...favouriteList]
      const favouriteIndex = tempFavourite.findIndex(e => e.id === boardId)
      tempFavourite[favouriteIndex] = { ...tempFavourite[favouriteIndex], title: newTitle }
      dispatch(setFavouriteList(tempFavourite))
    }

    dispatch(setBoards(temp))

    timer = setTimeout(async () => {
      try {
        await boardApi.update(boardId, { title: newTitle })
      } catch (err) {
        alert(err)
      }
    }, timeout);
  }

  const updateDescription = async (e) => {
    clearTimeout(timer)
    const newDescription = e.target.value
    setDescription(newDescription)
    timer = setTimeout(async () => {
      try {
        await boardApi.update(boardId, { description: newDescription })
      } catch (err) {
        alert(err)
      }
    }, timeout);
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
        <IconButton variant='outlined' onClick={addFavourite}>
          {
            isFavourite ? (
              <StarOutlinedIcon color='warning' />
            ) : (
              <StarBorderOutlinedIcon />
            )
          }
        </IconButton>
        <IconButton variant='outlined' color='error' onClick={deleteBoard}>
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
        <div
          // style={{
          //   display: 'flex',
          //   flexDirection: 'column',
          //   height: '100%'
          // }}
        >
          {/* <EmojiPicker icon={icon} onChange={onIconChange} /> */}
          <TextField
            value={title}
            onChange={updateTitle}
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
            onChange={updateDescription}
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