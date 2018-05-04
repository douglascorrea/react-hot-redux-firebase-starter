import React, { PropTypes } from 'react';

const Room = ({ children, onRemove }) => (
  <div className="btn-block btn-group">
    <button style={{ width: '80%' }} type="button" className="btn btn-xs btn-primary">
      {children}
    </button>
    <button onClick={onRemove} style={{ width: '20%' }} type="button" className="btn btn-xs btn-danger">
      <span className="glyphicon glyphicon-trash"></span>
    </button>
  </div>
);
Room.propTypes = {
  children: PropTypes.string.isRequired, // room name
  onRemove: PropTypes.func.isRequired,
};

export default Room;
