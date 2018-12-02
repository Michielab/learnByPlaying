import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Sound from 'react-sound';

/* Helper function to get notes  */
import { getNotes } from '~/components/notes/Notes';

/* Import Note component  */
import Note from '~/components/notes/Note';

class WholeNote extends Component {
  coords;
  state = {
    cx: this.props.x,
    cy: this.props.height - 20
  };

  handleMouseDown = e => {
    this.coords = {
      x: e.pageX,
      y: e.pageY
    };
    document.addEventListener('mousemove', this.handleMouseMove);
  };

  handleMouseUp = () => {
    document.removeEventListener('mousemove', this.handleMouseMove);
    this.coords = {};
  };

  handleMouseMove = e => {
    const xDiff = this.coords.x - e.pageX;
    const yDiff = this.coords.y - e.pageY;

    this.coords.x = e.pageX;
    this.coords.y = e.pageY;

    this.setState({
      cx: this.state.cx - xDiff,
      cy: this.state.cy - yDiff
    });
  };

  componentDidMount() {}

  componentWillUnmount() {}

  render() {
    const { cx, cy } = this.state;
    // const { middle, divider, width, session } = this.props;
    const domNode = document.getElementById('staveContainer');

    return <ellipse
        cx={cx}
        cy={cy}
        rx="15"
        ry="10"
        stroke="black"
        fill="transparent"
        strokeWidth="3"
        style={{ cursor: 'pointer' }}
        onMouseDown={this.handleMouseDown}
        onMouseUp={this.handleMouseUp}
      />
  }
}

WholeNote.propTypes = {
  addPoints: PropTypes.func,
  children: PropTypes.func,
  classes: PropTypes.object,
  deductPoints: PropTypes.func,
  divider: PropTypes.number,
  middle: PropTypes.number,
  session: PropTypes.object,
  setGameOptions: PropTypes.func,
  width: PropTypes.number
};

export default WholeNote;