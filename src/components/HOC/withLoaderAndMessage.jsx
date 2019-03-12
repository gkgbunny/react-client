import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import green from '@material-ui/core/colors/green';
import PropTypes from 'prop-types';

function withLoaderAndMessage(PassedComponent) {
  return class ExtendedComponent extends React.Component {
    constructor(props) {
      super(props);
      this.state = {};
    }

    render() {
      ExtendedComponent.propTypes = {
        loading: PropTypes.bool.isRequired,
        data: PropTypes.objectOf.isRequired,
      };
      const { loading, data } = this.props;
      if (loading) {
        return (
          <center>
            <CircularProgress style={{ color: green[800] }} />
          </center>
        );
      } if (!loading && data.length > 0) {
        return (
          <div>
            <PassedComponent {...this.props} />
          </div>
        );
      }
      return (
        <h1>Oops!! No more Trainees</h1>
      );
    }
  };
}

export default withLoaderAndMessage;
