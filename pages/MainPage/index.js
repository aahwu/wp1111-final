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
import { getLayout } from '../../components/Layout/MainLayout'
import DDWrapper from "../../components/DDContextWrapper";
import { GET_KANBANS_QUERY, GET_LISTS_QUERY } from "../../graphql/queries";


const MainPage = () => {
  
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  // graphql query
  const {
    loading, error, data: listsData, subscribeToMore,
  } = useQuery(GET_LISTS_QUERY, {
    variables: {
      input: "AAHLS"
    }
  });

  // hook
  const { kanban, setKanban, handleDelete } = useKanban();
  useEffect(() => {
    if(listsData) {
      const { lists } = listsData;
      setKanban(lists);
    }
  }, [listsData])

  // move element from startIndex to endIndex
  const reorder = (listObject, startIndex, endIndex) => {
    const result = Array.from(listObject.cards);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    const newListObject = {...listObject};
    newListObject.cards = result;
    
    return newListObject;
  };

  // move element across list
  const move = (sourceObject, destinationObject, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(sourceObject.cards);
    const destClone = Array.from(destinationObject.cards);
    const [removed] = sourceClone.splice(droppableSource.index, 1);
  
    destClone.splice(droppableDestination.index, 0, removed);
  
    const result = {};
    const newSourceObject = {...sourceObject};
    const newDestinationObject = {...destinationObject};
    newSourceObject.cards = sourceClone;
    newDestinationObject.cards = destClone;
    result[droppableSource.droppableId] = newSourceObject;
    result[droppableDestination.droppableId] = newDestinationObject;
  
    return result;
  };

  // onDragEnd function
  const onDragEnd = (result) => {
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
      return;
    }
    const sInd = +source.droppableId;
    const dInd = +destination.droppableId;

    if (sInd === dInd) {
      const items = reorder(kanban[sInd], source.index, destination.index);
      console.log(items)
      const newKanban = [...kanban];
      newKanban[sInd] = items;
      console.log(newKanban)
      setKanban(newKanban);
    } else {
      const result = move(kanban[sInd], kanban[dInd], source, destination);
      const newKanban = [...kanban];
      newKanban[sInd] = result[sInd];
      newKanban[dInd] = result[dInd];

      setKanban(newKanban);
    }
  }

  return (
    <>
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
        {loading ? <Loading /> : <DDWrapper kanban={kanban} onDragEnd={onDragEnd} handleDelete={handleDelete} />}
      </div>
    </>
  );
}

MainPage.getLayout = getLayout;

export default MainPage;