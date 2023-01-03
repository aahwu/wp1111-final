import { Input, Form, Modal } from 'antd';
import { useEffect, useState } from 'react';
import { useKanban } from '../hooks/useKanban';
import styled from 'styled-components';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import { IconButton } from '@mui/material'

const CardModal = () => {

  const { lists, setLists, modalOpened , setModalOpened, selectedCard, deleteCard, updateCard } = useKanban();
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (selectedCard) {
      setTitle(selectedCard.name);
      setDescription(selectedCard.body);
    }
  }, [selectedCard])

  const handleUpdateCard = async () => {
    try {
      const newLists = [...lists];
      const listInd = newLists.findIndex((listObject) => listObject._id === selectedCard.parentId);
      const listObject = newLists[listInd];
      const result = Array.from(listObject.cards);
      const cardInd = result.findIndex((cardObject) => cardObject._id === selectedCard._id);
      const cardObject = {...selectedCard, name: title, body: description};
      result[cardInd] = cardObject;

      const newListObject = {...listObject};
      newListObject.cards = result;
      newLists[listInd] = newListObject;

      setLists(
        [...newLists]
      );
      setTitle('');
      setDescription('');
      setModalOpened(false);
      await updateCard({
        variables: {
          cardId: selectedCard._id,
          newData: {
            name: title,
            body: description
          }
        }
      })
    } catch (err) {
      alert(err)
    }
  }

  const handleDeleteCard = async () => {
    try {
      // const deletedCard = deletedCardData.deleteCard;
      const newLists = [...lists];
      const listInd = newLists.findIndex((listObject) => listObject._id === selectedCard.parentId);
      const listObject = newLists[listInd];
      let result = Array.from(listObject.cards);
      result = result.filter((cardObject) => cardObject._id !== selectedCard._id);

      const newListObject = {...listObject};
      newListObject.cards = result;
      newLists[listInd] = newListObject;

      setLists(
        [...newLists]
      );
      setModalOpened(false)
      await deleteCard({
        variables: { cardId: selectedCard._id }
      })
    } catch (err) {
      alert(err)
    }
  }

  return (
    <Modal
      open={modalOpened}
      // footer={null}
      onOk={handleUpdateCard}
      onCancel={() => setModalOpened(false)}
      closable={false}
    >
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        width: '100%'
      }}>
        <IconButton variant='outlined' color='error' onClick={handleDeleteCard}>
          <DeleteOutlinedIcon />
        </IconButton>
      </div>
      <div>
        <Form
          labelCol={{
            span: 5,
          }}
          wrapperCol={{
            span: 16,
          }}
          layout="horizontal"
        >
          <Form.Item label='Title'>
            <Input
              placeholder='Untitled'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Item>
          <Form.Item label='Description'>
            <Input.TextArea 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Item>
        </Form>
      </div>
    </Modal>
  )
}

export default CardModal;