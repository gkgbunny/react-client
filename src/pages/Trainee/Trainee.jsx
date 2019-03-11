import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import { TraineeList, TraineeDetail } from './index';
import { NoMatch } from '../NoMatch';

const Trainee = (props) => {
  const { match } = props;
  return (
    <>
      <Router>
        <Switch>
          <Route exact path={`${match.path}`} component={TraineeList} />
          <Route exact path={`${match.path}/:id`} component={TraineeDetail} />
          <Route path={`${match.path}/`} component={NoMatch} />
        </Switch>
      </Router>
    </>
  );
};
Trainee.propTypes = {
  match: PropTypes.objectOf.isRequired,
};
export default Trainee;
