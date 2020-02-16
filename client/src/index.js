import React,{useRef,useEffect,useState} from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter, Switch, Route, NavLink} from 'react-router-dom'

import './index.less'
import logo from './assets/image/logo.png'

import CodeTest from './CodeTest'
import UploadFile from './UploadFile'
import EquipmentInfo from './EquipmentInfo'

function Frame(props) {
  return (
    <section className='candidate_room_container'>
      <div className="room_flexbox">
        <header className="room_header">
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
        <div className="room_body">
          <div className="answer_box">
            <BrowserRouter>
              <ul className='nav'>
                <li className='tab'><NavLink to='/codeTest' activeClassName='activeLink'>代码考核</NavLink></li>
                <li className='tab'><NavLink to='/uploadFile' activeClassName='activeLink'>文件演示</NavLink></li>
                <li className='tab'><NavLink to='/equipmentInfo' activeClassName='activeLink'>设备信息</NavLink></li>
              </ul>
              <Switch>
                <Route exact path='/' component={CodeTest}/>
                <Route path='/codeTest' component={CodeTest}/>
                <Route path='/uploadFile' component={UploadFile} />
                <Route path='/equipmentInfo' component={EquipmentInfo} />
              </Switch>
            </BrowserRouter>
          </div>
          <div className="chat_box">
            <div className='video_box'>
              <div className='video_btn'>
                <a className='icon_btn'><i className='iconfont icon-video'></i><span>视频通话</span></a>
                <i className='iconfont icon-interviewer'></i>
                <a className='icon_btn'><i className='iconfont icon-audio'></i><span>语音通话</span></a>
              </div>
              <div className='video_tip'>发起聊天前，建议先进行检测设备</div>
              <div className='video_toolbar'><i className='iconfont icon-fullscreen'></i></div>
            </div>
            <div className='interviewer_info'>
              <p>面试官 - 许可<span className='status'>离线</span></p>
              <p>
                <i className='iconfont icon-phone'></i>13724824476|
                <i className='iconfont icon-email'></i>邮箱
              </p>
            </div>
            <div className='text_discuss'>
              <div className='discuss_list'></div>
              <div className='discuss_toolbar'>
                <textarea placeholder="请输入聊天内容"></textarea>
                <p><a>常见问题</a><a>按回车键发送</a></p>
              </div>
            </div>
          </div>
        </div>
        <footer className="room_footer">logo 由XX提供</footer>
      </div>
    </section>
  )
}

ReactDOM.render(<Frame/>,document.getElementById('root'));