import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

/* Import components */
import Nav from '~/components/header/Nav';
import Stave from '~/components/stave/Stave';
import GameOptions from '~/components/game/GameOptions';
import Learn from '~/components/learn/Learn';
import ButtonBar from '~/components/buttons/ButtonBar';
import Score from '~/components/score/Score';
import Compose from '~/components/compose/Compose';

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
      backgroundColor: '#212121',

      // backgroundColor: '#6b5564',
      // background: 'linear-gradient(to bottom, #ba7ab4 0%, #020202 113%)',
      // background: 'linear-gradient(to bottom, #885680 9%, #050304 118%)',
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
                  {({...props, session   }) => (
                    <Learn {...props}>
                      {({ notes, check, currentNote, buttonDisabled }) => (    
                       <React.Fragment>
                         <Score score={session.score}/>
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
              <Paper className={classes.container} elevation={0} square={true}>
                <Stave>
                  {({ ...props, session }) => (
                    <Compose {...props}>
                 {({ cx, cy, mouseDown, mouseUp }) => (    
                       <React.Fragment>
                         <svg style={{width: '100%', background: 'white', height: '60px', marginTop: '30px',      webkitBoxShadow: '4px 7px 10px 3px rgba(0,0,0,0.75)',
      mozBoxShadow: '4px 7px 10px 3px rgba(0,0,0,0.75)',
      boxShadow: '4px 7px 10px 3px rgba(0,0,0,0.75)',
      borderRadius: '5px',}}>
      
      <ellipse
        cx={cx}
        cy={cy}
        rx="15"
        ry="10"
        stroke="black"
        fill="transparent"
        strokeWidth="3"
        style={{ cursor: 'pointer' }}
        onMouseDown={mouseDown}
        onMouseUp={mouseUp}
        draggable={true}
        onDragStart={()=>{console.log('hiii')}}
      />
      
      </svg>
                       </React.Fragment>
                      )}
                    </Compose>
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