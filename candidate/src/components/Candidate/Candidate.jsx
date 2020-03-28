import React from 'react';
import {Switch, Route, NavLink} from 'react-router-dom'

import Header from 'shared/Header'
import Footer from 'shared/Footer'
import CandidateEntry from './CandidateEntry/CandidateEntry'
import EquipmentCheck from 'shared/EquipmentCheck'
import Room from 'shared/Room/Room'
import './Candidate.less'
const Candidate = () => {
  return (
    <section className='candidate_box'>
      <Header/>
      <div className="candidate_body">
    <Switch>
      <Route exact path='/' component={CandidateEntry}/>
      <Route path='/candidate/login' component={CandidateEntry}/>
      <Route path='/candidate/equipmentCheck' component={EquipmentCheck}/>
      <Route path='/candidate/room' component={Room} />
    </Switch>
      </div>
      <Footer/>
    </section>
  )
}

export default Candidate;