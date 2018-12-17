import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import { PlayArrow, Stop, ClearAll } from '@material-ui/icons/';
import { Button } from '@material-ui/core';

const styles = theme => ({
  label: {
    color: 'white',
    marginRight: '5px',
    gridColumn: 1,
    gridRow: 0,
    textAlign: 'center',
    marginTop: '4px'
  },
  BPMinput: {
    gridColumn: 2,
    gridRow: 0,
    height: '20px',
    backgroundColor: ' #212121',
    border: 'none',
    color: 'floralwhite',
    border: '2px solid',
    color: 'rgba(255, 255, 255, 0.8)',
    borderRadius: '4px',
    textAlign: 'center',
    outline: 'initial !important'
  },
  playButton: {
    gridColumn: 16,
    gridRow: 0,
    borderColor: 'rgba(255, 255, 255, 0.8)',
    color: 'rgba(255, 255, 255, 0.8)',
    border: 'solid 2px',
    height: '35px',
    marginBottom: '30px',
    borderRadius: '20%',
    width: '30px',
    padding: 0
  },
  clearButton: {
    gridColumn: 17,
    gridRow: 0,
    borderColor: 'rgba(255, 255, 255, 0.8)',
    color: 'rgba(255, 255, 255, 0.8)',
    border: 'solid 2px',
    height: '35px',
    marginBottom: '30px',
    borderRadius: '20%',
    width: '30px',
    padding: 0
  }
});

class Controls extends Component {
  render() {
    const {
      classes,
      handleBPMChange,
      handlePlayPress,
      clearAll,
      playing,
      bpm
    } = this.props;
    return (
      <React.Fragment>
        <label className={classes.label}>BPM</label>
        <input
          min={40}
          max={240}
          value={bpm}
          type="number"
          onChange={handleBPMChange}
          className={classes.BPMinput}
        />
        <Button
          onClick={() => handlePlayPress()}
          classes={{ root: classes.playButton }}
        >
          {!playing ? <PlayArrow /> : <Stop />}
        </Button>
        <Button
          onClick={() => clearAll()}
          classes={{ root: classes.clearButton }}
        >
          <ClearAll />
        </Button>
      </React.Fragment>
    );
  }
}

Controls.propTypes = {
  handleBPMChange: PropTypes.func,
  handlePlayPress: PropTypes.func,
  clearAll: PropTypes.func,
  playing: PropTypes.bool,
  bpm: PropTypes.number
};

export default withStyles(styles)(Controls);
