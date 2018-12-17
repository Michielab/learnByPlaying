import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { togglePlaying } from '~/ducks/actions/actions';
import { Scrollbars } from 'react-custom-scrollbars';


/* Import components */
import Nav from '~/components/header/Nav';
import Stave from '~/components/stave/Stave';
import GameOptions from '~/components/game/GameOptions';
import Learn from '~/components/learn/Learn';
import ButtonBar from '~/components/buttons/ButtonBar';
import Score from '~/components/score/Score';
import Compose from '~/components/compose/Compose';
import Drummachine from '~/components/drummachine/Drummachine';
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
)(({ togglePlaying, playButton, stopButton, playing }) => {
  return (
    <Button onClick={togglePlaying} classes={{ root: playing ? stopButton : playButton }} disableRipple={true}>
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
    scrollBar: {
      width: 'auto',
      height: '100%'
    },
    container: {
      backgroundColor: '#212121',
      // backgroundColor: '#6b5564',
      // background: 'linear-gradient(to bottom, #ba7ab4 0%, #020202 113%)',
      // background: 'linear-gradient(to bottom, #885680 9%, #050304 118%)',
      height: '100%',
      minHeight: '600px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    },
    playButton: {
      marginTop: '5%',
      backgroundColor: '#2FD566',
      '&:hover': {
        backgroundColor: '#2FD566'
      },
      color: '#FFFFFF'
    },
    stopButton: {
      marginTop: '5%',
      backgroundColor: 'red',
      '&:hover': {
        backgroundColor: 'red'
      },
      color: '#FFFFFF'
    }
  });

class App extends Component {
  state = {
    staves: [1]
  }

  handleAdd = () => {
    let newArrayStaves = this.state.staves;
    newArrayStaves.push(newArrayStaves.length++)
    this.setState({
      staves: newArrayStaves
    })
  }
  render() {
    const { classes } = this.props;
    return (
      <Router>
        <Paper className={classes.root} elevation={0} square={true}>
        <Scrollbars className={classes.scrollBar}>
          <Nav />
          <Route exact path="/" component={() => <div>home</div>} />
          <Route exact path="/learn" component={GameOptions} />
          <Route
            path="/learning"
            component={({location}) => (
              <Paper className={classes.container} elevation={0} square={true}>
                <Stave location={location}>
                  {({ ...props, session }) => (
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
            component={({location}) => (
                    // <Scrollbars className={classes.scrollBar}>
              <Paper className={classes.container}>
               {this.state.staves.map((stave,index) =>
                <Stave location={location}>{({ ...props }) => <Compose {...props} />}</Stave>
               )} 
                {/* <Stave>{({ ...props }) => <Compose {...props} />}</Stave> */}
                <ConnectedButton playButton={classes.playButton} stopButton={classes.stopButton}/>
              {/* <Button onClick={this.handleAdd}>Add</Button> */}
              </Paper>
                // </Scrollbars>
            )}
          />
          <Route   path="/drummachine"
            component={({location}) => (
                    // <Scrollbars className={classes.scrollBar}>
              <Drummachine />
            )} />               
                          </Scrollbars>
        </Paper>
      </Router>
    );
  }
}

export default withStyles(styles)(App);
