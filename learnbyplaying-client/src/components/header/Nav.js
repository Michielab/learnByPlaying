import React, { Component } from 'react';
import { createStyles, withStyles, Paper } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';

import SimpleMenu from '~/components/menu/SimpleMenu';

const styles = theme =>
  createStyles({
    root: {
      // backgroundColor: '#191414',
      backgroundColor: '#000',
      padding: '5px',
      height: '50px',
      color: 'rgba(255, 255, 255, 0.8)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    },
    text: { flexGrow: 1 },
    button: {
      borderColor: 'rgba(255, 255, 255, 0.8)',
      color: 'rgba(255, 255, 255, 0.8)',
      border: 'solid 1px',
      marginRight: '10px'
    }
  });

class Nav extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Paper className={classes.root} square={true}>
        {/* <IconButton
          // className={classes.menuButton}
          color="inherit"
          aria-label="Menu"
        >
          <MenuIcon />
        </IconButton> */}
        <SimpleMenu />
        {/* <Link to="/learn">Home</Link>
        <Link to="/learning">Learning</Link> */}
        {/* <div className={classes.text}>Learning</div> */}
        <Button classes={{ root: classes.button }}>Login </Button>
      </Paper>
    );
  }
}

Nav.propTypes = {
  classes: PropTypes.object
};

export default withStyles(styles)(Nav);
