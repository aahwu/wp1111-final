import styled from 'styled-components';
import DropWrapper from "./DropWrapper"
import { DragDropContext } from "react-beautiful-dnd";

const Wrapper = styled.div`
  display: flex;
  alignItems: 'flex-start',
`;

const DDWrapper = ({ onDragEnd, lists, handleDelete }) => {
  return (
    <Wrapper>
      <DragDropContext onDragEnd={onDragEnd}>
        {lists.map((list, index) => (
          <div key={list._id} style={{ width: '300px' }}>
            <DropWrapper list={list} listInd={index} key={list._id} />
          </div>
        ))}
      </DragDropContext>
    </Wrapper>
  )
}

export default DDWrapper;