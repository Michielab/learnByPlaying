import React, { Component } from 'react';
import PropTypes from 'prop-types';

/* Import MaterialUI components */
import { withStyles, createStyles, Button } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';

const mapStateToProps = state => {
    return {
      playing: state.session.gameOptions.playing
    };
  };
  
  const mapDispatchToProps = dispatch => {
    return bindActionCreators({ togglePlaying }, dispatch);
  };
  const ConnectedButton = connect(
    mapStateToProps,
    mapDispatchToProps
  )(({ togglePlaying, playButton, stopButton, playing }) => {
    return (
      <Button onClick={togglePlaying} classes={{ root: playing ? stopButton : playButton }} disableRipple={true}>
        {playing ? 'Stop' : 'Play'}
      </Button>
    );
  });

class ComposeContainer extends Component {
    state = {
        
    }
  render() {
      const { location } = this.props;
    return (
      <Paper className={classes.container}>
        <Stave location={location}>
          {({ ...props }) => <Compose {...props} />}
        </Stave>
        {/* <Stave>{({ ...props }) => <Compose {...props} />}</Stave> */}
        <ConnectedButton
          playButton={classes.playButton}
          stopButton={classes.stopButton}
        />
        <Button>Add</Button>
      </Paper>
    );
  }
}

ComposeContainer.propTypes = {};

export default ComposeContainer;
