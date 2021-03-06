import React from 'react';
import { createStyles, withStyles } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from 'react-router-dom';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const styles = theme =>
  createStyles({
    container: { flexGrow: 1 },
    button: {
      borderColor: 'rgba(255, 255, 255, 0.8)',
      color: 'rgba(255, 255, 255, 0.8)',
      border: 'solid 1px',
      marginRight: '10px'
    },
    link: {
      textDecoration: 'none',
      color: '#191414',
      '&:focus': {
        outline: 'initial'
      }
    },
    menu: {
      // width: '100px'
    }
  });

class SimpleMenu extends React.Component {
  state = {
    anchorEl: null
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl } = this.state;
    const { classes } = this.props;
    return (
      <div className={classes.container}>
        <IconButton
          aria-owns={anchorEl ? 'simple-menu' : null}
          aria-haspopup="true"
          onClick={this.handleClick}
          color="inherit"
        >
          <MenuIcon />
        </IconButton>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
          classes={{ paper: classes.menu }}
        >
          {/* <MenuItem onClick={this.handleClose}>Profile</MenuItem> */}

            <Link to="/" className={classes.link}>
          <MenuItem onClick={this.handleClose}>
              Home
          </MenuItem>
            </Link>
            <Link to="/learn" className={classes.link}>
          <MenuItem onClick={this.handleClose}>
              Learn
          </MenuItem>
            </Link>
            <Link to="/compose" className={classes.link}>
          <MenuItem onClick={this.handleClose}>
              Compose
          </MenuItem>
            </Link>
        </Menu>
      </div>
    );
  }
}

export default withStyles(styles)(SimpleMenu);
