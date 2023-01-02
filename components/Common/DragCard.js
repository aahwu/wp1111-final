import styled from 'styled-components';
import { Draggable } from "react-beautiful-dnd";
import { Box, Button, Typography, Divider, TextField, IconButton, Card } from '@mui/material'
import { useKanban } from '../hooks/useKanban';
import { useEffect } from 'react';

const DragCard = ({ card, cardInd }) => {

  const { setModalOpened, setSelectedCard } = useKanban();

  const handleModal = () => {
    setSelectedCard(card);
    setModalOpened(true);
    console.log(card)
  }

  return (
    <Draggable
      key={card._id}
      draggableId={card._id}
      index={cardInd}
    >
      {(provided, snapshot) => (
        <Card
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          sx={{
            padding: '10px',
            marginBottom: '10px',
            cursor: snapshot.isDragging ? 'grab' : 'pointer!important'
          }}
          onClick={handleModal}
        >
          <Typography>
            {card.name === '' ? 'Untitled' : card.name}
          </Typography>
        </Card>
      )}
    </Draggable>
  )
}

export default DragCard;