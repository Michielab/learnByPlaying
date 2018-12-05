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
    composedNotes: []
  };

  handleMouseDown = e => {
    // document.getElementById("test").appendChild(e.target);
  };

  handleMouseUp = ({ id, ...note }) => {
    let notes = this.state.composedNotes;
    notes = notes.filter(note => note.id !== id);
    notes.push({ id, ...note });
    this.setState({ composedNotes: notes });
    console.log(this.state.composedNotes)
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
    const { cx, cy, composedNotes } = this.state;
    const { middle, divider, width, session, height } = this.props;
    const standardNotes = getNotes(
      middle,
      divider,
      width,
      session.gameOptions.type
    );
    const domNode = document.getElementById('staveContainer');
    console.log(this.state.notes);
    return (
      <React.Fragment>
        <WholeNote
          composedNotes={composedNotes}
          height={height}
          x={100}
          addNote={this.handleMouseUp}
          id="1"
          standardNotes={standardNotes}
        />
        <WholeNote
          composedNotes={composedNotes}
          height={height}
          x={200}
          addNote={this.handleMouseUp}
          id="2"
          standardNotes={standardNotes}
        />
      </React.Fragment>
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

// ReactDOM.createPortal(this.props.children({cx,cy, mouseDown: this.handleMouseDown, mouseUp: this.handleMouseUp }), domNode)
