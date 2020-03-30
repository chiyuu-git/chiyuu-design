import React from 'react';

import {BrowserRouter,Switch, Route, NavLink} from 'react-router-dom'

import Candidate from './components/Candidate/Candidate'

import './Frame.less'

const Frame = () => {
  return (
    <BrowserRouter>
      <Candidate/>
    </BrowserRouter>
  );
};

export default Frame;