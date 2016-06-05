import React from 'react';
import {Link} from 'react-router';

const LoginLink = () => {
  return <Link to="/login" activeClassName="active">Login</Link>;
};

export default LoginLink;
