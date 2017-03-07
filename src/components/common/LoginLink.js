import React from 'react';
import {Link} from 'react-router';

const LoginLink = () => {
  return (
    <span>
      <Link to="/register" className="nav-item" activeClassName="active">Register</Link>
      <Link to="/login" className="nav-item" activeClassName="active">Login</Link>
    </span>
  );
};

export default LoginLink;
