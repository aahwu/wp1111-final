import { Layout } from 'antd';
import { useKanban } from "../hooks/useKanban";

const AuthLayout = ({ children }) => {

  return (
    <Layout
      style={{
        minHeight: '100vh',
      }}
    >
      <Layout>
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

export const getLayout = (page) => <AuthLayout>{page}</AuthLayout>;