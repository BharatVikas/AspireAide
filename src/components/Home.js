import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Layout, Menu, notification, Avatar, Dropdown, Button } from 'antd';
import { HomeOutlined, LogoutOutlined, FormOutlined, InfoCircleOutlined, PhoneOutlined, UserOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import backgroundImage from './bg1.jpg';

const { Header } = Layout;

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 64px); // Adjusting height for the navbar
  background-color: #f5f5f5;
  background: url(${backgroundImage}) no-repeat center center;
  background-size: cover;
  padding: 20px;
`;

const Title = styled.h1`
  color: #8b4513;
  font-size: 48px;
  margin-bottom: 20px;
`;

const Description = styled.p`
  font-size: 20px;
  color: #333;
  text-align: center;
  margin-bottom: 30px;
`;

const HomeButton = styled(Button)`
  background-color: #8b4513;
  border-color: #8b4513;
  color: #fff;

  &:hover {
    background-color: #a0522d;
    border-color: #a0522d;
  }
`;

const ExploreButton = styled(Button)`
  margin-top: 20px;
  background-color: #4caf50;
  border-color: #4caf50;
  color: #fff;

  &:hover {
    background-color: #45a049;
    border-color: #45a049;
  }
`;

const RssIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" height="16" viewBox="0 0 24 24" width="16" fill="#1890ff">
    <path d="M0 0h24v24H0z" fill="none" />
    <path d="M4 11a9 9 0 0 1 9 9" />
    <path d="M4 4a16 16 0 0 1 16 16" />
    <circle cx="5" cy="19" r="1" />
  </svg>
);

const NavBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(true);

  const handleLogout = async () => {
    try {
      document.cookie = 'sessionID=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      setLoggedIn(false);
      notification.success({
        message: 'Logout Successful',
        description: 'You have been successfully logged out.',
      });
      navigate('/login');
    } catch (error) {
      notification.error({
        message: 'Logout Failed',
        description: 'An error occurred during logout. Please try again.',
      });
    }
  };

  const menuItems = [
    { key: 'home', icon: <HomeOutlined style={{ color: '#fff' }} />, to: '/home', label: 'Home' },
    { key: 'about', icon: <InfoCircleOutlined style={{ color: '#ff7a45' }} />, to: '/about', label: 'About Us' },
    { key: 'contact', icon: <PhoneOutlined style={{ color: '#00bcd4' }} />, to: '/contact', label: 'Contact' },
  ];

  const avatarMenu = (
    <Menu>
      <Menu.Item key="profile" icon={<UserOutlined />} onClick={() => navigate('/profile')}>
        Profile
      </Menu.Item>
      <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={handleLogout}>
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <Header style={{ backgroundColor: '#001529', padding: '10px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 4px 6px -6px #222' }}>
      <div style={{ color: 'white', fontSize: '3.4em', fontWeight: 'bold', fontStyle: 'cursive', fontFamily: 'Brush Script MT, Brush Script Std, cursive', textShadow: '0 0 10px rgba(255, 255, 255, 0.8), 0 0 20px rgba(255, 255, 255, 0.8)' }}>
        AspireAide
      </div>
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={['home']}
        selectedKeys={[location.pathname]}
        style={{ lineHeight: '64px', textShadow: '0 0 10px rgba(255, 255, 255, 0.8), 0 0 20px rgba(255, 255, 255, 0.8)' }}
      >
        {menuItems.map((menuItem) => (
          <Menu.Item key={menuItem.key} icon={menuItem.icon}>
            <Link to={menuItem.to} style={{ color: 'white', textDecoration: 'none', cursor: 'pointer' }}>
              {menuItem.label}
            </Link>
          </Menu.Item>
        ))}
      </Menu>
      {loggedIn && (
        <Dropdown overlay={avatarMenu} placement="bottomRight" arrow>
          <Avatar icon={<UserOutlined />} style={{ backgroundColor: '#1890ff' }} />
        </Dropdown>
      )}
    </Header>
  );
};

const Home = () => {
  const navigate = useNavigate();

  const exploreScholarships = () => {
    navigate('/scholarships'); // Redirect to the Explore Scholarships page
  };

  return (
    <>
      <NavBar /> {/* Include the NavBar */}
      <HomeContainer>
        <Title>Welcome to the Scholarship Management System</Title>
        <Description>
          Here you can manage your scholarships, applications, and more.
        </Description>
        <ExploreButton onClick={exploreScholarships}>Explore Scholarships</ExploreButton>
      </HomeContainer>
    </>
  );
};

export default Home;
