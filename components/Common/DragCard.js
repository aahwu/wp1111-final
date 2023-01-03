import { Draggable } from "react-beautiful-dnd";
import { Typography, Card, Divider } from '@mui/material'
import { useKanban } from '../hooks/useKanban';
// import { Card } from "antd";

const DragCard = ({ card, cardInd }) => {

  const { setModalOpened, setSelectedCard } = useKanban();

  const handleModal = () => {
    setSelectedCard(card);
    setModalOpened(true);
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
          <Typography sx={{ fontSize: 18 }} >
            {card.name === '' ? 'Untitled' : card.name}
          </Typography>
          { card.body ? 
            <>
              <Divider sx={{ margin: '10px 0', flex: 0 }} />
              <Typography sx={{ fontSize: 14 }} color="text.secondary" >
                {card.body}
              </Typography>
            </>
            : <></>
          }
        </Card>
      )}
    </Draggable>
  )
}

export default DragCard;