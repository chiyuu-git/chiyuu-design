import React,{useEffect,useContext} from 'react';
import {withRouter} from 'react-router'
import logo from 'assets/image/logo.png'
import './Header.less'

import {ConnectionContext} from '../Candidate'
import wsCreator from '../Room/Chat/webSocket'

const Header = (props) => {
  const {context,setContext} = useContext(ConnectionContext)

   // 登陆 持久化
  if(sessionStorage.getItem('info') 
    && context===null
    // && props.location.pathname!=='/candidate/equipmentCheck'
    ){
    const {candidateInfo,interviewerInfo} = JSON.parse(sessionStorage.getItem('info'))
    const connection = wsCreator(candidateInfo.id)
    const context = {connection,candidateInfo,interviewerInfo}
    setContext(context)
  }

  // context有值，而且已经检测设备，跳到room
  // 在context更新后跳转
  // useEffect(() => {
  //   // && props.location.pathname !== '/candidate/equipmentCheck'
  //   if(context!==null) props.history.push('/candidate/room')
  // },[context])

  return (
    <header className="layout_header">
      <div className='layout_left'>
        <img src={logo}/>&nbsp;&nbsp;在线面试&nbsp;&nbsp;
        <span className='interview_round'>第1轮</span> 
      </div>
      <div className='layout_right'>
        <div className='interview_duration'><span>00:00:33</span></div> 
        <div className='candidate_info'><i className='iconfont icon-user'></i>姓名</div> 
        <a className='btn sign_btn'>点击签到</a> 
        <a className='btn finish_btn'>退出面试房间</a> 
      </div>
    </header>
  );
};

export default withRouter(Header);