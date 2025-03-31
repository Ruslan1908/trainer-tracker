import { styled } from 'styled-components';

import { Header } from './components/HeaderComponent';

const MainContent = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding-top: 60px;
`;

export const Layout = ({ children }) => (
  <div>
    <Header />
    <MainContent>{children}</MainContent>
  </div>
);
