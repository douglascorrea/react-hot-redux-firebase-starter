import React from 'react';
import {Link} from 'react-router';

const AdminPage = () => {
  return (
    <div>
      <h1>You will only see this page if you are Admin</h1>
      <Link to="/" activeClassName="active">Home</Link>
    </div>
  );
};

export default AdminPage;
