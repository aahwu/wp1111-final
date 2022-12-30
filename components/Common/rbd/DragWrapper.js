import styled from 'styled-components';
import DeleteButtion from '../DeleteButton'
import { Draggable } from "react-beautiful-dnd";

const Wrapper = styled.div`
  
`;

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  display: "flex",
  justifyContent: "space-around",
  userSelect: "none",
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  background: isDragging ? "lightgreen" : "grey",

  // styles we need to apply on draggables
  ...draggableStyle
});

const DragWrapper = ({ card, listInd, cardInd, handleDelete }) => {
  return (
    <Draggable
      key={card._id}
      draggableId={card._id}
      index={cardInd}
    >
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={getItemStyle(
            snapshot.isDragging,
            provided.draggableProps.style
          )}
        >
          {card.body}
          <DeleteButtion cardInd={cardInd} listInd={listInd} handleDelete={handleDelete} />
        </div>
      )}
    </Draggable>
  )
}

export default DragWrapper;