import styled from 'styled-components';
import DropWrapper from "./DropWrapper"
import { DragDropContext } from "react-beautiful-dnd";
import { Box, Button, Typography, Divider, TextField, IconButton, Card } from '@mui/material'


const DDWrapper = ({ onDragEnd, lists }) => {
  return (
    <Box sx={{
      display: 'flex',
      alignItems: 'flex-start',
      // width: 'calc(100vw - 400px)',
      // height: '100%',
      overflowX: 'auto',
      displayPrint: 'table-row',
      flex: 2,
    }}>
      <DragDropContext onDragEnd={onDragEnd}>
        {lists.map((list, index) => (
          <div key={list._id} 
            // style={{ width: '300px' }}
          >
            <DropWrapper list={list} listInd={index} key={list._id} />
          </div>
        ))}
      </DragDropContext>
    </Box>
  )
}

export default DDWrapper;