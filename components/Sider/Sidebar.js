import { IconButton, Typography } from '@mui/material'
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
  DatabaseOutlined,
  AppstoreOutlined,
  HeartOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { use, useState } from 'react';
import { useKanban } from '../hooks/useKanban';
import { useRouter } from 'next/router';

const Sidebar = ({ sidebarItem, handleOnClick, selectedKeys }) => {

  const router = useRouter();
  const { username, setLogin, setToken } = useKanban();

  return (
    <Layout.Sider>
      <div
        style={{
          height: 32,
          margin: 8,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
          // background: 'rgba(255, 255, 255, 0.2)',
        }}
      >
        <Typography style={{
          color: 'white',
        }}>
          {username ? username : sidebarItem.defaultUser}
        </Typography>
        <IconButton
          onClick={() => {
            setLogin(false);
            setToken('');
            router.push('/auth/login')
          }}
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
        defaultOpenKeys={['sub1']}
        onClick={handleOnClick}
        selectedKeys={selectedKeys}
      />
    </Layout.Sider>
  )
}

export default Sidebar;