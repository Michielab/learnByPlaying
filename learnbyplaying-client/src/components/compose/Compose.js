import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Sound from 'react-sound';

/* Helper function to get notes  */
import { getNotes } from '~/components/notes/Notes';

/* Import Note component  */
import WholeNote from '~/components/notes/WholeNote';

class Compose extends Component {
  coords;
  state = {
    cx: 30,
    cy: 30
  };

  handleMouseDown = e => {
    // document.getElementById("test").appendChild(e.target); 
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
    const { middle, divider, width, session, height } = this.props;
    const domNode = document.getElementById('staveContainer');

    return <React.Fragment>
        <WholeNote height={height} x={100}/>
        <WholeNote height={height} x={200}/>
    </React.Fragment>
  }
}

Compose.propTypes = {
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

export default Compose;

// ReactDOM.createPortal(this.props.children({cx,cy, mouseDown: this.handleMouseDown, mouseUp: this.handleMouseUp }), domNode)