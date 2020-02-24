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
        <div className="candidate_list"></div>
      </div>
    </section>
  );
};

export default Manage;