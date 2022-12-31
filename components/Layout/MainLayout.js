import Sidebar from "../Sider/Sidebar";
import { useKanban } from "../../containers/hooks/useKanban";
import React, { useEffect, useState } from 'react';
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
import { useQuery } from '@apollo/client';
import { GET_KANBANS_QUERY, GET_LISTS_QUERY } from "../../graphql/queries";
import { getClient } from '../../lib/getClient'
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const MainLayout = ({ data, children }) => {
  // console.log(data)

  // graphql query
  const {
    loading, error, data: kanbansData, subscribeToMore,
  } = useQuery(GET_KANBANS_QUERY);

  // hook
  const { kanbans, setKanbans, selectedKanbanId, setSelectedKanbanId, handleOnClick } = useKanban();
  // const { kanbans, setKanbans, handleDelete } = useKanban();
  useEffect(() => {
    if(kanbansData) {
      // console.log(kanbansData.kanbans)
      setKanbans(kanbansData.kanbans);
      // setSelectedKanbanId(kanbansData.kanbans[0]._id)
      console.log()
    }
  }, [kanbansData])

  const sidebarItem = {
    user: 'inarro',
    items: [
      getItem('Kanban', 'sub1', <AppstoreOutlined />, 
      kanbans.map((kanban) => ({key: kanban._id, label: kanban.name}))
      ),
      getItem('Favorite', 'sub2', <HeartOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
    ] 
  };

  return (
    <Layout
      style={{
        minHeight: '100vh',
      }}
    >
      <Layout>
        <Sidebar sidebarItem={sidebarItem} selectedId={selectedKanbanId} handleOnClick={handleOnClick} />
          <Layout className="content-layout">
            <Layout.Content
              style={{
                margin: 16,
                height: '100%',
              }}
            >
              {children}
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
    </Layout>
  )
}

export async function getStaticProps() {

  const client = getClient();
  const { data } = await client.query({query: GET_KANBANS_QUERY});
  console.log(data)
  console.log(client.cache.extract())
  // function getItem(label, key, icon, children) {
  //   return {
  //     key,
  //     icon,
  //     children,
  //     label,
  //   };
  // }
  // const categories = {
  //   user: 'inarro',
  //   items: [
  //     getItem('Kanban', 'sub1', <AppstoreOutlined />, [
  //       getItem('Tom', '3'),
  //       getItem('Bill', '4'),
  //       getItem('Alex', '5'),
  //     ]),
  //     getItem('Favorite', 'sub2', <HeartOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
  //   ] 
  // };
  // console.log(categories)

  return {
    props: { 
      data
    },
  };
}

export const getLayout = (page) => <MainLayout>{page}</MainLayout>;