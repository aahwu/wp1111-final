import styled from 'styled-components';
import DragWrapper from "./DragWrapper"
import { Droppable } from "react-beautiful-dnd";
import { Box, Button, Typography, Divider, TextField, IconButton, Card, listSubheaderClasses } from '@mui/material'
import AddOutlinedIcon from '@mui/icons-material/AddOutlined'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import { useKanban } from '../../../containers/hooks/useKanban';

const DropWrapper = ({ list, listInd, handleDelete }) => {

  const { setModalOpened, createCard } = useKanban(); 
  
  const createTask = async (id) => {
    try {
      await createCard({
        variables: { listId: id }
      })
    } catch (err) {
      alert(err)
    }
  }

  const deleteSection = async (listId) => {
    try {
    } catch (err) {
      alert(err)
    }
  }

  return (
    <Droppable key={listInd} droppableId={`${listInd}`}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          style={{ width: '300px', padding: '10px', marginRight: '10px' }}
          {...provided.droppableProps}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '10px'
            }}
          >
            <TextField
              value={list.name}
              onChange={(e) => updateSectionTitle(e, list._id)}
              placeholder='Untitled'
              variant='outlined'
              sx={{
                flexGrow: 1,
                '& .MuiOutlinedInput-input': { padding: 0 },
                '& .MuiOutlinedInput-notchedOutline': { border: 'unset ' },
                '& .MuiOutlinedInput-root': { fontSize: '1rem', fontWeight: '700' }
              }}
            />
            <IconButton
              variant='outlined'
              size='small'
              sx={{
                color: 'gray',
                '&:hover': { color: 'green' }
              }}
              onClick={() => createTask(list._id)}
            >
              <AddOutlinedIcon />
            </IconButton>
            <IconButton
              variant='outlined'
              size='small'
              sx={{
                color: 'gray',
                '&:hover': { color: 'red' }
              }}
              onClick={() => deleteSection(list._id)}
            >
              <DeleteOutlinedIcon />
            </IconButton>
          </div>
          {(!list.cards) ? <></>
          : list.cards.map((card, index) => (
              <DragWrapper card={card} cardInd={index} listInd={listInd} key={card._id} />
            )
          )}
        </div>
      )}
    </Droppable>
  )
}

export default DropWrapper;