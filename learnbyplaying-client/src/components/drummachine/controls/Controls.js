import React, { Component } from 'react';
import PropTypes from 'prop-types';

/* Imports Material-ui */
import { withStyles, Button } from '@material-ui/core';
import { PlayArrow, Stop, ClearAll } from '@material-ui/icons/';

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
      handleBPMChange,
      togglePlay,
      handleClearAll,
      playing,
      bpm,
      classes
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
          onClick={() => togglePlay()}
          classes={{ root: classes.playButton }}
        >
          {!playing ? <PlayArrow /> : <Stop />}
        </Button>
        <Button
          onClick={() => handleClearAll()}
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
  togglePlay: PropTypes.func,
  handleClearAll: PropTypes.func,
  playing: PropTypes.bool,
  bpm: PropTypes.number
};

export default withStyles(styles)(Controls);
