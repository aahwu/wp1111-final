import Sidebar from "../Sider/Sidebar";
import { useKanban } from "../hooks/useKanban";
import React, { useState } from 'react';
import { Layout } from 'antd';
import {
  AppstoreOutlined,
  PlusCircleOutlined,
} from '@ant-design/icons';
import StarOutlinedIcon from '@mui/icons-material/StarOutlined'
import { useRouter } from 'next/router'

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const MainLayout = ({ children }) => {
  // console.log(data)

  // hook
  const { kanbans, lists, selectedKanbanId, setSelectedKanbanId, createKanban, writeClient } = useKanban();
  const [selectedItem, setSelectedItem] = useState('');
  const router = useRouter();

  // handle onclick of menu
  const handleOnClick = async ({ key }) => {
    if (key === 'addKanban') {
      await createKanban();
    } else {
      const realKey = key.split('-')[0]
      router.push(`/kanban/${realKey}`)
      const previousLists = lists ? [...lists] : [];
      writeClient(selectedKanbanId, previousLists)
      setSelectedKanbanId(realKey);
      setSelectedItem(key);
    }
  }

  const sidebarItem = {
    defaultUser: 'Unknown',
    items: [
      getItem('Add Kanban', 'addKanban', <PlusCircleOutlined />),
      getItem('Favorite', 'sub1', <StarOutlinedIcon />,
      kanbans ? kanbans.flatMap((kanban) => {
        if (!kanban.favorite) {
          return []
        }
        return [{ key: kanban._id + '-fav', label: (kanban.name) ? kanban.name : 'Untitled'}]
      }) : []
      ),
      getItem('Kanban', 'sub2', <AppstoreOutlined />, 
      kanbans ? kanbans.map((kanban) => ({
        key: kanban._id,
        label: (kanban.name) ? kanban.name : 'Untitled'
      })) : []
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
          selectedKeys={[selectedItem]}  
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

export const getLayout = (page) => <MainLayout>{page}</MainLayout>;