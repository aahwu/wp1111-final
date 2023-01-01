import Board from '../../containers/Board';
import Start from '../../containers/Start';
import React, { useEffect, useState } from 'react';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { getLayout } from '../../components/Layout/MainLayout'
import { useKanban } from '../../containers/hooks/useKanban';


const MainPage = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const { selectedKanbanId, kanbans } = useKanban();

  return (
    <>
      <div
        style={{
          padding: 8,
          height: '100%',
          background: colorBgContainer,
        }}
      >
        {(selectedKanbanId === '') ? <Start /> : <Board />}
      </div>
    </>
  );
}

MainPage.getLayout = getLayout;

export default MainPage;