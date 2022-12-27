import styled from 'styled-components';
import KanbanPage from './KanbanPage';
import React, { useState } from 'react';
import { IconButton, Typography } from '@mui/material'
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
import { Breadcrumb, Layout, Menu, theme } from 'antd';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 500px;
  margin: auto;
`;

// const App = () => {

//   return (
//     <Wrapper>
//       <KanbanPage />
//     </Wrapper>
//   )
// }


const { Header, Content, Footer, Sider } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const items = [
  getItem('Kanban', 'sub1', <AppstoreOutlined />, [
    getItem('Tom', '3'),
    getItem('Bill', '4'),
    getItem('Alex', '5'),
  ]),
  getItem('Favorite', 'sub2', <HeartOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
];
const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout
      style={{
        minHeight: '100vh',
      }}
    >
      <Sider
        // collapsible
        // collapsed={collapsed}
        // onCollapse={(value) => setCollapsed(value)}
        style={{
          width: 250,
          minWidth: 250,
          
        }}  
      >
        <div
          style={{
            height: 32,
            margin: '0 8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
            // background: 'rgba(255, 255, 255, 0.2)',
          }}
        >
          {(collapsed) ? null : <Typography 
            style={{

            }}
          >
            Inarro
          </Typography>}
          <IconButton>
            <LogoutOutlined 
              style={{
                color: 'white',
                fontSize: 20,
              }}
            />
          </IconButton>
        </div>
        <Menu theme="dark" mode="inline" items={items} />
      </Sider>
      <Layout className="site-layout">
        {/* <Header
          style={{
            padding: 24,
            // background: colorBgContainer,
          }}
        /> */}
        <Content
          style={{
            margin: '0 16px',
          }}
        >
          <Breadcrumb
            style={{
              margin: '16px 0',
            }}
          >
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
          <div
            style={{
              padding: 24,
              minHeight: '90vh',
              background: colorBgContainer,
            }}
          >
            <KanbanPage />
          </div>
        </Content>
        {/* <Footer
          style={{
            textAlign: 'center',
          }}
        >
          Ant Design ©2018 Created by Ant UED
        </Footer> */}
      </Layout>
    </Layout>
  );
};

export default App;