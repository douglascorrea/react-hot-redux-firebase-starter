import React, {PropTypes} from 'react';
import {Link, IndexLink} from 'react-router';
import LoadingDots from './LoadingDots.react';
import LoginLink from './LoginLink.react';
import LogoutLink from './LogoutLink.react';
import AdminLink from './AdminLink.react';

const Header = ({loading, signOut, auth, user}) => {

  let loginLogoutLink = auth.isLogged ? <LogoutLink signOut={signOut} /> : <LoginLink />;
  let adminLink = user.isAdmin ? <AdminLink /> : null;

  return (
    <nav>
      <IndexLink to='/' activeClassName='active'>Home</IndexLink>
      {' | '}
      <Link to='/about' activeClassName='active'>About</Link>
      {' | '}
      <Link to='/protected' activeClassName='active'>Protected</Link>
      {adminLink}
      {' | '}
      {loginLogoutLink}
      {loading && <LoadingDots interval={100} dots={20}/>}
    </nav>
  );
};

Header.propTypes = {
  signOut: React.PropTypes.func.isRequired,
  auth: React.PropTypes.object.isRequired,
  user: React.PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired
};

export default Header;
