import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles, createStyles, Fade, Typography } from '@material-ui/core';

const styles = theme =>
  createStyles({
    '@keyframes addPoint': {
      '0%': { transform: 'translateY(-10px)' },
      '100%': { transform: 'translateY(20px)' }
    },
    '@keyframes deductPoint': {
      '0%': { transform: 'translateY(20px)' },
      '100%': { transform: 'translateY(-20px)' }
    },
    score: {
      color: 'white',
      width: '100px',
      left: 0,
      right: 0,
      position: 'absolute',
      top: '150px',
      margin: '0 auto',
      textAlign: 'center',
      fontSize: '1.5em'
    },
    scoreTitle: {
      color: 'white'
    },
    scores: {
      fontSize: '0.9em',
      marginTop: '10px',
      color: 'white'
    },
    addPoints: {
      color: '#2FD566',
      position: 'absolute',
      top: '30px',
      left: '50px',
      fontSize: '25px',
      display: 'inline-block',
      animation: 'addPoint 2s infinite'
    },
    deductPoints: {
      color: 'red',
      position: 'absolute',
      top: '30px',
      left: '50px',
      fontSize: '25px',
      display: 'inline-block',
      animation: 'deductPoint 2s infinite'
    }
  });

class Score extends Component {
  points;
  scoreTimeout;
  state = {
    fadeIn: false
  };
  componentDidUpdate(prevProps) {
    if (prevProps.score !== this.props.score) {
      this.points = this.props.score - prevProps.score;
      this.updateFade();
    }
  }
  updateFade = () => {
    this.setState(({ fadeIn }) => ({ fadeIn: !fadeIn }));
  };
  render() {
    const { fadeIn } = this.state;
    const { score, classes } = this.props;
    const add = this.points > 0 ? true : false;

    return (
      <div className={classes.score}>
        <Typography variant="title" classes={{ root: classes.scoreTitle }}>SCORE</Typography>
        <Typography variant="title" classes={{ root: classes.scores }}>
          {score}
        </Typography>
        {this.points && (
          <Fade
            in={fadeIn}
            timeout={{ enter: 500, exit: 1500 }}
            onEntered={this.updateFade}
            unmountOnExit={true}
          >
            <Typography
              variant="body1"
              className={add ? classes.addPoints : classes.deductPoints}
            >
              {add && '+'}
              {this.points}
            </Typography>
          </Fade>
        )}
      </div>
    );
  }
}

Score.propTypes = {
  score: PropTypes.number,
  classes: PropTypes.object
};

export default withStyles(styles)(Score);
