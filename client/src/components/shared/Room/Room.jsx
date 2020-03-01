import React from 'react';

import {BrowserRouter, Switch, Route, NavLink} from 'react-router-dom'

import './Room.less'


import CodeTest from './CodeTest'
import UploadFile from './UploadFile'
import EquipmentInfo from './EquipmentInfo'

const Room = () => {
  return (
    <section className="room_box">
          <div className="answer_box">
            <BrowserRouter>
              <ul className='nav'>
                <li className='tab'><NavLink to='/candidate/room/codeTest' activeClassName='activeLink'>代码考核</NavLink></li>
                <li className='tab'><NavLink to='/candidate/room/uploadFile' activeClassName='activeLink'>文件演示</NavLink></li>
                <li className='tab'><NavLink to='/candidate/room/equipmentInfo' activeClassName='activeLink'>设备信息</NavLink></li>
              </ul>
              <Switch>
                <Route exact path='/candidate/room' component={CodeTest}/>
                <Route path='/candidate/room/codeTest' component={CodeTest}/>
                <Route path='/candidate/room/uploadFile' component={UploadFile} />
                <Route path='/candidate/room/equipmentInfo' component={EquipmentInfo} />
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
        </section>
  );
};

export default Room;