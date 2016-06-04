import React, {PropTypes} from 'react';
import { Link, IndexLink } from 'react-router';

const Header = () => {
  return (
    <nav>
      <IndexLink to="/" activeClassName="active">Home</IndexLink>
      {" | "}
      <Link to="/courses" activeClassName="active">Couarsesa</Link>
      {" | "}
      <Link to="/counter" activeClassName="active">Counter</Link>
      {" | "}
      <Link to="/registration" activeClassName="active">Sigaan Up</Link>
      {" | "}
      <Link to="/about" activeClassName="active">About</Link>

    </nav>
  );
};

export default Header;
