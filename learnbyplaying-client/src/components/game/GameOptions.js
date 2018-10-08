import React from 'react';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Switch from '@material-ui/core/Switch';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setGameOptions } from '~/ducks/actions/actions';
import Paper from '@material-ui/core/Paper';
import { withStyles, createStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom";

const mapStateToProps = state => {
  return {
    session: state.session
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ setGameOptions }, dispatch);
};

const styles = theme =>
  createStyles({
    conainer: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%'
    }
  });

class SwitchesGroup extends React.Component {
  state = {
    sharpsAndFlats: false,
    notesOutside: false,
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  render() {
    const { classes, setGameOptions } = this.props;
    return (
      <Paper className={classes.conainer}>
        <FormControl component="fieldset">
          <FormLabel component="legend">Choose your game</FormLabel>
          <FormGroup>
            <FormControlLabel
              control={
                <Switch
                  checked={this.state.sharpsAndFlats}
                  onChange={this.handleChange('sharpsAndFlats')}
                  value="sharps"
                />
              }
              label="With sharps and flats"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={this.state.notesOutside}
                  onChange={this.handleChange('notesOutside')}
                  value="notesOutside"
                />
              }
              label="Only notes on the stave"
            />
          </FormGroup>
          <Link to="/learning">
            <Button
              onClick={() =>
                setGameOptions({ type: 'fKeySimple', started: true, ...this.state })
              }
            >
              Start
            </Button>
          </Link>
        </FormControl>
      </Paper>
    );
  }
}

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(SwitchesGroup)
);
