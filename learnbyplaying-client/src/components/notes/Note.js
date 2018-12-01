import React from 'react';
import PropTypes from 'prop-types';

const Note = props => {
  return (
    <svg>
      <ellipse
        cx={props.cx}
        cy={props.cy}
        rx="15"
        ry="10"
        stroke="black"
        fill="transparent"
        strokeWidth="3"
        onClick={props.onClick}
        style={{cursor: 'pointer'}}
      />
      {props.line === true && (
        <line
          x1={props.cx - 20}
          y1={props.cy}
          x2={props.cx + 20}
          y2={props.cy}
          strokeWidth="3"
          stroke="black"
        />
      )}
    </svg>
  );
};

Note.propTypes = {
  cx: PropTypes.number,
  cy: PropTypes.number,
  line: PropTypes.bool,
  onClick: PropTypes.func
};

export default Note;
