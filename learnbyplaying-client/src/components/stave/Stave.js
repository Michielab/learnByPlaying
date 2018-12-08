import React, { Component } from 'react';
import NoteLine from '~/components/notes/NoteLine';
import Gsleutel from '~/Gsleutel.jpg';
import { withStyles, createStyles } from '@material-ui/core';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  addPoints,
  deductPoints,
  setGameOptions
} from '~/ducks/actions/actions';

const mapStateToProps = state => {
  return {
    session: state.session
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    { addPoints, deductPoints, setGameOptions },
    dispatch
  );
};

const styles = theme =>
  createStyles({
    staveContainer: {
      backgroundColor: 'white',
      // height: '40%',
      height: '40%',
      // width: '50%',
      width: '90%',
      minWidth: '400px',
      minHeight: ' 300px',
      // maxWidth: '650px',
      // maxHeight: '400px',
      webkitBoxShadow: '4px 7px 10px 3px rgba(0,0,0,0.75)',
      mozBoxShadow: '4px 7px 10px 3px rgba(0,0,0,0.75)',
      boxShadow: '4px 7px 10px 3px rgba(0,0,0,0.75)',
      borderRadius: '5px',
      // marginTop: '200px'
         marginTop: '20px'
    },
    stave: {
      width: '100%',
      height: '100%',
      minHeight: '298px'
    }
  });

class Stave extends Component {
  container;
  constructor(props) {
    super(props);
    this.state = {
      width: '',
      height: ''
    };
  }

  componentDidMount() {
    this.update();
    window.addEventListener('resize', this.update);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.update);
  }

  containerRef = ref => {
    this.container = ref;
  };

  update = () => {
    const width = this.container.offsetWidth;
    const height = this.container.offsetHeight;
    this.setState({
      width,
      height
    });
  };

  render() {
    const { width, height } = this.state;
    const { classes, session } = this.props;
    const middle = height / 2;
    let divider, end;
    width > 8000 ? (end = 800 - 50) : (end = width - 50);
    height < 125 ? (divider = 15) : (divider = 25);
    const vertices = [
      [[50, middle - divider * 2], [end, middle - divider * 2]],
      [[50, middle - divider], [end, middle - divider]],
      [[50, middle], [end, middle]],
      [[50, middle + divider], [end, middle + divider]],
      [[50, middle + divider * 2], [end, middle + divider * 2]]
    ];
    return (
      <div
        className={classes.staveContainer}
        ref={this.containerRef}
        id="staveContainer"
      >
        <svg className={classes.stave} id="test" >
          <image
            href={Gsleutel}
            x="0"
            y="0"
            style={{ height: height, width: '170px' }}
          />
          {vertices.map((vertice, index) => (
            <NoteLine key={index} vertices={vertice} />
          ))}
          {width &&
            this.props.children({
              middle,
              divider,
              width,
              height,
              session: session,
              ...this.props
            })}
        </svg>
      </div>
      
    );
  }
}

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Stave)
);
