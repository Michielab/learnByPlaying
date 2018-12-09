import React from 'react';
import PropTypes from 'prop-types';

const WholeNote = props => {
  const {
    handleContextMenu,
    id,
    positionX,
    positionY,
    handleMouseDown,
    handleMouseUp
  } = props;
  return (
    <React.Fragment>
      <ellipse
        cx={positionX}
        cy={positionY}
        rx="15"
        ry="10"
        stroke="black"
        fill="black"
        strokeWidth="3"
        style={{ cursor: 'pointer' }}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onContextMenu={e => {
          handleContextMenu(id);
          e.preventDefault();
        }}
      />
      <ellipse
        cx={positionX}
        cy={positionY}
        rx="12"
        ry="8"
        stroke="black"
        fill="white"
        strokeWidth="1"
        style={{ cursor: 'pointer' }}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onContextMenu={e => {
          handleContextMenu(id);
          e.preventDefault();
        }}
      />
    </React.Fragment>
  );
};

WholeNote.propTypes = {
  handleContextMenu: PropTypes.func,
  id: PropTypes.string,
  positionY: PropTypes.number,
  positionX: PropTypes.number,
  handleMouseDown: PropTypes.func,
  handleMouseUp: PropTypes.func
};

export default WholeNote;
