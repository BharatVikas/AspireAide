  import React, { useState } from 'react';
  import { Form, Input, Button, Checkbox, notification } from 'antd';
  import { Link, useNavigate } from 'react-router-dom';
  import styled from 'styled-components';
  import axios from 'axios';
  import backgroundImage from './bg.jpg';

  const LoginContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #e0f7fa; 
    background: linear-gradient(135deg, rgba(255,0,0,1) 0%, rgba(255,0,255,1) 35%, rgba(128,0,128,1) 50%, rgba(0,0,255,1) 80%);
    padding: 20px;  
  `;

  const LoginForm = styled(Form)`
    max-width: 400px;
    width: 100%;
    padding: 30px;
    background: skyblue;
    border-radius: 16px;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
    transition: box-shadow 0.3s ease-in-out, transform 0.3s ease-in-out;

    &:hover {
      box-shadow: 0 12px 25px rgba(0, 0, 0, 0.3);
      transform: scale(1.02);
    }
  `;

  const CustomCheckbox = styled(Checkbox)`
    margin-left: 8px;
  `;

  const LoginButton = styled(Button)`
    position: relative;
    background-color: #0056b3; 
    border-color: #0056b3;
    color: #fff;
    font-weight: bold;
    overflow: hidden;

    &:hover {
      background-color: #004494; 
      border-color: #004494;
    }

    &::before {
      content: '';
      position: absolute;
      top: -5px;
      left: -5px;
      right: -5px;
      bottom: -5px;
      border: 2px solid #00ff00;
      border-radius: 16px;
      opacity: 0;
      transition: opacity 0.3s ease-in-out;
    }

    &:hover::before {
      opacity: 1;
    }
  `;

  const SignUpLink = styled(Link)`
    color: #0056b3; 
    &:hover {
      color: #003d7a; 
    }
  `;

  const BlockbusterText = styled.h2`
    text-align: center;
    color: #ffffff; 
    margin-bottom: 16px;
    font-size: 36px;
    font-family: 'Georgia', serif; 
    letter-spacing: 1px;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8), 0 0 20px rgba(0, 0, 0, 0.8);
  `;

  const StyledInput = styled(Input)`
    height: 48px;
  `;

  const StyledPasswordInput = styled(Input.Password)`
    height: 48px;
  `;

  const RoleButton = styled(Button)`
    margin: 5px;
    width: 48%;
  `;

  const EmailIcon = () => (
    <svg viewBox="64 64 896 896" focusable="false" data-icon="mail" width="1em" height="1em" fill="currentColor" aria-hidden="true">
      <path d="M928 160H96c-17.7 0-32 14.3-32 32v640c0 17.7 14.3 32 32 32h832c17.7 0 32-14.3 32-32V192c0-17.7-14.3-32-32-32zm-40 110.8V792H136V270.8l-27.6-21.5 39.3-50.5 42.8 33.3h643.1l42.8-33.3 39.3 50.5-27.7 21.5zM833.6 232L512 482 190.4 232l-42.8-33.3-39.3 50.5 27.6 21.5 341.6 265.6a55.99 55.99 0 0068.7 0L888 270.8l27.6-21.5-39.3-50.5-42.7 33.2z"></path>
    </svg>
  );

  const LockIcon = () => (
    <svg viewBox="64 64 896 896" focusable="false" data-icon="lock" width="1em" height="1em" fill="currentColor" aria-hidden="true">
      <path d="M832 464h-68V240c0-70.7-57.3-128-128-128H388c-70.7 0-128 57.3-128 128v224h-68c-17.7 0-32 14.3-32 32v384c0 17.7 14.3 32 32 32h640c17.7 0 32-14.3 32-32V496c0-17.7-14.3-32-32-32zM332 240c0-30.9 25.1-56 56-56h248c30.9 0 56 25.1 56 56v224H332V240zm460 600H232V536h560v304zM484 701v53c0 4.4 3.6 8 8 8h40c4.4 0 8-3.6 8-8v-53a48.01 48.01 0 10-56 0z"></path>
    </svg>
  );

  const Login = () => {
    const navigate = useNavigate();
    const [role, setRole] = useState('student'); // Default role is student

    const openNotification = (type, message) => {
      notification[type]({
        message: 'Login Attempt',
        description: message,
        placement: 'top',
        duration: 3,
      });
    };

    const onFinish = async (values) => {
      const apiUrl = role === 'admin' ? 'http://localhost:8091/api/admin/login' : 'http://localhost:8091/api/student/login';
      try {
        const response = await axios.post(apiUrl, values, { withCredentials: true });
        console.log(response);
        navigate('/home');
        openNotification('success', `You have successfully logged in as ${role}!`);
      } catch (error) {
        console.error('Login failed:', error.message);
        if (error.response) {
          console.log(error.response.data);
          openNotification('error', 'Invalid credentials. Please try again.');
        } else {
          openNotification('error', 'Login failed. Please try again later.');
        }
      }
    };

    return (
      <LoginContainer>
        <LoginForm
          name="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <BlockbusterText>Login to AspireAide</BlockbusterText>

          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
            <RoleButton onClick={() => setRole('student')} type={role === 'student' ? 'primary' : 'default'}>
              Student
            </RoleButton>
            <RoleButton onClick={() => setRole('admin')} type={role === 'admin' ? 'primary' : 'default'}>
              Admin
            </RoleButton>
          </div>

          <Form.Item
            name="email"
            rules={[{ required: true, message: 'Please input your email!' }]}
          >
            <StyledInput
              prefix={<EmailIcon />} 
              placeholder="Email"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <StyledPasswordInput
              prefix={<LockIcon />} 
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <CustomCheckbox>Remember me</CustomCheckbox>
            </Form.Item>
          </Form.Item>
          <Form.Item>
            <LoginButton type="primary" htmlType="submit" block>
              Log In
            </LoginButton>
          </Form.Item>
          <Form.Item>
            <p>
              Don't have an account? <SignUpLink to="/signup">Click here to sign up</SignUpLink>
            </p>
          </Form.Item>
        </LoginForm>
      </LoginContainer>
    );
  };

  export default Login;
