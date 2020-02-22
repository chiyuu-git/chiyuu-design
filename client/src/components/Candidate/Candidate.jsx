import React from 'react';
import {Switch, Route, NavLink} from 'react-router-dom'

import logo from 'assets/image/logo.png'

import Login from './Login/Login'
import EquipmentCheck from './EquipmentCheck/EquipmentCheck'
import Room from './Room/Room'
import './Candidate.less'
const Candidate = () => {
  return (
    <div className='candidate_box'>
      <header className="candidate_header">
        <div className='header_left'>
          <img src={logo}/>&nbsp;&nbsp;在线面试&nbsp;&nbsp;
          <span className='interview_round'>第1轮</span> 
        </div>
        <div className='header_right'>
          <div className='interview_duration'><span>00:00:33</span></div> 
          <div className='candidate_info'><i className='iconfont icon-user'></i>姓名</div> 
          <a className='btn sign_btn'>点击签到</a> 
          <a className='btn finish_btn'>退出面试房间</a> 
        </div>
      </header>
      <div className="candidate_body">
        <Switch>
          <Route exact path='/' component={EquipmentCheck}/>
          <Route path='/candidate/login' component={Login}/>
          <Route path='/candidate/equipmentCheck' component={EquipmentCheck}/>
          <Route path='/candidate/room' component={Room} />
        </Switch>
      </div>
      <footer className="candidate_footer">logo 由XX提供</footer>
    </div>
  )
}

export default Candidate;