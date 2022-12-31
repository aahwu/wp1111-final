import { Input, Form, Modal } from 'antd';
import { useEffect, useState } from 'react';
import { useKanban } from './hooks/useKanban';
import styled from 'styled-components';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import { Backdrop, Fade, IconButton, Box, Typography, Divider } from '@mui/material'

const Wrapper = styled.div`
  outline: 'none',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '50%',
  bgcolor: 'background.paper',
  border: '0px solid #000',
  boxShadow: 24,
  p: 1,
  height: '80%'
`;

const CardModal = () => {

  const { modalOpened , setModalOpened, selectedCard, deleteCard, updateCard } = useKanban();
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
      console.log(selectedCard._id)
      console.log(title)
      await updateCard({
        variables: {
          cardId: selectedCard._id,
          newData: {
            name: title,
            body: description
          }
        }
      })
      setTitle('');
      setDescription('');
      setModalOpened(false);
    } catch (err) {
      alert(err)
    }
  }

  const handleDeleteCard = async () => {
    try {
      console.log(selectedCard._id)
      await deleteCard({
        variables: { cardId: selectedCard._id }
      })
      setModalOpened(false)
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
      {/* <Wrapper> */}
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
        <div
          // style={{
          //   display: 'flex',
          //   height: '100%',
          //   flexDirection: 'column',
          //   padding: '2rem 5rem 5rem'
          // }}
        >
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
      {/* </Wrapper> */}
    </Modal>
  )
}

export default CardModal;