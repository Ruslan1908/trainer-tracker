import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import { styled } from 'styled-components';

import { ROUTES } from './routes';
import { UserSetupForm } from './UserSetupForm';
import { WorkoutScheduler } from './WorkoutScheduler';
import { Weather } from './Weather';
import { Header } from './HeaderComponent'; 

export function App() {
  const [setupComplete, setSetupComplete] = useState(false);

  const handleSetupComplete = () => {
    setSetupComplete(true);
  };

  return (
    <Router>
      <div>
        <Header />
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', paddingTop: '20px' }}>
          <Routes>
            <Route
              path={ROUTES.HOME}
              element={
                !setupComplete ? (
                  <UserSetupForm onSetupComplete={handleSetupComplete} />
                ) : (
                  <WorkoutScheduler />
                )
              }
            />
            <Route path={ROUTES.Weather} element={<Weather />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}
