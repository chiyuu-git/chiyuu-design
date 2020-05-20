import React, { useState, createContext, useEffect } from 'react';
import { Switch, Route, } from 'react-router-dom'

import Header from './shared/Header'
import Footer from './shared/Footer'
import CandidateEntry from './CandidateEntry/CandidateEntry'
import EquipmentCheck from './EquipmentCheck/EquipmentCheck'
import Room from './Room/Room'
import './Candidate.less'


export let ConnectionContext = new createContext()

const Candidate = (props) => {
  const [context, setContext] = useState(null)

  return (
    <ConnectionContext.Provider value={{ context, setContext }}>
      <section className='candidate_box'>
        <Header />
        <div className="candidate_body">
          <Switch>
            <Route exact path='/' component={CandidateEntry} />
            <Route path='/candidate/login' component={CandidateEntry} />
            <Route path='/candidate/equipmentCheck' component={EquipmentCheck} />
            <Route path='/candidate/room' component={Room} />
          </Switch>
        </div>
        <Footer />
      </section>
    </ConnectionContext.Provider>
  )
}

export default Candidate;