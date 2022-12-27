import styled from 'styled-components';
import DropWrapper from "./DropWrapper"
import { DragDropContext } from "react-beautiful-dnd";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-content: space-between;
`;

const DDWrapper = ({ onDragEnd, kanban, handleDelete }) => {
  return (
    <Wrapper>
      <DragDropContext onDragEnd={onDragEnd}>
        {kanban.map((list, index) => (
          <DropWrapper list={list} listInd={index} handleDelete={handleDelete} key={list._id} />
        ))}
      </DragDropContext>
    </Wrapper>
  )
}

export default DDWrapper;