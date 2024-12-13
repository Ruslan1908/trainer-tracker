import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { styled } from 'styled-components';

import { Header } from './components/HeaderComponent';
import { UserSetupForm } from './components/UserSetupForm';
import { WorkoutScheduler } from './components/WorkoutScheduler';
import { Weather } from './components/Weather';

const MainContent = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;

  min-height: 100vh;
  padding-top: 60px;
`;

const Layout = ({ children }) => (
  <div>
    <Header />
    <MainContent>{children}</MainContent>
  </div>
);

export const App = () => {
  const [setupComplete, setSetupComplete] = useState(false);

  const handleSetupComplete = () => {
    setSetupComplete(true);
  };

  return (
    <Router>
      <Layout>
        <Routes>
          <Route
            path="/"
            element={
              !setupComplete ? (
                <UserSetupForm onSetupComplete={handleSetupComplete} />
              ) : (
                <WorkoutScheduler />
              )
            }
          />
          <Route path="/weather" element={<Weather />} />
        </Routes>
      </Layout>
    </Router>
  );
};
