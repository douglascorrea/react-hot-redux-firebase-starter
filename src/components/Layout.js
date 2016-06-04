import React from 'react';
import { Link } from 'react-router';


export default function Layout({ children }) {
  return (
    <div>
      <h1>Hellow, wasdsaorld!</h1>
      <Link to="/counter" activeClassName="active">Go to counter</Link>
    </div>
  );
}

Layout.propTypes =  {
  children: React.PropTypes.object
};
