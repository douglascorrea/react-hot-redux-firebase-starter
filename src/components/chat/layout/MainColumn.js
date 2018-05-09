import React, { PropTypes } from 'react';

const MainColumn = ({ children }) => (
  <div className="col-xs-6 chatx-main-column">
    {children}
  </div>
);
MainColumn.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MainColumn;
