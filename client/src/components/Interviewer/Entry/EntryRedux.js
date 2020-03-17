
// action-types
const LOGIN = 'LOGIN'; 

import {reqLogin} from 'api'

// actionCreator
// 异步`action creator`(返回一个函数)
export const loginAsync = ({name,phone}) => {
  return dispatch => {
    console.log(6)
    reqLogin({name,phone})
    dispatch(login(result))
  }
}
export function login(name,phone) { 
  return { 
    type:LOGIN, 
    name,
    phone,
  }; 
} 

// reducer
const initialState = { 
  name:'',
  phone:'',
}; 
export default function interviewerInfo(state = initialState, action) { 
  switch (action.type) { 
    case LOGIN: { 
      return { 
        ...state, 
        name: action.name, 
        phone: action.phone, 
      }
    } 
    default: 
      return state; 
  } 
} 