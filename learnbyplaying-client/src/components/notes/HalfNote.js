import React from 'react';
import PropTypes from 'prop-types';

const HalfNote = props => {
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
        fill="transparent"
        strokeWidth="3"
        style={{ cursor: 'pointer' }}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onContextMenu={e => {
          handleContextMenu(id);
          e.preventDefault();
        }}
      />
      <line
        x1={positionX + 15}
        y1={positionY - 40}
        x2={positionX + 15}
        y2={positionY}
        strokeWidth="3"
        stroke="black"
        onContextMenu={e => {
          handleContextMenu(id);
          e.preventDefault();
        }}
      />
      />
    </React.Fragment>
  );
};

HalfNote.propTypes = {
  handleContextMenu: PropTypes.func,
  id: PropTypes.string,
  positionY: PropTypes.number,
  positionX: PropTypes.number,
  handleMouseDown: PropTypes.func,
  handleMouseUp: PropTypes.func
};

export default HalfNote;
