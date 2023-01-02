import { Breadcrumb, Layout, Menu, theme } from 'antd';
import Sidebar from "../Sider/Sidebar";
import { useKanban } from "../hooks/useKanban";
import React, { useEffect, useState } from 'react';
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
  DatabaseOutlined,
  AppstoreOutlined,
  PlusCircleOutlined,
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

const AuthLayout = ({ children }) => {

  // hook
  const { kanbans, setKanbans, selectedKanbanId, setSelectedKanbanId, createKanban } = useKanban();

  return (
    <Layout
      style={{
        minHeight: '100vh',
      }}
    >
      <Layout>
        {/* <Sidebar
          sidebarItem={sidebarItem}
          handleOnClick={handleOnClick} 
          selectedKeys={[selectedKanbanId]}  
        /> */}
        <Layout className="content-layout">
          <Layout.Content
            style={{
              margin: 16,
              height: '100%',
              display: 'flex',
            }}
          >
            {children}
          </Layout.Content>
          <Layout.Footer
            style={{
              textAlign: 'center',
            }}
          >
            Inarro ©2022 Created by aahwu
          </Layout.Footer>
        </Layout>
      </Layout>
    </Layout>
  )
}

// export async function getStaticProps() {

//   const client = getClient();
//   const { data } = await client.query({query: GET_KANBANS_QUERY});
//   console.log(data)
//   console.log(client.cache.extract())
//   // function getItem(label, key, icon, children) {
//   //   return {
//   //     key,
//   //     icon,
//   //     children,
//   //     label,
//   //   };
//   // }
//   // const categories = {
//   //   user: 'inarro',
//   //   items: [
//   //     getItem('Kanban', 'sub1', <AppstoreOutlined />, [
//   //       getItem('Tom', '3'),
//   //       getItem('Bill', '4'),
//   //       getItem('Alex', '5'),
//   //     ]),
//   //     getItem('Favorite', 'sub2', <HeartOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
//   //   ] 
//   // };
//   // console.log(categories)

//   return {
//     props: { 
//       data
//     },
//   };
// }

export const getLayout = (page) => <AuthLayout>{page}</AuthLayout>;