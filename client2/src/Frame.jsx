import React from 'react';

import {BrowserRouter,Switch, Route, NavLink} from 'react-router-dom'

import Candidate from './components/Candidate/Candidate'
import Interviewer from './components/Interviewer/Interviewer'

import './Frame.less'

const Frame = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Candidate}/>
        <Route path='/interviewer' component={Interviewer}/>
        <Route path='/candidate' component={Candidate}/>
      </Switch>
    </BrowserRouter>
  );
};

export default Frame;