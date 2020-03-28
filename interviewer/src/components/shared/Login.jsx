import React from 'react';

import PropTypes from 'prop-types';

import {NavLink} from 'react-router-dom'


const Login = (props) => {
  // DOM
/*   const formGroups = props.formGroups.map(fromGroup=>(
    <div className="form_group" key={fromGroup.id}>
      <label htmlFor="name" className='control_label'>{fromGroup.label}</label>
      <input type="text" name="name" id={fromGroup.id}/>
    </div>
  )) */

  return (
    <section className='login_box'>
      <form action="">
        <div className="input_box">
          {props.formGroups}
          <div className="form_group">
            <NavLink to='/candidate/equipmentCheck' className='btn confirm_info'>确定</NavLink>
          </div>
        </div>
      </form>
    </section>
  );
};

Login.propTypes = {
  // props
  formGroups:PropTypes.node.isRequired,
  // action
};

export default Login;