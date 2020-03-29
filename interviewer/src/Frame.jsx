import React from 'react';

import {BrowserRouter,Switch, Route, NavLink} from 'react-router-dom'

import Interviewer from './components/Interviewer/Interviewer'

import './Frame.less'

const Frame = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Interviewer}/>
        <Route path='/interviewer' component={Interviewer}/>
      </Switch>
    </BrowserRouter>
  );
};

export default Frame;