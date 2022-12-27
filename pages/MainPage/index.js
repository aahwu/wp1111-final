import { useRouter } from 'next/router'
import styled from 'styled-components';
import KanbanPage from '../../containers/KanbanPage';
import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { IconButton, Typography } from '@mui/material'
import { useKanban } from '../../containers/hooks/useKanban';
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
import Loading from '../../components/Loading'
// import dbConnect from '../../lib/dbConnect';
// import KanbanModel from "../../models/KanbanModel"
// import DroppableListModel from "../../models/DroppableListModel"
// import DraggableCardModel from "../../models/DraggableCardModel"

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

const MainPage = () => {
  
  const [collapsed, setCollapsed] = useState(false);
  const { setKanban, handleDelete } = useKanban();
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const {
    loading, error, data: listsData, subscribeToMore,
  } = useQuery(GET_LISTS_QUERY, {
    variables: {
      input: "AAHLS"
    }
  });
  useEffect(() => {
    if(listsData) {
      console.log(listsData)
    }
  }, [listsData])
  // useEffect(() => {
  //   if (kanbans) {
  //     console.log(kanbans)
  //     // setKanban(kanbans[0]);
  //   }
  // }, [kanbans])
  if (loading) {
    return (
      <Loading />
    )
  }
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
            margin: 8,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
            // background: 'rgba(255, 255, 255, 0.2)',
          }}
        >
          {(collapsed) ? null : <Typography 
            style={{
              color: 'white',
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
}


// export async function getStaticProps() {
//   await dbConnect()
  
//   /* find all the data in our database */
//   // const kanbanDoc = await KanbanModel.find({});
//   // const kanbans = await kanbanDoc.map(async (doc) => {
//   //   const listDoc = await doc.populate({ path: 'DroppableList', model: DroppableListModel });
//   //   // console.log(listDoc)
//   //   const kanban = doc.toObject();
//   //   kanban._id = kanban._id.toString();
//   //   return {_id: kanban._id, name: kanban.name }

//   // })
//   // console.log(kanbans)
//   let dev = process.env.NODE_ENV !== 'production';
//   let { DEV_URL, PROD_URL } = process.env;
//   let res = await fetch(`${dev ? DEV_URL : PROD_URL}/api/graphql`)
//   // console.log(res)
//   let data = await res.json();
//   // console.log(data.payload[0].DroppableList)
//   if (data) {
//     return {
//       props: {
//         kanbans: data
//       }
//     }
//   } else {
//     console.log("Something wrong: " + data.payload)
//     return {
//       props: {
//         kanbans: data
//       }
//     }
//   }
  
// }

export default MainPage;