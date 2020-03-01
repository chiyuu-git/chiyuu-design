import React from 'react';

import {NavLink} from 'react-router-dom'

import './Manage.less'

const Manage = () => {
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
{/*         <ul className="candidate_list">
          <li className="list_header">
            <span className="name">姓名</span>
            <span className="phone">手机号码</span>
            <span className="email">邮箱</span>
            <span className="interview_time">面试时间</span>
            <span className="interview_status">面试状态</span>
          </li>
          <li className="candidate_info">
            <span className="name">张三</span>
            <span className="phone">123456</span>
            <span className="email">123@123.com</span>
            <span className="interview_time">2020-1-1</span>
            <span className="interview_status">未开始</span>
            <a className="btn enter">进入房间</a>
          </li>
        </ul> */}
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
            <td>张三</td>
            <td>123456</td>
            <td>123@123</td>
            <td>2020-1-1</td>
            <td>未开始</td>
            <td>进入房间</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Manage;