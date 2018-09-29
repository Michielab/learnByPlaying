import React from 'react';
import Button from '@material-ui/core/Button';
import { withStyles, createStyles } from '@material-ui/core';
import PropTypes from 'prop-types';

const styles = theme =>
  createStyles({
    buttonBar: {
      margin: '20px 0',
      padding: '20px 0',
      display: 'flex',
      justifyContent: 'center'
    },
    button: {
      color: 'rgba(255, 255, 255, 0.8)',
      border: 'rgba(255, 255, 255, 0.8) solid 2px',
      borderRadius: '35%',
      height: '50px',
      width: '50px',
      webkitBoxShadow: '4px 7px 10px 3px rgba(0,0,0,0.75)',
      mozBoxShadow: '4px 7px 10px 3px rgba(0,0,0,0.75)',
      boxShadow: '4px 7px 10px 3px rgba(0,0,0,0.75)',
      margin: '0 10px'
    }
  });


const buttonBar = props => {
  const { classes, notes, check } = props;
  return (
    <div className={classes.buttonBar}>
      {notes.map(
        (note, index) =>
          index < 7 && (
            <Button
              className={classes.button}
              onClick={() => check(note.name)}
              key={index}
            >
              {note.name}
            </Button>
          )
      )}
    </div>
  );
};

buttonBar.propTypes = {
  classes: PropTypes.object,
  notes: PropTypes.array
};

export default withStyles(styles)(buttonBar);
