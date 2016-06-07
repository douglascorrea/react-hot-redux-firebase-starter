import React from 'react';
import {Link} from 'react-router';

const AboutPage = () => {
  return (
    <div>
      <h1>About</h1>
      <p>Created by <a href="http://twitter.com/douglas_correa">@douglas_correa</a></p>
      <Link to="/" activeClassName="active">Go to Home</Link>
    </div>
  );
};

export default AboutPage;
