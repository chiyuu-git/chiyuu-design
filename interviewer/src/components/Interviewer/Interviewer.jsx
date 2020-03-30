import React from 'react';
import {Switch, Route} from 'react-router-dom'

import Header from './shared/Header'
import Footer from './shared/Footer'
import Entry from './Entry/Entry'
import Manage from './Manage/Manage'
import EquipmentCheck from './EquipmentCheck/EquipmentCheck'
import Room from './Room/Room'
import './Interviewer.less'

const Interviewer = (props) => {
  return (
    <section className='interviewer_box'>
      <Header/>
      <div className="interviewer_body">
        <Switch>
          <Route exact path='/' component={Entry}/>
          <Route path='/interviewer/login' component={Entry}/>
          <Route path='/interviewer/manage' component={Manage}/>
          <Route path='/interviewer/equipmentCheck' component={EquipmentCheck}/>
          <Route path='/interviewer/room' component={Room} />
        </Switch>
      </div>
      <Footer/>
    </section>
  )
}

export default Interviewer