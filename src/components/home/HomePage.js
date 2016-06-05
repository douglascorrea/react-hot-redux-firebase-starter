import React from 'react';
import {Link} from 'react-router';

const HomePage = () => {
  return (
    <div className="jumbotron">
      <h1>Firebase Starter</h1>
      <p>A photo app as example</p>
      <Link to="about" className="btn btn-primary btn-lg">Learn more</Link>
    </div>
  );
};

export default HomePage;
