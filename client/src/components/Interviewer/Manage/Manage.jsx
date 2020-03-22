import React,{useRef,useState,useEffect} from 'react';

import { connect } from 'react-redux';
import { loadCandidateListAsync } from '../InterviewerRedux'; 

import './Manage.less'
import Row from './Row'
const Manage = (props) => {
  // props
  const {name,phone} = props.interviewerInfo
  const id = name + phone
  // hooks
  const fileInput = useRef()
  // name和phone不能为空，且id不能相同
  const [candidateList,setCandidateList] = useState([])

  // jsx
  const rows = candidateList.map((candidate) => {
    const {name,phone} = candidate
    return (
      <Row 
        key={name+phone}
        {...candidate}
      />
    )

  })

  // NOTE:调试用，临时
  useEffect(() => {
    props.loadCandidateListAsync({id})
  },[])

  useEffect(() => {
    setCandidateList([...candidateList,...props.candidateList])
  },[props.candidateList])
  
  function handleAdd(){
    setCandidateList([...candidateList,{
      name:'',phone:'',email:'',
      date:'2015/08/06',
      time:'08:00:00',
      status:'notStart'
    }])
    
  }
  
  function handleFile(e){
    const selectedFile = fileInput.current.files[0]
    const reader = new FileReader() //这里是核心！！！读取操作就是由它完成的。
    reader.readAsText(selectedFile) //读取文件的内容
    reader.onload = function(){
      console.log("读取结果：", this.result) //当读取完成之后会回调这个函数，然后此时文件的内容存储到了result中。直接操作即可。
      const list = JSON.parse(this.result)
      setCandidateList([...candidateList,...list])
    }
    // 同步到数据库
  }
  function handleImport(){
    fileInput.current.click()
  }
  function handleBatch(){
    
  }
  
  return (
    <section className='manage_box' >
      <div className="m_box">
        <header className="m_header">
          <div className="holder"></div>
          <div className="title">面试者管理</div>
          <div className="toolbar">
            <a className="add" onClick={handleAdd}>
              <i className='iconfont icon-add'></i>
            </a>
            <input type="file" ref={fileInput} style={{display:'none'}} onChange={handleFile}/>
            <a className="import" onClick={handleImport}>
              <i className='iconfont icon-import'></i>
            </a>
            <a className="batch" >
              <i className='iconfont icon-batch'></i>
            </a>
          </div>
        </header>
        <table className='candidate_table'>
          <thead>
            <tr className='table_header'>
              <th>姓名</th>
              <th>手机号码</th>
              <th>邮箱</th>
              <th>面试时间</th>
              <th>面试状态</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {rows}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default connect(
  state => ({
    interviewerInfo:state.interviewer.interviewerInfo,
    candidateList: state.interviewer.candidateList}
  ), 
  {
    loadCandidateListAsync,
  }
)(Manage); 