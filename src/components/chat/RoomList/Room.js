import React, { PropTypes } from 'react';

const Room = ({ children, onRemove, onSelect, isSelected }) => (
  <div className="btn-block btn-group">
    <button
      onClick={onSelect}
      style={{ width: '80%' }}
      type="button"
      className={`btn ${isSelected ? 'active' : ''} btn-xs btn-primary`}
    >
      {children}
    </button>
    <button
      onClick={onRemove}
      style={{ width: '20%' }}
      type="button"
      className="btn btn-xs btn-danger"
    >
      <span className="glyphicon glyphicon-trash"></span>
    </button>
  </div>
);
Room.propTypes = {
  children: PropTypes.string.isRequired, // room name
  onSelect: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  isSelected: PropTypes.bool.isRequired,
};

export default Room;
