import React,{createContext} from 'react';

import {BrowserRouter, Switch, Route, NavLink} from 'react-router-dom'
import CodeTest from './CodeTest/CodeTest'
import UploadFile from './UploadFile/UploadFile'
import Chat from './Chat/Chat'
import EquipmentInfo from './EquipmentInfo'

import './Room.less'

import wsCreator from './Chat/webSocket'

// NOTE:point，chat.jsx cm.jsx
// let myUsername = '高13724824476'
// let targetUsername = '张三12345678910'
// const connection = wsCreator(myUsername)

// export const ConnectionContext = new createContext(connection)

const Room = (props) => {
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
            <Route exact path='/' component={EquipmentInfo}/>
            <Route path='/candidate/room/codeTest' component={CodeTest}/>
            <Route path='/candidate/room/uploadFile' component={UploadFile} />
            <Route path='/candidate/room/equipmentInfo' component={EquipmentInfo} />
          </Switch>
        </BrowserRouter>
      </div>
      <Chat/>
    </section>
  );
};

export default Room;