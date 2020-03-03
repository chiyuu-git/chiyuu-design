import React from 'react';
import {Switch, Route} from 'react-router-dom'

import Header from 'shared/Header'
import Footer from 'shared/Footer'
import Entry from './Entry/Entry'
import Manage from './Manage/Manage'
import EquipmentCheck from 'shared/EquipmentCheck'
import Room from 'shared/Room/Room'

import './Interviewer.less'

const Interviewer = () => {
  return (
    <section className='interviewer_box'>
      <Header/>
      <div className="interviewer_body">
        <Switch>
          <Route exact path='/' component={EquipmentCheck}/>
          <Route path='/interviewer/login' component={Entry}/>
          <Route path='/interviewer/manage' component={Manage}/>
          <Route path='/interviewer/equipmentCheck' component={EquipmentCheck}/>
          <Route path='/interviewer/room' component={Room} />
        </Switch>
      </div>
      <Footer/>
    </section>
  );
};

export default Interviewer;