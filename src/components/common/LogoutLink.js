import React from 'react';

const LogoutLink = ({ signOut }) => {
  const onClick = (e) => {
    e.preventDefault();
    return signOut(e);
  };
  return <a href="#" onClick={onClick}>Logout</a>;
};

LogoutLink.propTypes = {
  signOut: React.PropTypes.func.isRequired,
};

export default LogoutLink;
