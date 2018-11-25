import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

/* Import components */
import Nav from '~/components/header/Nav';
import Stave from '~/components/stave/Stave2';
import GameOptions from '~/components/game/GameOptions';
import Learn from '~/components/learn/Learn';
import ButtonBar from '~/components/buttons/ButtonBar';
import Score from '~/components/score/Score';
/* Import MaterialUI components */
import { withStyles, createStyles } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';

/* Import CSS */
import '~/App.css';

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
      // backgroundColor: '#333333',

      backgroundColor: '#535353',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
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
                  {({ ...props, session }) => (
                    <Learn {...props}>
                      {({ notes, check, currentNote }) => (    
                       <React.Fragment>
                         <Score score={session.score}/>
                         <ButtonBar
                           notes={notes}
                           check={check}
                           currentNote={currentNote}
                         />
                       </React.Fragment>
                      )}
                    </Learn>
                  )}
                </Stave>
              </Paper>
            )}
          />
        </Paper>
      </Router>
    );
  }
}

export default withStyles(styles)(App);
