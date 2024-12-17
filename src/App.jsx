import { useState } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import { styled } from 'styled-components';

import { UserSetupForm } from './UserSetupForm';
import { WorkoutScheduler } from './WorkoutScheduler';
import { Weather } from './Weather';  
import { Layout } from './Layout';

const Header = styled.header`
  position: fixed;
  top: 0;
  width: 100%;
  background-color: #4682b4;
  color: white;
  padding: 10px 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const Nav = styled.nav`
  display: flex;
  gap: 20px;
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-size: 18px;

  &:hover {
    text-decoration: underline;
  }
`;

const MainContent = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding-top: 60px;  
`;

const WeatherWithLayout = () => (
  <Layout>
    <Weather />
  </Layout>
);

export const App = () => {
  const [setupComplete, setSetupComplete] = useState(false);

  const handleSetupComplete = () => {
    setSetupComplete(true);
  };

  return (
    <Router>
      <div>
        <Header>
          <Nav>
            <NavLink to="/">Домой</NavLink>
            <NavLink to="/weather">Погода</NavLink>
          </Nav>
        </Header>
        <MainContent>
          <Routes>
            <Route path="/" element={!setupComplete ? <UserSetupForm onSetupComplete={handleSetupComplete} /> : <WorkoutScheduler />} />
            <Route path="/weather" element={<WeatherWithLayout />} />
          </Routes>
        </MainContent>
      </div>
    </Router>
  );
};
