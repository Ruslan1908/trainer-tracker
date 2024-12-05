import { useState } from 'react'; 
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import { styled } from 'styled-components';

import { UserSetupForm } from './UserSetupForm';
import { WorkoutScheduler } from './WorkoutScheduler';
import { Weather } from './Weather';  

const Header = styled.header`
  position: fixed;
  top: 0;
  width: 100%;
  z-index: var(--z-header);

  display: flex;
  justify-content: center;
  align-items: center;

  padding: 10px 20px;
  background-color: #4682b4;
  color: white;
`;

const Nav = styled.nav`
  display: flex;
  gap: 20px;
`;

const NavLink = styled(Link)`
  color: white;
  font-size: 18px;
  text-decoration: none;

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

const Dialog = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: var(--z-dialog);

  padding: 20px;
  background-color: white;
  border: 1px solid #ccc;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const Tooltip = styled.div`
  position: absolute;
  z-index: var(--z-tooltip);

  padding: 5px 10px;
  background-color: #333;
  color: white;
  border-radius: 3px;
  font-size: 12px;

  top: -35px; /* Расположение подсказки */
  left: 50%;
  transform: translateX(-50%);
  white-space: nowrap;
`;

const ButtonWrapper = styled.div`
  position: relative; /* Чтобы подсказка была внутри этого контейнера */
  display: inline-block;
`;

export const App = () => {
  const [setupComplete, setSetupComplete] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);

  const handleSetupComplete = () => {
    setSetupComplete(true);
  };

  const toggleDialog = () => {
    setIsDialogOpen((prev) => !prev);
  };

  const toggleTooltip = () => {
    setIsTooltipVisible((prev) => !prev);
  };

  return (
    <Router>
      <div>
        <Header>
          <Nav>
            <NavLink to="/">Домой</NavLink>
            <NavLink to="/weather">Погода</NavLink>
            <ButtonWrapper
              onMouseEnter={toggleTooltip}
              onMouseLeave={toggleTooltip}
            >
              <button 
                onClick={toggleDialog} 
                style={{
                  background: 'transparent', 
                  color: 'white', 
                  border: 'none', 
                  cursor: 'pointer'
                }}
              >
                Открыть Диалог
              </button>
              {isTooltipVisible && <Tooltip>Нажмите, чтобы открыть модальное окно</Tooltip>}
            </ButtonWrapper>
          </Nav>
        </Header>
        <MainContent>
          <Routes>
            <Route 
              path="/" 
              element={
                !setupComplete 
                  ? <UserSetupForm onSetupComplete={handleSetupComplete} /> 
                  : <WorkoutScheduler />
              } 
            />
            <Route path="/weather" element={<Weather />} />
          </Routes>
        </MainContent>
        {isDialogOpen && (
          <Dialog>
            <h2>Это модальное окно</h2>
            <p>Здесь можно отобразить дополнительную информацию.</p>
            <button onClick={toggleDialog}>Закрыть</button>
          </Dialog>
        )}
      </div>
    </Router>
  );
};
