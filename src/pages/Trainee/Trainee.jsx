import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { TraineeList, TraineeDetail } from './index';

const Trainee = () => (
  <>
    <Router>
      <Switch>
        <Route exact path="/trainee" component={TraineeList} />
        <Route exact path="/trainee/:id" component={TraineeDetail} />
      </Switch>
    </Router>
  </>
);
export default Trainee;
