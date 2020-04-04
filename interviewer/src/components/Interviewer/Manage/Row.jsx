import React,{useRef,useState,useEffect} from 'react';
import {NavLink} from 'react-router-dom'

import DatePicker from 'antd/es/date-picker' // 加载 JS
import Select from 'antd/es/select' // 加载 JS
import moment from 'moment'
import 'antd/es/date-picker/style'
import 'antd/es/select/style'
const { Option } = Select;
import './Row.less'



const Row = (props) => {
  // props
  const {name,phone,email,date,time,status,foreignKey} = props
  const {candidateList,updateCandidateAsync} = props
  // hooks
  const editBtn = useRef()
  const tableRow = useRef()
  const [info,setInfo] = useState({name,phone,email,date,time,status,foreignKey})
  const [editable,setEditable] = useState(false)
  // 如果已经检测过了，直接去room，否则去检测
  const path = {
    pathname:'/interviewer/room',
    state:info
  }
  // 通过add被新建的时候要editable
  useEffect(() => {
    if(name==='' || phone==='') handleEditBtn()
  },[])
  // Event handler
  function handleEditBtn(e){
    editBtn.current.classList.toggle('confirm_btn')
    tableRow.current.classList.toggle('editable')
    if(editable) editBtn.current.innerText = '编辑'
    else editBtn.current.innerText = '确定'
    setEditable(!editable)
    // 检查合法性，既可以在前端做也可以在后端做，哪个好呢？
    if(editable){
      // 同步到服务器
      updateCandidateAsync(info)
    }
  }
  function isLegal(){
    const {name,phone,email,date,time,status} = info

  }
  // input change
  function handleChange(evt) {
    const target = evt.target,
          {name,value} = target
    setInfo({...info,[name]:value})
  }
  function handleDateChange(val,dateString){
    const [date,time] = dateString.split(' ')
    setInfo({...info,date,time})
  }
  function handleSelectChange(status){
    setInfo({...info,status})
  }
  return (
    <tr className='table_row' ref={tableRow}>
      <td><input type="text" 
                 name='name' 
                 defaultValue={name} 
                 onChange={handleChange}
                 disabled={!editable}/></td>

      <td><input type="text" 
                 name='phone' 
                 defaultValue={phone}
                 onChange={handleChange} 
                 disabled={!editable}/></td>

      <td><input type="text" 
                 name='email' 
                 defaultValue={email}
                 onChange={handleChange} 
                 disabled={!editable}/></td>
      <td><DatePicker 
        defaultValue={moment(date, 'YYYY/MM/DD')}
        suffixIcon=''
        size='small'
        showTime={{defaultValue:moment(time, 'HH:mm:ss')}}
        name='date' 
        onChange={handleDateChange}
        disabled={!editable}
        />
      </td>
      <td>
        <Select 
          defaultValue={status || 'notStart'}
          size='small' 
          name='status'
          onChange={handleSelectChange}
          disabled={!editable}
        >
          <Option value="notStart">未开始</Option>
          <Option value="ing">面试中</Option>
          <Option value="end">已结束</Option>
        </Select>
      </td>
      <td>
        <a className="table_btn" ref={editBtn} onClick={handleEditBtn}>编辑</a>
        <NavLink className="table_btn" to={path}>进入房间</NavLink>
      </td>
    </tr>
  )
}

export default Row;