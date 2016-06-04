import React from 'react';
import {Link} from 'react-router';

class AboutPage extends React.Component {
  render() {
    return (
      <div>
        <h1>About</h1>
        <p>This applicaationasdas uses React, Redux, React Router and a variety of other helpful libraries.</p>
        <Link to="/layout" activeClassName="active">Go to Layout</Link>
      </div>
    );
  }
}

export default AboutPage;
