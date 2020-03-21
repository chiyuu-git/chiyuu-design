import React,{useRef,useState} from 'react';

import DatePicker from 'antd/es/date-picker' // 加载 JS
import Select from 'antd/es/select' // 加载 JS
import moment from 'moment'
import 'antd/es/date-picker/style'
import 'antd/es/select/style'
const { Option } = Select;

import './Row.less'

const Row = () => {
  const editBtn = useRef()
  const tableRow = useRef()
  const [editable,setEditable] = useState(false)

  // Event handler
  function handleEditBtn(e){
    setEditable(!editable)
    editBtn.current.classList.toggle('confirm_btn')
    tableRow.current.classList.toggle('editable')
    if(!editable) editBtn.current.innerText = '编辑'
    else editBtn.current.innerText = '确定'
  }
  function handleChange(value) {
    console.log(`selected ${value}`);
  }

  return (
    <tr className='table_row' ref={tableRow}>
      <td><input type="text" defaultValue='张三' disabled={!editable}/></td>
      <td><input type="text" defaultValue='12345678910' disabled={!editable}/></td>
      <td><input type="text" defaultValue='imperkings@outlook.com' disabled={!editable}/></td>
      <td><DatePicker 
        defaultValue={moment('2015/01/01', 'YYYY/MM/DD')}
        suffixIcon=''
        size='small'
        showTime
        disabled={!editable}
        />
      </td>
      <td>
        <Select 
          defaultValue="未开始" 
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
        <a className="table_btn">进入房间</a>
      </td>
    </tr>
  );
};

export default Row;