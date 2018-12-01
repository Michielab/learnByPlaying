import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Sound from 'react-sound';

/* Helper function to get notes  */
import { getNotes } from '~/components/notes/Notes';

/* Import Note component  */
import Note from '~/components/notes/Note';

class Compose extends Component {
  state = {};

  componentDidMount() {}

  componentWillUnmount() {}

  render() {
    const { number } = this.state;
    const { middle, divider, width, session } = this.props;
    const domNode = document.getElementById('staveContainer');

    return (
      <ellipse
        cx={30}
        cy={300}
        rx="15"
        ry="10"
        stroke="black"
        fill="transparent"
        strokeWidth="3"
        style={{ cursor: 'pointer' }}
        onDrag={()=>{console.log("dragg")}}
        draggable={true}
      />
    );
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
