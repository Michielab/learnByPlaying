import React from 'react';
import PropTypes from 'prop-types';

/* Import MaterialUI components*/
import Button from '@material-ui/core/Button';
import { withStyles, createStyles } from '@material-ui/core';

const styles = theme =>
  createStyles({
    buttonBar: {
      margin: '20px 0',
      padding: '20px 0',
      display: 'flex',
      justifyContent: 'center'
    },
    button: {
      backgroundColor: '#212121',
      color: 'rgba(255, 255, 255, 0.8)',
      border: 'rgba(255, 255, 255, 0.8) solid 2px',
      borderRadius: '35%',
      height: '50px',
      width: '50px',
      webkitBoxShadow: '4px 7px 10px 3px rgba(0,0,0,0.75)',
      mozBoxShadow: '4px 7px 10px 3px rgba(0,0,0,0.75)',
      boxShadow: '4px 7px 10px 3px rgba(0,0,0,0.75)',
      margin: '0 10px',
      '&:hover': {
        backgroundColor: '#212121'
      },
      '&:disabled': {
        color: 'rgba(255, 255, 255, 0.8)',
        cursor: 'pointer',
        pointerEvents: 'unset',
        '&:hover': {
          backgroundColor: '#212121'
        },
      }
    },
    rippleCorrect: {
      color: 'green !important'
    },
    rippleWrong: {
      color: 'red !important'
    }
  });

const buttonBar = props => {
  const { classes, notes, check, currentNote, buttonDisabled } = props;

  return (
    <div className={classes.buttonBar}>
      {notes.map((note, index) => {
        return (
          index < 7 && (
            <Button
              disabled={buttonDisabled}
              draggable={true}
              onDrag={(e)=>{console.log(e)}}
              classes={{ root: classes.button }}
              TouchRippleProps={{
                className:
                  currentNote.name == note.name
                    ? classes.rippleCorrect
                    : classes.rippleWrong
              }}
              onClick={() => check(note.name)}
              centerRipple={true}
              key={index}
            >
              {note.name}
            </Button>
          )
        );
      })}
    </div>
  );
};

buttonBar.propTypes = {
  classes: PropTypes.object,
  notes: PropTypes.array,
  check: PropTypes.func,
  currentNote: PropTypes.object
};

export default withStyles(styles)(buttonBar);
