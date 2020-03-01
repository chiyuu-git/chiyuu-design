import React from 'react';
import {NavLink} from 'react-router-dom'

import 'shared/Entry.less'
const Entry = () => {
  const formGroups = [
    {id:'name',label:'姓名'},
    {id:'phone',label:'手机号码'},
    {id:'roomID',label:'房间号'},
    {id:'room_password',label:'房间密码'},
  ]
  return (
  <section className='login_box'>
    <form action="">
      <div className="input_box">
      <div className="form_group" key='name'>
          <label htmlFor="name" className='control_label'>姓名</label>
          <input type="text" name="name" id='name' onChange={handleChange}/>
        </div>
        <div className="form_group" key='phone'>
          <label htmlFor="name" className='control_label'>手机号码</label>
          <input type="text" name="phone" id='phone' onChange={handleChange}/>
        </div>
        <div className="form_group" key='roomID'>
          <label htmlFor="name" className='control_label'>房间号</label>
          <input type="text" name="phone" id='roomID' onChange={handleChange}/>
        </div>
        <div className="form_group" key='room_password'>
          <label htmlFor="name" className='control_label'>房间密码</label>
          <input type="text" name="phone" id='room_password' onChange={handleChange}/>
        </div>
        <div className="form_group">
          <NavLink to='/candidate/equipmentCheck' className='btn confirm_info'>确定</NavLink>
        </div>
      </div>
    </form>
  </section>
  )
};

export default Entry;