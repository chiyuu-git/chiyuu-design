import React,{useRef,useState,useEffect} from 'react';

import {NavLink} from 'react-router-dom'

import './Manage.less'
import Row from './Row'
const Manage = () => {

  useEffect(() => {

  },[])
  function handelBatch(){
    
  }

  function handleAdd(){
    
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
            <a className="import">
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
            <Row/>
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Manage;