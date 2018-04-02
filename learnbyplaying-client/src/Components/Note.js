import React from "react";

const Note = props => {
  return (
    <svg>
      <ellipse
        cx={props.cx}
        cy={props.cy}
        rx="15"
        ry="7"
        stroke="black"
        fill="transparent"
        strokeWidth="3"
      />
      {props.line === true ? (
        <line
          x1={props.cx - 20}
          y1={props.cy}
          x2={props.cx + 20}
          y2={props.cy}
          strokeWidth="3"
          stroke="black"
        />
      ) : (
        ""
      )}
    </svg>
  );
};

export default Note;
