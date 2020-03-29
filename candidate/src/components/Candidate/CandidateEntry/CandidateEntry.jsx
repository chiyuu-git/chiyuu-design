import React,{useContext} from 'react';
import './Entry.less'

import {reqInterviewerInfo} from 'api'
import wsCreator from '../Room/Chat/webSocket'


import {ConnectionContext} from '../Candidate'

const CandidateEntry = (props) => {
  
  const {setContext} = useContext(ConnectionContext)
  
  async function handleClick(){

    // NOTE:point，chat.jsx cm.jsx
    const myID = user.value+phone.value,
          myName = user.value
    const targetInfo = await reqInterviewerInfo({id:myID})
    const targetID = targetInfo.pk
    const connection = wsCreator(myID)
    setContext({connection,myID,myName,targetID,targetInfo})
    props.history.push('/candidate/equipmentCheck')
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

export default CandidateEntry