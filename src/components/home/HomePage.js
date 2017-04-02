import React from 'react';
import {Link} from 'react-router';

const HomePage = () => {
  return (
    <div className="jumbotron">
      <h1>bjorge-irc</h1>
      <p>This cool website allow you to discuss with firends!</p>
      <Link to="about" className="btn btn-primary btn-lg">More about me</Link>
      {' '}
      <Link to="login" className="btn btn-primary btn-lg">Log in and try the chat</Link>
    </div>
  );
};

export default HomePage;
