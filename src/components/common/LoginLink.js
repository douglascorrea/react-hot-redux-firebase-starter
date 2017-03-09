import React from 'react';
import {NavItem} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';

const LoginLink = [
      <LinkContainer key={'registerKey'} to={{pathname: "/register"}}>
        <NavItem eventKey={4}>Register</NavItem>
      </LinkContainer>,
      <LinkContainer key={'loginKey'} to={{pathname: "/login"}}>
        <NavItem eventKey={5}>Login</NavItem>
      </LinkContainer>];

export default LoginLink;
