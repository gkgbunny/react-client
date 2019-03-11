import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

function withLoaderAndMessage(PassedComponent) {
  return class ExtendedComponent extends React.Component {
    constructor(props) {
      super(props);
      this.state = {};
    }

    render() {
      const { loading, data } = this.props;
      if (loading === true && data.length !== 0) {
        return (
          <div>
            <CircularProgress />
          </div>
        );
      } if (loading === false && data.length > 0) {
        return (
          <div>
            <PassedComponent {...this.props} />
          </div>
        );
      } if (loading === true && data.length === 0) {
        return (
          <div>
            <CircularProgress />
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
