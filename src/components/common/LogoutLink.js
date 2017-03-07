import React from 'react';

const LogoutLink = ({signOut}) => {
  return <a href="#" className="nav-item" onClick={signOut}>Logout</a>;
};

LogoutLink.propTypes = {
  signOut: React.PropTypes.func.isRequired
};

export default LogoutLink;
