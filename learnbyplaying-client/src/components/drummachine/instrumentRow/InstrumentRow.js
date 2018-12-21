import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, createStyles, Button } from '@material-ui/core';

const styles = theme =>
  createStyles({
    button: {
      backgroundColor: '#212121',
      color: 'rgba(255, 255, 255, 0.8)',
      border: 'rgba(255, 255, 255, 0.8) solid 2px',
      borderRadius: '35%',
      height: '50px',
      width: '50px',
      '&:hover': {
        backgroundColor: '#212121'
      }
    }
  });

class InstrumentRow extends Component {
    render() {
        const { row, instrumentName, classes, steps, toggleStep } = this.props;
        console.log('insideRender', instrumentName)
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
              <span>{instrumentName}</span>
            </div>
            {steps.map((step, index) => (
              <Button
                key={instrumentName + index}
                onClick={() => toggleStep(index)}
                classes={{ root: classes.button }}
                style={{
                  backgroundColor: steps[index] === 0 ? '' : '#404572',
                  gridColumn: `${index + 2}
                 `,
                  gridRow: `row ${row} / span 1 `
                }}
              >
                {' '}
              </Button>
            ))}
          </React.Fragment>
        );
    }
}

InstrumentRow.propTypes = {

};

export default withStyles(styles)(InstrumentRow);