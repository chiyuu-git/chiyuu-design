import React ,{useState}from 'react';
import {NavLink} from 'react-router-dom'
import { connect } from 'react-redux'; 
import { loginAsync } from './EntryRedux';
import { loadCandidateListAsync } from '../InterviewerRedux';

const Entry = (props) => {
  const [form,setForm] = useState({
    name:'',
    phone:null,
  })

  const handleChange = (e) => {
    setForm({...form,[e.target.id]:e.target.value})
  }

  const handelClick = (e) => {
    const {name,phone} = form
    props.loginAsync({name,phone})
    // 同时加载候选者名单，便于manage显示
    props.loadCandidateListAsync({id:name+phone})
  }
  
  return (
    <section className='entry_box'>
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
        <div className="form_group">
          <NavLink 
            to='/interviewer/manage' 
            className='btn confirm_info'
            onClick={handelClick}>
              确定
          </NavLink>
        </div>
      </div>
    </form>
  </section>
  )
}


export default connect(
  null,
  {
    loginAsync,
    loadCandidateListAsync,
  }
)(Entry); 