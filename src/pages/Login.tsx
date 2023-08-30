import React, { useState } from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, message } from 'antd';
import { fetcher, METHOD } from '../fetcher';
import { login } from '../endpoints';
import { Navigate, useNavigate } from 'react-router-dom';

type Props = {};

const Login = (props: Props) => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const onSubmitLogin = async (values: any) => {
    const response = await fetcher(login, METHOD.POST, {
      body: { username: values.username, password: values.password },
      credentials: false,
    });

    if (response?.token) {
      localStorage.setItem('token', response.token);
      localStorage.setItem('username', values.username);
      navigate('/', { replace: true });
    } else {
      message.error(response.message);
    }
  };

  if (token) {
    return <Navigate to={'/'} replace />;
  }

  return (
    <section>
      <h1 className='text-3xl font-bold mb-4'>Neversitup Todo List</h1>
      <Form
        name='normal_login'
        className='login-form'
        initialValues={{ remember: true }}
        onFinish={onSubmitLogin}
      >
        <Form.Item
          name='username'
          rules={[{ required: true, message: 'Please input your Username!' }]}
        >
          <Input
            prefix={<UserOutlined className='site-form-item-icon' />}
            placeholder='Username'
          />
        </Form.Item>
        <Form.Item
          name='password'
          rules={[{ required: true, message: 'Please input your Password!' }]}
        >
          <Input
            prefix={<LockOutlined className='site-form-item-icon' />}
            type='password'
            placeholder='Password'
          />
        </Form.Item>

        <Form.Item>
          <Button className='w-full' type='primary' htmlType='submit'>
            Log in
          </Button>
        </Form.Item>
      </Form>
    </section>
  );
};

export default Login;
