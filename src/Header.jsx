import { Link } from 'react-router-dom';
import { styled } from 'styled-components';

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  background-color: #3f51b5;
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-size: 18px;
  margin-right: 10px;
  
  &:hover {
    text-decoration: underline;
  }
`;

export const Header = () => {
  return (
    <HeaderContainer>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/weather">Weather</NavLink>
    </HeaderContainer>
  );
};
