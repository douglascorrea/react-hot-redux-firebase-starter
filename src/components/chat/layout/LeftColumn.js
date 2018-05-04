import React, { PropTypes } from 'react';

const LeftColumn = ({ children }) => (
  <div className="col-xs-2 chatx-left-column">
    {children}
  </div>
);
LeftColumn.propTypes = {
  children: PropTypes.node.isRequired,
};

export default LeftColumn;
