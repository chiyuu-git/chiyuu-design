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
  const {name,phone,email,date,time,status} = props
  // hooks
  const editBtn = useRef()
  const tableRow = useRef()
  const [info,setInfo] = useState({name,phone,email,date,time,status})
  const [editable,setEditable] = useState(false)
  // 如果已经检测过了，直接去room，否则去检测
  const path = {
    pathname:'/interviewer/room',
    state:info
  }
  useEffect(() => {
    // 当name,phone 其中一个为空的时候，editable
    if(name==='' || phone==='') handleEditBtn()
  },[])

  // Event handler
  function handleEditBtn(e){
    editBtn.current.classList.toggle('confirm_btn')
    tableRow.current.classList.toggle('editable')
    if(editable) editBtn.current.innerText = '编辑'
    else editBtn.current.innerText = '确定'
    setEditable(!editable)
    // 同步到数据库
    if(editable){

    }
  }
  function handleChange(value) {
    console.log(`selected ${value}`)
  }

  return (
    <tr className='table_row' ref={tableRow}>
      <td><input type="text" defaultValue={name} disabled={!editable}/></td>
      <td><input type="text" defaultValue={phone} disabled={!editable}/></td>
      <td><input type="text" defaultValue={email} disabled={!editable}/></td>
      <td><DatePicker 
        defaultValue={moment(date, 'YYYY/MM/DD')}
        suffixIcon=''
        size='small'
        showTime={{defaultValue:moment(time, 'HH:mm:ss')}}
        disabled={!editable}
        onChange={handleChange}
        />
      </td>
      <td>
        <Select 
          defaultValue={status || 'notStart'}
          size='small' 
          onChange={handleChange}
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