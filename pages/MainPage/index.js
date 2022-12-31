import { useRouter } from 'next/router'
import styled from 'styled-components';
import Board from '../../containers/Board';
import Start from '../../containers/Start';
import React, { useEffect, useState } from 'react';
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
import { getLayout } from '../../components/Layout/MainLayout'
import { GET_KANBANS_QUERY, GET_LISTS_QUERY } from "../../graphql/queries";
import { useQuery } from '@apollo/client';


const MainPage = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <>
      {/* <Breadcrumb
        style={{
          margin: '16px 0',
        }}
      >
        <Breadcrumb.Item>User</Breadcrumb.Item>
        <Breadcrumb.Item>Bill</Breadcrumb.Item>
      </Breadcrumb> */}
      <div
        style={{
          padding: 8,
          height: '100%',
          background: colorBgContainer,
        }}
      >
        {(false) ? <Start /> : <Board />}
      </div>
    </>
  );
}

MainPage.getLayout = getLayout;

export default MainPage;