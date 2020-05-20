import React, { useState, useEffect, useContext } from 'react';
import { withRouter } from 'react-router'
import logo from 'assets/image/logo.png'
import './Header.less'

import { ConnectionContext } from '../Candidate'
import wsCreator from '../Room/Chat/webSocket'

const Header = (props) => {
  const { context, setContext } = useContext(ConnectionContext)
  const [showMore, setShowMore] = useState(false)

  // 登陆 持久化
  if (sessionStorage.getItem('info')) {
    const { candidateInfo, interviewerInfo, equipmentStatus } = JSON.parse(sessionStorage.getItem('info'))
    if (equipmentStatus && props.location.pathname === '/') {
      // storage有值 而且 检测通过 而且 在登陆页，直接跳到room
      props.history.push('/candidate/room')
    }
    if (context === null) {
      const connection = wsCreator(candidateInfo.id, interviewerInfo.id)
      const context = { connection, candidateInfo, interviewerInfo, equipmentStatus }
      setContext(context)
    }
  }

  useEffect(() => {
    if (props.location.pathname === '/candidate/room') {
      setShowMore(true)
    }
  }, [props.location.pathname])


  return (
    <header className="layout_header">
      <div className='layout_left'>
        <img src={logo} />&nbsp;&nbsp;在线面试&nbsp;&nbsp;
        {showMore && <span className='interview_round'>第1轮</span>}
      </div>
      {showMore && (<div className='layout_right'>
        <div className='interview_duration'>{/* <span>00:00:33</span> */}</div>
        <div className='candidate_info'>
          <i className='iconfont icon-user'></i>
          {context && context.candidateInfo.name}
        </div>
        {/* <a className='btn sign_btn'>点击签到</a>  */}
        <a className='btn finish_btn'>退出面试房间</a>
      </div>)}
    </header>
  );
};

export default withRouter(Header);