import { Droppable } from "react-beautiful-dnd";
import { TextField, IconButton } from '@mui/material'
import AddOutlinedIcon from '@mui/icons-material/AddOutlined'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import { useKanban } from '../hooks/useKanban';
import DragCard from "./DragCard"

const List = ({ list, listInd }) => {

  const { lists, setLists, createCard, deleteList, updateList } = useKanban();

  const handleCreateCard = async () => {
    try {
      await createCard({
        variables: { listId: list._id }
      })
    } catch (err) {
      alert(err)
    }
  }

  const handleDeleteList = async () => {
    try {
      let newLists = [...lists];
      newLists = newLists.filter((listObject) => listObject._id !== list._id);
      setLists([...newLists]);
      await deleteList({
        variables: { listId: list._id }
      })
    } catch (err) {
      alert(err)
    }
  }

  const handleUpdateList = async (e) => {
    const newName = e.target.value;
    try {
      const newLists = [...lists];
      const index = newLists.findIndex((listObject) => listObject._id === list._id);
      const newList = {...newLists[index]}
      newList.name = newName;
      newLists[index] = newList;
      setLists([...newLists])
      await updateList({
        variables: {
          listId: list._id,
          newData: {
            name: newName
          }
        }
      })
    } catch (err) {
      alert(err)
    }
  }

  return (
    <div style={{
      width: '300px', 
      padding: '10px', 
      marginRight: '10px', 
      minHeight:'100px'
    }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '10px'
        }}
      >
        <TextField
          defaultValue={list.name}
          onChange={(e) => handleUpdateList(e)}
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
          onClick={handleCreateCard}
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
          onClick={handleDeleteList}
        >
          <DeleteOutlinedIcon />
        </IconButton>
      </div>
      <Droppable key={listInd} droppableId={`${listInd}`}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            style={{
              minHeight: '100%'
            }}
          >
            {(!list.cards) ? <></>
            : list.cards.map((card, index) => (
                <DragCard card={card} cardInd={index} key={card._id} />
              )
            )}
          </div>
        )}
      </Droppable>
    </div>
  )
}

export default List;