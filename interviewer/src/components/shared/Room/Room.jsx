import React,{createContext} from 'react';
import {BrowserRouter, Switch, Route, NavLink} from 'react-router-dom'
import {connect} from 'react-redux'

import CodeTest from './CodeTest/CodeTest'
import UploadFile from './UploadFile/UploadFile'
import Chat from './Chat/Chat'
import EquipmentInfo from './EquipmentInfo'

import './Room.less'

import wsCreator from './Chat/webSocket'

export const ConnectionContext = new createContext(null)

const Room = (props) => {
  const candidateInfo = JSON.parse(props.match.params.info)
  const interviewerInfo = props.interviewerInfo
  const connection = wsCreator(interviewerInfo.name+interviewerInfo.phone)

  return (
    <ConnectionContext.Provider value={{connection,candidateInfo,interviewerInfo}}>
      <section className="room_box">
        <div className="answer_box">
          <BrowserRouter>
            <ul className='nav'>
              <li className='tab'><NavLink to='/interviewer/room/codeTest' activeClassName='activeLink'>代码考核</NavLink></li>
              <li className='tab'><NavLink to='/interviewer/room/uploadFile' activeClassName='activeLink'>文件演示</NavLink></li>
              <li className='tab'><NavLink to='/interviewer/room/equipmentInfo' activeClassName='activeLink'>设备信息</NavLink></li>
            </ul>
            <Switch>
              <Route exact path='/interviewer/room' component={CodeTest}/>
              <Route path='/interviewer/room/codeTest' component={CodeTest}/>
              <Route path='/interviewer/room/uploadFile' component={UploadFile} />
              <Route path='/interviewer/room/equipmentInfo' component={EquipmentInfo} />
            </Switch>
          </BrowserRouter>
        </div>
        <Chat/>
      </section>
    </ConnectionContext.Provider>
  );
};

export default connect(
  state=>({
    interviewerInfo:state.interviewer.interviewerInfo
  })
)(Room);