import React, { PropTypes } from 'react';

const RightColumn = ({ children }) => (
  <div className="col-xs-2 chatx-right-column">
    {children}
  </div>
);
RightColumn.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RightColumn;
