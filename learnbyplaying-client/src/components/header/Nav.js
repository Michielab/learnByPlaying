import React, { Component } from 'react';
import { createStyles, withStyles, Paper } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";

const styles = theme =>
  createStyles({
    root: {
      backgroundColor: '#1F1F1F',
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
      <Paper className={classes.root}>
        <IconButton
          // className={classes.menuButton}
          color="inherit"
          aria-label="Menu"
        >
          <MenuIcon />
        </IconButton>
        <Link to="/">Home</Link>
        <Link to="/learning">Learning</Link>
        <div className={classes.text}>Learning</div>
        <Button classes={{ root: classes.button }}>Login </Button>
      </Paper>
    );
  }
}

Nav.propTypes = {
  classes: PropTypes.object
};

export default withStyles(styles)(Nav);