import React from 'react';

import {NavLink} from 'react-router-dom'

import './Login.less'

const Login = () => {
  return (
    <section className='login_box'>
      <form action="">
        <div className="input_box">
          <div className="form_group">
            <label htmlFor="name" className='control_label'>姓名</label>
            <input type="text" name="name" id="name"/>
          </div>
          <div className="form_group">
            <label htmlFor="phone" className='control_label'>手机号码</label>
            <input type="text" name="phone" id="phone"/>
          </div>
          <div className="form_group">
            <label htmlFor="roomID" className='control_label'>房间号</label>
            <input type="text" name="roomID" id="roomID"/>
          </div>
          <div className="form_group">
            <label htmlFor="room_password" className='control_label'>房间密码</label>
            <input type="text" name="room_password" id="room_password"/>
          </div>
          <div className="form_group">
            <NavLink to='/candidate/equipment' className='btn confirm_info'>确定</NavLink>
          </div>
        </div>
      </form>
    </section>
  );
};

export default Login;