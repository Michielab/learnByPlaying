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
import { Link } from 'react-router-dom';

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
      height: '100%',
      backgroundColor: '#535353'
    },
    formControl: {
      display: 'flex'
    },
    form: {
      backgroundColor: '#212121',
      height: '40%',
      width: '40%',
      maxWidth: '650px',
      minWidth: '400px',
      minHeight: '200px',
      maxHeight: '400px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    },
    label: {
      color: 'rgba(255, 255, 255, 0.8)'
    },
    labelTitle: {
      textAlign: 'center',
      marginBottom: '20px',
      color: 'floralwhite',
      "& :focus": {
        color: 'red'
      }
    },
    activeTitle: {
      color: 'floralwhite !important'
    },
    activeSwitch: {
      color: '#F9D03B !important'
    },
    activeSwitchBar: {
      backgroundColor: '#F9D03B !important'
    },
    start: {
      backgroundColor: '#2FD566',
      color: '#FFFFFF'
    },
    link: {
      textAlign: 'center',
      textDecoration: 'none',
      marginTop: '20px'
    }
  });

class SwitchesGroup extends React.Component {
  state = {
    sharpsAndFlats: false,
    notesOutside: false
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  render() {
    const { classes, setGameOptions } = this.props;
    return (
      <Paper className={classes.conainer} square={true}>
        <Paper className={classes.form}>
          <FormControl component="fieldset" classes={{root: classes.formControl}}>
            <FormLabel component="legend"  classes={{root: classes.labelTitle, focused: classes.activeTitle}}>Choose your game</FormLabel>
            <FormGroup  >
              <FormControlLabel
               classes={{label: classes.label}}
                control={
                  <Switch
                  classes={{checked: classes.activeSwitch, bar: classes.activeSwitchBar}}
                    checked={this.state.sharpsAndFlats}
                    onChange={this.handleChange('sharpsAndFlats')}
                    value="sharps"
                  />
                }
                label="With sharps and flats"
              />
              <FormControlLabel
               classes={{label: classes.label}}
                control={
                  <Switch
                    classes={{checked: classes.activeSwitch, bar: classes.activeSwitchBar}}
                    checked={this.state.notesOutside}
                    onChange={this.handleChange('notesOutside')}
                    value="notesOutside"
                  />
                }
                label="Only notes on the stave"
              />
            </FormGroup>
            <Link to="/learning" className={classes.link}>
              <Button
                classes={{root: classes.start}}
                onClick={() =>
                  setGameOptions({
                    type: 'fKeySimple',
                    started: true,
                    ...this.state
                  })
                }
              >
                Start
              </Button>
            </Link>
          </FormControl>
        </Paper>
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
