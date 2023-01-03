import { IconButton, Typography } from '@mui/material'
import { Layout, Menu } from 'antd';
import {
  LogoutOutlined,
} from '@ant-design/icons';
import { useKanban } from '../hooks/useKanban';
import { useRouter } from 'next/router';

const Sidebar = ({ sidebarItem, handleOnClick, selectedKeys }) => {

  const router = useRouter();
  const { 
    username,
    setUsername,
    setToken,
    setSelectedKanbanId,
    setKanbans,
    setLists,
    setSelectedCard,
    setModalOpened,
    setLogin,
  } = useKanban();

  const handleLogout = () => {
    setUsername('');
    setToken('');
    setSelectedKanbanId('');
    setKanbans([]);
    setLists([]);
    setSelectedCard({});
    setModalOpened(false);
    setLogin(false);
    router.push('/auth/login')
  }

  return (
    <Layout.Sider>
      <div
        style={{
          height: 32,
          margin: '16px 8px 8px 8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <Typography style={{
          color: 'white',
          padding: '0 0 0 20px',
          fontSize: '20px'
        }}>
          {username ? username : sidebarItem.defaultUser}
        </Typography>
        <IconButton
          onClick={handleLogout}
        >
          <LogoutOutlined 
            style={{
              color: 'white',
              fontSize: 20,
            }}
          />
        </IconButton>
      </div>
      <Menu
        theme="dark"
        style={{
          height: '100%',
        }}
        mode="inline"
        items={sidebarItem.items}
        defaultOpenKeys={['sub2']}
        onClick={handleOnClick}
        selectedKeys={selectedKeys}
      />
    </Layout.Sider>
  )
}

export default Sidebar;