import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { togglePlaying } from '~/ducks/actions/actions';
/* Import components */
import Nav from '~/components/header/Nav';
import Stave from '~/components/stave/Stave';
import GameOptions from '~/components/game/GameOptions';
import Learn from '~/components/learn/Learn';
import ButtonBar from '~/components/buttons/ButtonBar';
import Score from '~/components/score/Score';
import Compose from '~/components/compose/Compose';

/* Import MaterialUI components */
import { withStyles, createStyles, Button } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';

/* Import CSS */
import '~/App.css';

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
)(({ togglePlaying, playButton, playing }) => {
  return (
    <Button onClick={togglePlaying} classes={{ root: playButton }}>
      {playing ? 'Stop' : 'Play'}
    </Button>
  );
});

/*  
LightGrey: #B3B3B3
DarkGrey: #535353
Black: #121212
LightBlack: #212121
Green: #2AB859
LightGreen: #2FD566;
White: #FFFFFF

*/
const styles = theme =>
  createStyles({
    root: {
      backgroundColor: '#333333',
      height: '100vh'
    },
    container: {
      backgroundColor: '#212121',

      // backgroundColor: '#6b5564',
      // background: 'linear-gradient(to bottom, #ba7ab4 0%, #020202 113%)',
      // background: 'linear-gradient(to bottom, #885680 9%, #050304 118%)',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    },
    playButton: {
      marginTop: '100px',
      backgroundColor: '#2FD566',
      '&:hover': {
        backgroundColor: '#2FD566'
      },
      color: '#FFFFFF'
    }
  });

class App extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Router>
        <Paper className={classes.root} elevation={0} square={true}>
          <Nav />
          <Route exact path="/" component={() => <div>home</div>} />
          <Route exact path="/learn" component={GameOptions} />
          <Route
            path="/learning"
            component={() => (
              <Paper className={classes.container} elevation={0} square={true}>
                <Stave>
                  {({ session, ...props }) => (
                    <Learn {...props}>
                      {({ notes, check, currentNote, buttonDisabled }) => (
                        <React.Fragment>
                          <Score score={session.score} />
                          <ButtonBar
                            notes={notes}
                            check={check}
                            currentNote={currentNote}
                            buttonDisabled={buttonDisabled}
                          />
                        </React.Fragment>
                      )}
                    </Learn>
                  )}
                </Stave>
              </Paper>
            )}
          />
          <Route
            path="/compose"
            component={() => (
              <Paper className={classes.container}>
                <Stave>{({ ...props }) => <Compose {...props} />}</Stave>
                <ConnectedButton playButton={classes.playButton} />
              </Paper>
            )}
          />
        </Paper>
      </Router>
    );
  }
}

export default withStyles(styles)(App);
