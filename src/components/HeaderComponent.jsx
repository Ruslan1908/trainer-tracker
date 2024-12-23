//это HeaderComponent

import { Link } from 'react-router-dom';
import { styled } from 'styled-components';

const HeaderContainer = styled.header`
  background-color: #282c34;
  padding: 10px 20px;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
`;

const NavList = styled.ul`
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
`;

const NavItem = styled.li`
  margin-right: 15px;

  a {
    text-decoration: none;
    color: white;
    font-size: 1rem;

    &:hover {
      text-decoration: underline;
    }
  }
`;

export function Header() {
  return (
    <HeaderContainer>
      <Nav>
        <NavList>
          <NavItem>
            <Link to="/">Home</Link>
          </NavItem>
          <NavItem>
            <Link to="/weather">Weather</Link>
          </NavItem>
        </NavList>
      </Nav>
    </HeaderContainer>
  );
}
