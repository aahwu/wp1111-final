import Sidebar from "../Sider/Sidebar";
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

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const MainLayout = ({ children }) => {
  const sidebarItem = {
    user: 'inarro',
    items: [
      getItem('Kanban', 'sub1', <AppstoreOutlined />, [
        getItem('Tom', '3'),
        getItem('Bill', '4'),
        getItem('Alex', '5'),
      ]),
      getItem('Favorite', 'sub2', <HeartOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
    ] 
  };

  return (
    <Layout
      style={{
        minHeight: '100vh',
      }}
    >
      <Sidebar sidebarItem={sidebarItem} />
        <Layout className="content-layout">
          <Layout.Content
            style={{
              margin: '0 16px',
            }}
          >
            <main>{children}</main>
          </Layout.Content>
          <Layout.Footer
            style={{
              textAlign: 'center',
            }}
          >
            Ant Design ©2018 Created by Ant UED
          </Layout.Footer>
        </Layout>
    </Layout>
  )
}

export const getLayout = (page) => <MainLayout>{page}</MainLayout>;