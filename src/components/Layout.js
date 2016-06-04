import React from 'react';
import Header from './common/Header';


class Layout extends React.Component {
  render() {
    return (
      <div className="container-fluid">
        <Header />
        {this.props.children}
      </div>
    );
  }
}

Layout.propTypes =  {
  children: React.PropTypes.object
};

export default Layout;
