import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { Layout } from './components/Layout';
import { ROUTES } from './routes';
import { UserSetupForm } from './components/UserSetupForm';
import { WorkoutScheduler } from './components/WorkoutScheduler';
import { Weather } from './components/Weather';

const Page1 = () => (
  <Layout>
    <UserSetupForm onSetupComplete={() => {}} />
  </Layout>
);

const Page2 = () => (
  <Layout>
    <WorkoutScheduler />
  </Layout>
);

const WeatherPage = () => (
  <div>
    <Weather />
  </div>
);

export const App = () => {
  const [setupComplete] = useState(false);

  return (
    <Router>
      <Routes>
        <Route
          path={ROUTES.HOME}
          element={!setupComplete ? <Page1 /> : <Page2 />}
        />
        <Route path={ROUTES.Weather} element={<WeatherPage />} />
      </Routes>
    </Router>
  );
};
