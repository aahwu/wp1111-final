import { getLayout } from '../../components/Layout/AuthLayout'
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import LogIn from './login';

const AuthPage = () => {

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <>
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
        <LogIn />
      </div>
    </>
  )
}

AuthPage.getLayout = getLayout;

export default AuthPage;