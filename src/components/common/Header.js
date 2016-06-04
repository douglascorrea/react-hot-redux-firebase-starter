import React, {PropTypes} from 'react';
import { Link, IndexLink } from 'react-router';

const Header = () => {
  return (
    <nav>
      <IndexLink to="/" activeClassName="active">Home</IndexLink>
      {" | "}
      <Link to="/courses" activeClassName="active">Courses</Link>
      {" | "}
      <Link to="/register" activeClassName="active">Sign Up</Link>
      {" | "}
      <Link to="/login" activeClassName="active">Login</Link>
      {" | "}
      <Link to="/about" activeClassName="active">About</Link>

    </nav>
  );
};

export default Header;
