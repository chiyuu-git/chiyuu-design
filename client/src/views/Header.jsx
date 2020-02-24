import React from 'react';
import logo from 'assets/image/logo.png'
import './Header.less'

const Header = () => {
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

export default Header;