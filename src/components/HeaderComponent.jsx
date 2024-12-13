import { Link } from 'react-router-dom';

import { ROUTES } from './routes';

export const Header = () => (
  <header>
    <nav>
      <ul>
        <li>
          <Link to={ROUTES.Home}>Home</Link>
        </li>
        <li>
          <Link to={ROUTES.Weather}>Weather</Link>
        </li>
      </ul>
    </nav>
  </header>
);
