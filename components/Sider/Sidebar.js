import { IconButton, Typography } from '@mui/material'
import { Layout, Menu, Tooltip } from 'antd';
import {
  LogoutOutlined,
} from '@ant-design/icons';
import { useKanban } from '../hooks/useKanban';
import { useRouter } from 'next/router';
import { useState } from 'react';

const Sidebar = ({ sidebarItem, handleOnClick, selectedKeys }) => {

  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
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
    <Layout.Sider
      collapsible 
      collapsed={collapsed} 
      onCollapse={(value) => setCollapsed(value)}
    >
      {collapsed ? <></> : <div
        style={{
          height: 32,
          margin: '16px 8px 8px 8px',
          display: 'flex',
          alignItems: 'flex-end',
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
        <Tooltip placement="rightBottom" title="Log out">
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
        </Tooltip>
      </div>}
      <Menu
        theme="dark"
        style={{
          height: '100%',
        }}
        mode="inline"
        items={sidebarItem.items}
        defaultOpenKeys={sidebarItem.items[1].children.length === 0 ? ['sub2'] : ['sub1']}
        onClick={handleOnClick}
        selectedKeys={selectedKeys}
      />
    </Layout.Sider>
  )
}

export default Sidebar;