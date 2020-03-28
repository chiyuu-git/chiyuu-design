import React,{useEffect} from 'react';
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'
import {getInterviewerIDAsync} from './CandidateEntryRedux'

import 'shared/Entry.less'

const CandidateEntry = (props) => {

  async function handleClick(){
    const myID = user.value+phone.value
    const result = await props.getInterviewerIDAsync({id:myID})
    const path = {
      pathname: '/candidate/room',
      query:result.id,
    }
    props.history.push(path)
  }
  return (
  <section className='entry_box'>
    <form action="">
      <div className="input_box">
      <div className="form_group" key='user'>
          <label htmlFor="user" className='control_label'>姓名</label>
          <input type="text" name="user" id='user' />
        </div>
        <div className="form_group" key='phone'>
          <label htmlFor="name" className='control_label'>手机号码</label>
          <input type="text" name="phone" id='phone'/>
        </div>
        <div className="form_group">
          <a onClick={handleClick} className='btn confirm_info'>确定</a>
        </div>
      </div>
    </form>
  </section>
  )
};

export default connect(
  null,
  {
    getInterviewerIDAsync
  }
)(CandidateEntry);