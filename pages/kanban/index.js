import Board from '../../containers/Board';
import Start from '../../containers/Start';
import React, { useEffect, useState } from 'react';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { getLayout } from '../../components/Layout/MainLayout'
import { useKanban } from '../../containers/hooks/useKanban';


const kanban = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <>
      <div
        style={{
          padding: 8,
          height: '100%',
          background: colorBgContainer,
        }}
      >
        <Start />
      </div>
    </>
  );
}

kanban.getLayout = getLayout;

export default kanban;