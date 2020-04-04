import React,{useState,useEffect}from 'react';
import {withRouter} from 'react-router'
import {connect} from 'react-redux'
import logo from 'assets/image/logo.png'
import './Header.less'

import {login} from '../InterviewerRedux'

const Header = (props) => {

  const [showMore,setShowMore] = useState(false)

  // 登陆 持久化
  const interviewerInfo = JSON.parse(sessionStorage.getItem('interviewerInfo'))
  if(interviewerInfo ){
    props.login(interviewerInfo)
    // 已登录且已经检测
    if(props.location.pathname ==='/'
      // && props.location.pathname !=='/interviewer/manage'
      // && props.location.pathname !=='/interviewer/room'
    ){
      props.history.push('/interviewer/manage')
    }
  }

  useEffect(() => {
    if(props.location.pathname === '/interviewer/room'){
      setShowMore(true)
    }
  },[props.location.pathname])

  return (
    <header className="layout_header">
      <div className='layout_left'>
        <img src={logo}/>&nbsp;&nbsp;在线面试&nbsp;&nbsp;
        {showMore && <span className='interview_round'>第1轮</span>}
      </div>
      {showMore && (<div className='layout_right'>
        <div className='interview_duration'><span>00:00:33</span></div> 
        <div className='candidate_info'>
          <i className='iconfont icon-user'></i>
          {interviewerInfo && interviewerInfo.name}
        </div> 
        <a className='btn sign_btn'>点击签到</a> 
        <a className='btn finish_btn'>退出面试房间</a> 
      </div>)}
    </header>
  );
};

export default connect(
  null,
  {
    login
  }
)(withRouter(Header));