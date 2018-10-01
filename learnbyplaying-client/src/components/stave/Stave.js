import React, { Component } from 'react';
import NoteLine from '~/components/notes/NoteLine';
import Note from '~/components/notes/Note';
import Gsleutel from '~/Gsleutel.jpg';
import ButtonBar from '~/components/buttons/ButtonBar';
import Button from '@material-ui/core/Button';
import { withStyles, createStyles } from '@material-ui/core';
import Sound from 'react-sound';
import { getNotes } from '~/components/notes/Notes';

const styles = theme =>
  createStyles({
    staveContainer: {
      backgroundColor: 'white',
      height: '40%',
      width: '50%',
      minWidth: '400px',
      minHeight: ' 200px',
      webkitBoxShadow: '4px 7px 10px 3px rgba(0,0,0,0.75)',
      mozBoxShadow: '4px 7px 10px 3px rgba(0,0,0,0.75)',
      boxShadow: '4px 7px 10px 3px rgba(0,0,0,0.75)',
      borderRadius: '5px'
    },
    stave: {
      width: '100%',
      height: '100%',
      minHeight: '298px'
    }
  });

class Stave extends Component {
  container;
  notes;
  constructor(props) {
    super(props);
    this.state = { note: '', width: '', height: '' };
  }

  componentDidMount() {
    this.update();
    window.addEventListener('resize', this.update);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.update);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.gameStarted !== prevProps.gameStarted) {
      this.startGame(this.notes);
    }
  }

  nextNote = notes => {
    let number = Math.floor(Math.random() * notes.length);
    number = 4;
    let note = notes[number];
    this.setState({ note });
  };

  check = answer => {
    let currentNote = this.state.note.name;
    answer === currentNote
      ? (this.props.addPoints(), this.nextNote(this.notes))
      : this.props.deductPoints();
  };

  containerRef = ref => {
    this.container = ref;
  };

  update = () => {
    const width = this.container.offsetWidth;
    const height = this.container.offsetHeight;
    this.setState({
      width,
      height
    });
  };

  render() {
    const { width, height, note } = this.state;
    const { classes, gameOptions } = this.props;

    const middle = height / 2;
    let divider, end;
    width > 800 ? (end = 800 - 50) : (end = width - 50);
    height < 125 ? (divider = 15) : (divider = 25);
    const vertices = [
      [[50, middle - divider * 2], [end, middle - divider * 2]],
      [[50, middle - divider], [end, middle - divider]],
      [[50, middle], [end, middle]],
      [[50, middle + divider], [end, middle + divider]],
      [[50, middle + divider * 2], [end, middle + divider * 2]]
    ];
    this.notes = getNotes(middle, divider, width, gameOptions.type);

    return (
      <div className={classes.staveContainer} ref={this.containerRef}>
        <svg className={classes.stave}>
          <image
            href={Gsleutel}
            x="0"
            y="0"
            style={{ height: height, width: '170px' }}
          />
          {vertices.map((vertice, index) => (
            <NoteLine key={index} vertices={vertice} />
          ))}
          {note !== '' && (
            <Note cx={note.positionX} cy={note.positionY} line={note.line} />
          )}
        </svg>
        <ButtonBar notes={this.notes} check={this.check} />
        <Sound url={this.state.note.sound} playStatus="PLAYING" />
      </div>
    );
  }
}

export default withStyles(styles)(Stave);
