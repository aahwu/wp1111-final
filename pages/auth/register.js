import { getLayout } from '../../components/Layout/AuthLayout'
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import RegisterForm from '../../components/Common/RegisterForm'
import Head from 'next/head';

const login = () => {

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <>
      <Head>
        <title>Register - Inarro</title>
        <meta
          name="description"
          content="Meta description for the register page"
        />
      </Head>
      <div
        style={{
          padding: 8,
          width: '100%',
          background: colorBgContainer,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            color: 'black',
            marginBottom: '24px',
            fontSize: '40px',
            maxWidth: '80%',
          }}
        >
          Welcome to Inarro!
        </div>
        <RegisterForm />
      </div>
    </>
  )
}

login.getLayout = getLayout;

export default login;