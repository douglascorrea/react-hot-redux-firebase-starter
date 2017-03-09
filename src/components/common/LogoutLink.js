import React from 'react';
import {LinkContainer} from 'react-router-bootstrap';
import {NavItem} from 'react-bootstrap';

const LogoutLink = ({signOut}) => {
  return (
    <LinkContainer to={{pathname: '/login'}}>
      <NavItem onClick={signOut} eventKey={3}>Logout</NavItem>
    </LinkContainer>
  );
};

LogoutLink.propTypes = {
  signOut: React.PropTypes.func.isRequired
};

export default LogoutLink;
