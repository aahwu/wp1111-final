import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import { useKanban } from '../hooks/useKanban';
import Link from 'next/link'
import { useState } from 'react';

const LogInForm = () => {

  const { loginUser } = useKanban();
  const [loading, setLoading] = useState(false);
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    setLoading(true);
    await loginUser({
      variables: {
        username: loginUsername,
        password: loginPassword,
      }
    });
    form.resetFields(['password']);
    setLoginPassword('');
    setLoading(false);
  };
  return (
    <Form
      name="normal_login"
      form={form}
      className="login-form"
      onFinish={onFinish}
      style={{
        width: '400px',
        height: '300px',
        maxWidth: '80%',

      }}
    >
      <Form.Item
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input your Username!',
          },
        ]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Username"
          value={loginUsername}
          onChange={((e) => (setLoginUsername(e.target.value)))}
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your Password!',
          },
        ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
          value={loginPassword}
          onChange={((e) => (setLoginPassword(e.target.value)))}
        />
      </Form.Item>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Button
          type="primary"
          htmlType="submit"
          className="login-form-button"
          loading={loading}
          style={{marginRight: '16px'}}
        >
          Log in
        </Button>
        or
        <Link href="/auth/register" style={{marginLeft: '16px'}}>Register</Link>
      </div>
    </Form>
  );
};
export default LogInForm;