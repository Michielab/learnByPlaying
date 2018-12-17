import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withStyles, WithStyles, createStyles, Theme } from '@material-ui/core';
import { Button } from '@material-ui/core';

const styles = theme =>
  createStyles({
    button: {
      backgroundColor: '#212121',
      color: 'rgba(255, 255, 255, 0.8)',
      border: 'rgba(255, 255, 255, 0.8) solid 2px',
      borderRadius: '35%',
      height: '50px',
      width: '50px',
      //   webkitBoxShadow: '4px 7px 10px 3px rgba(0,0,0,0.75)',
      //   mozBoxShadow: '4px 7px 10px 3px rgba(0,0,0,0.75)',
      //   boxShadow: '4px 7px 10px 3px rgba(0,0,0,0.75)',
      //   margin: '0 10px',
      '&:hover': {
        backgroundColor: '#212121'
      }
    }
  });

class InstrumentRow extends React.Component {
  state = { steps: [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0] };
  render() {
    const {
      typeOfInstrument,
      instrumentArray,
      row,
      toggleStep,
      name,
      classes,
      lastRow = false,
      currentStep = undefined
    } = this.props;
    return (
      <React.Fragment>
        <div
          style={{
            gridColumn: 1,
            gridRow: `row ${row} / span 1 `,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: '10px',
            color: 'floralwhite'
          }}
        >
          <span>{name}</span>
        </div>
        {instrumentArray.map((step, index) => (
          <React.Fragment key={typeOfInstrument + index}>
            <Button
              onClick={() => toggleStep(typeOfInstrument, index)}
              classes={{ root: classes.button }}
              style={{
                backgroundColor: instrumentArray[index] === 0 ? '' : '#404572',
                gridColumn: `${index + 2}
             `,
                gridRow: `row ${row} / span 1 `
              }}
            >
              {' '}
            </Button>
            {lastRow && (
              <span
                key={'steps' + index}
                style={{
                  color: 'floralwhite',
                  textAlign: 'center',
                  borderRadius: '5px',
                  backgroundColor:
                    currentStep % instrumentArray.length === index
                      ? '#2AB859'
                      : '',
                  gridColumn: `${index + 2}
         
                  
               `,
                  gridRow: '9 / span 1 '
                }}
              >
                {index + 1}
              </span>
            )}
          </React.Fragment>
        ))}
      </React.Fragment>
    );
  }
}

InstrumentRow.propTypes = {
  instrumentArray: PropTypes.array,
  typeOfInstrument: PropTypes.string,
  row: PropTypes.number,
  toggleStep: PropTypes.func,
  lastRow: PropTypes.bool,
  currentStep: PropTypes.number
};

export default withStyles(styles)(InstrumentRow);
