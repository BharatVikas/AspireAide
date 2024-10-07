import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

const Background = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: black;
`;

const letterAppear = keyframes`
  0% {
    opacity: 0;
    transform: translateY(10px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

const shineEffect = keyframes`
  0% {
    text-shadow: 0 0 5px rgba(255, 255, 255, 0.5), 0 0 10px rgba(255, 255, 255, 0.5), 0 0 15px rgba(255, 255, 255, 0.5);
  }
  50% {
    text-shadow: 0 0 20px rgba(255, 255, 255, 1), 0 0 30px rgba(255, 255, 255, 1), 0 0 40px rgba(255, 255, 255, 1);
  }
  100% {
    text-shadow: 0 0 5px rgba(255, 255, 255, 0.5), 0 0 10px rgba(255, 255, 255, 0.5), 0 0 15px rgba(255, 255, 255, 0.5);
  }
`;

const StyledText = styled.h1`
  font-family: 'Lucida Handwriting', cursive;
  font-size: 80px;
  color: white;
  letter-spacing: 3px;
  display: inline-block;
  animation: ${shineEffect} 1.5s infinite; /* Shine effect animation */
`;

const Letter = styled.span`
  display: inline-block;
  opacity: 0;
  animation: ${letterAppear} 0.1s ease-in-out forwards; /* Faster appearance */
  animation-delay: ${({ delay }) => delay * 0.1}s; /* Fast delay between letters */
`;

const WelcomeScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/login'); // Redirect to the login page after animation
    }, 4000); // Adjusted time for how long to display the welcome message

    return () => clearTimeout(timer); // Cleanup timeout on component unmount
  }, [navigate]);

  const welcomeText = "Welcome to AspireAide";

  return (
    <Background>
      <StyledText>
        {welcomeText.split('').map((letter, index) => (
          <Letter key={index} delay={index}>
            {letter === ' ' ? '\u00A0' : letter} {/* Handle spaces */}
          </Letter>
        ))}
      </StyledText>
    </Background>
  );
};

export default WelcomeScreen;
