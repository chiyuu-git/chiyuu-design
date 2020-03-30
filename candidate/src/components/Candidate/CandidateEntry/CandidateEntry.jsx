import React,{useContext,useEffect} from 'react';
import './Entry.less'

import {reqInterviewerInfo} from 'api'
import wsCreator from '../Room/Chat/webSocket'


import {ConnectionContext} from '../Candidate'

const CandidateEntry = (props) => {
  
  const {context,setContext} = useContext(ConnectionContext)
  
  async function handleClick(){

    const candidateInfo = {
      id:user.value+phone.value,
      name:user.value,
      phone:phone.value
    }
    const interviewerInfo = await reqInterviewerInfo({id:candidateInfo.id})
    const connection = wsCreator(candidateInfo.id)
    const context = {connection,candidateInfo,interviewerInfo}
    setContext(context)
    // 同时保存到session storage中
    sessionStorage.setItem('info',JSON.stringify({candidateInfo,interviewerInfo}))
  }

  // 在context更新后跳转
  useEffect(() => {
    if(context!==null) props.history.push('/candidate/equipmentCheck')
  },[context])

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

export default CandidateEntry