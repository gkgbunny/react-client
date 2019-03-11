import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import green from '@material-ui/core/colors/green';

function withLoaderAndMessage(PassedComponent) {
  return class ExtendedComponent extends React.Component {
    constructor(props) {
      super(props);
      this.state = {};
    }

    render() {
      /* eslint-disable react/prop-types */
      const { loading, data } = this.props;
      if (loading) {
        return (
          <div text-align="center">
            <CircularProgress color={green[800]} />
          </div>
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
