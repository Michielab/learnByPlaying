import React, { Component } from 'react';
import '~/App.css';
import Nav from '~/components/header/Nav';
import Stave from '~/components/stave/Stave';
import { withStyles, createStyles } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addPoints, deductPoints } from '~/ducks/actions/actions';
import { BrowserRouter as Router, Route } from 'react-router-dom';

const mapStateToProps = state => {
  return {
    ...state
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ addPoints, deductPoints }, dispatch);
};

const styles = theme =>
  createStyles({
    root: {
      backgroundColor: '#333333',
      height: '100vh'
    },
    container: {
      backgroundColor: '#333333',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }
  });

class App extends Component {
  render() {
    const { classes, session, addPoints, deductPoints } = this.props;
    return (
      <Router>
        <Paper className={classes.root} elevation={0} square={true}>
          <Nav />
          <Route exact path="/" component={() => <div>home</div>} />
          <Route
            path="/learning"
            component={() => (
              <Paper className={classes.container} elevation={0} square={true}>
                <div
                  style={{
                    color: 'white',
                    height: '100px',
                    marginTop: '100px'
                  }}
                >
                  Score: {session.score}
                </div>
                <Stave addPoints={addPoints} deductPoints={deductPoints} />
              </Paper>
            )}
          />
        </Paper>
      </Router>
    );
  }
}

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
