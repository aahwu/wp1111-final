import Board from '../../components/Common/Board';
import { theme } from 'antd';
import { getLayout } from '../../components/Layout/MainLayout'
import { useKanban } from '../../components/hooks/useKanban';
import Head from 'next/head';

const kanban = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const { username } = useKanban();
  return (
    <>
      <Head>
        <title>{`${username}'s kanban - Inarro`}</title>
        <meta
          name="description"
          content="Meta description for the kanban page"
        />
      </Head>
      <div
        style={{
          padding: 8,
          height: '100%',
          background: colorBgContainer,
        }}
      >
        <Board />
      </div>
    </>
  );
}

kanban.getLayout = getLayout;

export default kanban;