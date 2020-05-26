import React, { useContext, useEffect } from 'react';
import './Entry.less'

import { reqInterviewerInfo } from 'api'
import wsCreator from '../Room/Chat/webSocket'


import { ConnectionContext } from '../Candidate'

const CandidateEntry = (props) => {

  const { context, setContext } = useContext(ConnectionContext)

  async function handleClick() {

    const candidateInfo = {
      id: user.value + phone.value,
      name: user.value,
      phone: phone.value
    }
    let interviewerInfo = null
    try {
      interviewerInfo = await reqInterviewerInfo({ id: candidateInfo.id })
      interviewerInfo.id = interviewerInfo.pk
      const connection = wsCreator(candidateInfo.id, interviewerInfo.id)
      const context = { connection, candidateInfo, interviewerInfo, equipmentStatus: false }
      setContext(context)
      // 同时保存到session storage中
      sessionStorage.setItem('info', JSON.stringify({ candidateInfo, interviewerInfo }))
    } catch (error) {
      console.log(error)
      if (!interviewerInfo) alert('面试者信息不存在')
    }
  }

  // 在context更新后跳转
  useEffect(() => {
    if (context !== null) props.history.push('/candidate/equipmentCheck')
  }, [context])

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
            <input type="text" name="phone" id='phone' />
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