import React, { useState } from 'react';
import { Container, CssBaseline } from '@mui/material';

import { UserSetupForm } from './UserSetupForm';
import { WorkoutScheduler } from './WorkoutScheduler';
import { GymMap } from './GymMap';

export const App = () => {
  const [userData, setUserData] = useState(null);

  const handleSetupComplete = (data) => {
    setUserData(data);
  };

  return (
    <Container maxWidth="sm">
      <CssBaseline />
      {!userData ? (
        <UserSetupForm onSetupComplete={handleSetupComplete} />
      ) : (
        <>
          <WorkoutScheduler sessionsPerWeek={userData.trainingPreferences.sessionsPerWeek} />
          {userData.trainingPreferences.location === 'gym' && <GymMap />}
        </>
      )}
    </Container>
  );
};
