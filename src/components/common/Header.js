import React, {PropTypes} from 'react';
import {Link, IndexLink} from 'react-router';

import LogoutLink from './LogoutLink';
import LoginLink from './LoginLink';

const Header = ({signOut, auth}) => {
  const loginLogoutLink = auth.isLogged ? <LogoutLink signOut={signOut} /> : <LoginLink />;
  const chatLink = auth.isLogged && <Link to="/chat" className="nav-item" activeClassName="active">Chat</Link>;

  return (
    <nav>
      <IndexLink to="/" className="nav-item" activeClassName="active">Home</IndexLink>
      {chatLink}
      {loginLogoutLink}
    </nav>
  );
};

Header.propTypes = {
  signOut: React.PropTypes.func.isRequired,
  auth: React.PropTypes.object.isRequired,
  user: React.PropTypes.object.isRequired,
};

export default Header;
