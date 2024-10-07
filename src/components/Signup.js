import React, { useState } from 'react';
import { Form, Input, Button, notification, Radio } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';


const SignupContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #e3f2fd;
  background: linear-gradient(to bottom right, #ff6666, #6666ff);
  padding: 20px;
`;

const SignupForm = styled(Form)`
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

const StyledInput = styled(Input)`
  height: 48px;
`;

const StyledPasswordInput = styled(Input.Password)`
  height: 48px;
`;

const SignupButton = styled(Button)`
  width: 100%;
  background-color: #0056b3;
  border-color: #0056b3;
  color: #fff;
  font-weight: bold;
  overflow: hidden;
  position: relative;

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

const Signup = () => {
  const [role, setRole] = useState('student');
  const [showOtp, setShowOtp] = useState(false);
  const [otp, setOtp] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const openNotification = (type, message) => {
    notification[type]({
      message: 'Signup Attempt',
      description: message,
      placement: 'top',
      duration: 3,
    });
  };

  const onRoleChange = (e) => {
    setRole(e.target.value);
  };

  const onFinish = async (values) => {
    try {
      const signupEndpoint = role === 'admin' ? 'http://localhost:8091/api/admin/signup' : 'http://localhost:8091/api/student/signup';
      const response = await axios.post(signupEndpoint, values);
      setEmail(values.email);
      setShowOtp(true);
      openNotification('success', 'OTP sent to your email! Please verify.');
    } catch (error) {
      console.error('Signup failed:', error.message);
      if (error.response) {
        if (error.response.status === 409) {
          openNotification('error', 'Email already exists. Please try another email.');
        } else {
          openNotification('error', error.response.data.message);
        }
      } else {
        openNotification('error', 'Signup failed. Please try again later.');
      }
    }
  };
  
  const verifyOtp = async () => {
    try {
      const response = await axios.post('http://localhost:8091/api/signup/verify', null, {
        params: { email: email, otp: parseInt(otp) },
      });
      openNotification('success', response.data.message);
      navigate('/login');
    } catch (error) {
      console.error('OTP verification failed:', error.message);
      if (error.response) {
        openNotification('error', error.response.data.message);
      } else {
        openNotification('error', 'OTP verification failed. Please try again later.');
      }
    }
  };

  return (
    <SignupContainer>
      {!showOtp ? (
        <SignupForm name="signup-form" onFinish={onFinish}>
          <BlockbusterText>Signup to AspireAide</BlockbusterText>

          <Form.Item
            name="role"
            rules={[{ required: true, message: 'Please select a role!' }]}
          >
            <Radio.Group onChange={onRoleChange} value={role}>
              <Radio value="student">Student</Radio>
              <Radio value="admin">Admin</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item
            name="name"
            rules={[{ required: true, message: 'Please input your name!' }]}
          >
            <StyledInput prefix={<UserOutlined />} placeholder="Name" />
          </Form.Item>

          <Form.Item
            name="email"
            rules={[{ required: true, type: 'email', message: 'Please input a valid email!' }]}
          >
            <StyledInput prefix={<MailOutlined />} placeholder="Email" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <StyledPasswordInput prefix={<LockOutlined />} placeholder="Password" />
          </Form.Item>

          <Form.Item>
            <SignupButton type="primary" htmlType="submit">
              Sign Up
            </SignupButton>
          </Form.Item>

          <Form.Item>
            <p>
              Already have an account? <SignUpLink to="/login">Click here to log in</SignUpLink>
            </p>
          </Form.Item>
        </SignupForm>
      ) : (
        <SignupForm name="otp-form">
          <BlockbusterText>Verify Your OTP</BlockbusterText>
          <Form.Item
            name="otp"
            rules={[{ required: true, message: 'Please input your OTP!' }]}
          >
            <StyledInput 
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
            />
          </Form.Item>
          <Form.Item>
            <SignupButton type="primary" onClick={verifyOtp}>
              Verify OTP
            </SignupButton>
          </Form.Item>
        </SignupForm>
      )}
    </SignupContainer>
  );
};

export default Signup;
