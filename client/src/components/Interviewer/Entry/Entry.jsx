import React ,{useState}from 'react';
import {NavLink} from 'react-router-dom'
import { connect } from 'react-redux'; 
import { login } from './EntryRedux';

const Entry = (props) => {
  const [form,setForm] = useState({
    name:'',
    phone:null,
  })

  const handleChange = (e) => {
    setForm({...form,[e.target.id]:e.target.value})
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
            to='/candidate/equipmentCheck' 
            className='btn confirm_info'
            onClick={e=>{
              props.login(form.name,form.phone)
              console.log(1)
            }}>
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
  {login}
)(Entry); 