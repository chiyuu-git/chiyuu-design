import React,{useRef} from 'react';

import {NavLink} from 'react-router-dom'

import './Manage.less'

const Manage = () => {
  const editBtn = useRef()
  return (
    <section className='manage_box' >
      <div className="m_box">
        <header className="m_header">
          <div className="holder"></div>
          <div className="title">面试者管理</div>
          <div className="toolbar">
            <a className="search">
              <i className='iconfont icon-search'></i>
            </a>
            <a className="import">
              <i className='iconfont icon-import'></i>
            </a>
            <a className="sort">
              <i className='iconfont icon-sort'></i>
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
            <tr className='table_row'>
            <td><input type="text" defaultValue='张三'/></td>
            <td><input type="text" defaultValue='123456'/></td>
            <td><input type="text" defaultValue='123@123'/></td>
            <td><input type="text" defaultValue='2010-4-4'/></td>
            <td><input type="text" defaultValue='未开始'/></td>
            <td>
              <a className="table_btn" ref={editBtn} onClick={handleEditBtn}>编辑</a>
              <a className="table_btn">进入房间</a>
            </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Manage;