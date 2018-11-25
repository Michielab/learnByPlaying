import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles, createStyles, Fade } from '@material-ui/core';

const styles = theme =>
  createStyles({
    score: {
      color: 'white',
      width: '100px',
      left: 0,
      right: 0,
      position: 'absolute',
      top: '180px',
      margin: '0 auto'
    }
  });

class Score extends Component {
  render() {
    const { score, classes } = this.props;
    return <div className={classes.score}>Score: {score}</div>;
  }
}

Score.propTypes = {};

export default withStyles(styles)(Score);
