import Sidebar from "../Sider/Sidebar";
import { useKanban } from "../hooks/useKanban";
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
  PlusCircleOutlined,
  HeartOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { useQuery } from '@apollo/client';
import { GET_KANBANS_QUERY, GET_LISTS_QUERY } from "../../graphql/queries";
import { getClient } from '../../lib/getClient'
import { useRouter } from 'next/router'

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

  // hook
  const { token, kanbans, setKanbans, selectedKanbanId, setSelectedKanbanId, createKanban } = useKanban();
  const router = useRouter();

  const {
    loading, error, data: kanbansData, subscribeToMore,
  } = useQuery(GET_KANBANS_QUERY, {
      context: {
        headers: {
          authorization: token,
        }
      },
    }
  );

  useEffect(() => {
    if(kanbansData) {
      setKanbans(kanbansData.kanbans);
    }
  }, [kanbansData])

  // handle onclick of menu
  const handleOnClick = async ({ key }) => {
    if (key === 'addKanban') {
      await createKanban();
    } else {
      router.push(`/kanban/${key}`)
      setSelectedKanbanId(key);
    }
  }

  const sidebarItem = {
    defaultUser: 'Unknown',
    items: [
      getItem('Add Kanban', 'addKanban', <PlusCircleOutlined />),
      getItem('Kanban', 'sub1', <AppstoreOutlined />, 
      kanbans.map((kanban) => ({
        key: kanban._id,
        label: (kanban.name) ? kanban.name : 'Untitled'
      }))
      ),
    ] 
  };

  return (
    <Layout
      style={{
        minHeight: '100vh',
      }}
    >
      <Layout>
        <Sidebar
          sidebarItem={sidebarItem}
          handleOnClick={handleOnClick} 
          selectedKeys={[selectedKanbanId]}  
        />
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
            Inarro ©2022 Created by aahwu
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