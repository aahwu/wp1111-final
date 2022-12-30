import styled from 'styled-components';
import DragWrapper from "./DragWrapper"
import { Droppable } from "react-beautiful-dnd";

const Wrapper = styled.div`
  
`;

const grid = 8;

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
  padding: grid,
  width: 250
});

const DropWrapper = ({ list, listInd, handleDelete }) => {



  return (
    <Droppable key={listInd} droppableId={`${listInd}`}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          style={getListStyle(snapshot.isDraggingOver)}
          {...provided.droppableProps}
        >
          {(!list.cards) ? <></>
          : list.cards.map((card, index) => (
            <DragWrapper card={card} cardInd={index} listInd={listInd} handleDelete={handleDelete} key={card._id} />
          ))}
        </div>
      )}
    </Droppable>
  )
}

export default DropWrapper;