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
import { useState } from 'react';

const Sidebar = ({ sidebarItem, selectedId, handleOnClick }) => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Layout.Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
    >
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
          {sidebarItem.user}
        </Typography>
        <IconButton>
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
      />
    </Layout.Sider>
  )
}

export default Sidebar;