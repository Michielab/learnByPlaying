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
      top: '120px',
      margin: '0 auto'
    },
    addPoints: {
      color: 'green',
      transform: 'translate(0, 50px)'
    },
    deductPoints: {
      color: 'red',
      transform: 'translate(0, -50px)'
    }
  });

class Score extends Component {
  points;
  state = {
    in: false
  };
  componentDidUpdate(prevProps) {
    if (prevProps.score !== this.props.score) {
      this.points = this.props.score - prevProps.score;
      this.updateFade();
    }
  }
  updateFade = () => {
    this.setState({
      in: !this.state.in
    });
  };
  render() {
    // const { in } = this.state;
    const { score, classes } = this.props;
    return (
      <div className={classes.score}>
        <h2>SCORE</h2>
        <h3>{score}</h3>
        {this.points && (
          <Fade
            in={this.state.in}
            timeout={{ enter: 2000, exit: 5000 }}
            onEntered={this.updateFade}
          >
            <p
              className={
                this.points > 0 ? classes.addPoints : classes.deductPoints
              }
            >
              {this.points}
            </p>
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
