import React from 'react';
import {Link} from 'react-router';

const HomePage = () => {
  return (
    <div className="jumbotron">
      <h1>React Redux Firebase Starter</h1>
      <p>This is an starter project to make your life easier</p>
      <Link to="about" className="btn btn-primary btn-lg">Learn more</Link>
    </div>
  );
};

export default HomePage;
