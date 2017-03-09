import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {IndexLink} from 'react-router';

import {Navbar, Nav, NavItem} from 'react-bootstrap';
import {IndexLinkContainer, LinkContainer} from 'react-router-bootstrap';

import LogoutLink from './LogoutLink';
import LoginLink from './LoginLink';

const Header = ({signOut, auth}) => {
  const loginLogoutLink = auth.isLogged ? <LogoutLink signOut={signOut}/> : LoginLink;
  const chatLink = auth.isLogged &&
    <LinkContainer to={{pathname: '/chatrooms'}}>
      <NavItem eventKey={2}>Chat</NavItem>
    </LinkContainer>;

  return (
    <Navbar>
      <Navbar.Header>
        <Navbar.Brand>
          <IndexLink to={'/'}>ChatX</IndexLink>
        </Navbar.Brand>
      </Navbar.Header>
      <Nav>
        <IndexLinkContainer to={{pathname: '/'}}>
          <NavItem eventKey={1}>Home</NavItem>
        </IndexLinkContainer>
        {chatLink}
        {loginLogoutLink}
      </Nav>
    </Navbar>
  );
};

Header.propTypes = {
  signOut: React.PropTypes.func.isRequired,
  auth: React.PropTypes.object.isRequired,
};

function mapStateToProps(state, ownProps) {
  return (state);
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({}, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
