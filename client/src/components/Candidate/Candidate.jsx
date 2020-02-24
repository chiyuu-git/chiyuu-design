import React from 'react';
import {Switch, Route, NavLink} from 'react-router-dom'

import Header from 'views/Header'
import Footer from 'views/Footer'
import Login from 'views/Login/Login'
import EquipmentCheck from 'views/EquipmentCheck/EquipmentCheck'
import Room from 'views/Room/Room'
import './Candidate.less'
const Candidate = () => {
  return (
    <section className='candidate_box'>
      <Header/>
      <div className="candidate_body">
        <Switch>
          <Route exact path='/candidate' component={Login}/>
          <Route path='/candidate/login' component={Login}/>
          <Route path='/candidate/equipmentCheck' component={EquipmentCheck}/>
          <Route path='/candidate/room' component={Room} />
        </Switch>
      </div>
      <Footer/>
    </section>
  )
}

export default Candidate;