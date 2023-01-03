import React from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import { useKanban } from '../hooks/useKanban';
import { useState } from 'react';
import Link from 'next/link'

const RegisterForm = () => {

  const { createUser, displayStatus } = useKanban();
  const [loading, setLoading] = useState(false);
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [checkPassword, setCheckPassword] = useState('');
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    setLoading(true);
    if (newPassword !== checkPassword) {
      displayStatus({
        type: 'error',
        msg: 'Password doesn\'t match, please check your password.'
      })
    } else {
      await createUser({
        variables: {
          username: newUsername,
          password: newPassword,
        }
      })
    }
    form.resetFields(['password', 'checkPassword']);
    setNewPassword('');
    setCheckPassword('');
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
            message: 'Please create your Username!',
          },
        ]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Create a Username" 
          value={newUsername}
          onChange={((e) => (setNewUsername(e.target.value)))}
        />
      </Form.Item>
      
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: 'Please create your Password!',
          },
        ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Create a Password"
          value={newPassword}
          onChange={((e) => (setNewPassword(e.target.value)))}
        />
      </Form.Item>
      <Form.Item
        name="checkPassword"
        rules={[
          {
            required: true,
            message: 'Please reenter your Password!',
          },
        ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Reenter the Password"
          value={checkPassword}
          onChange={((e) => (setCheckPassword(e.target.value)))}
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
          Register
        </Button>
        or
        <Link href="/auth/login" style={{marginLeft: '16px'}}>Log in</Link>
      </div>
    </Form>
  );
};
export default RegisterForm;