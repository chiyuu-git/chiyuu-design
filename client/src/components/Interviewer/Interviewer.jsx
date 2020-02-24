import React from 'react';
import {Switch, Route} from 'react-router-dom'

import Header from 'views/Header'
import Footer from 'views/Footer'
import EquipmentCheck from 'views/EquipmentCheck/EquipmentCheck'
import Room from 'views/Room/Room'
import Manage from './Manage/Manage'

import './Interviewer.less'

const Interviewer = () => {
  return (
    <section className='interviewer_box'>
      <Header/>
      <div className="interviewer_body">
        <Switch>
          <Route exact path='/' component={Manage}/>
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