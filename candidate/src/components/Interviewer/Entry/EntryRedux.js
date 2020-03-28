
// action-types
const LOGIN = 'LOGIN'; 

import {reqLogin} from 'api'

// actionCreator
// 异步`action creator`(返回一个函数)
export const loginAsync = ({name,phone}) => {
  return dispatch => {
    reqLogin({name,phone})
    .then((result) => {
      console.log(result)
      dispatch(login(result))
    })
    
  }
}
export function login({pk:id,name,phone}) { 
  return { 
    type:LOGIN, 
    id,
    name,
    phone,
  }; 
} 

// reducer
const initialState = { 
  name:'高',
  phone:'13724824476',
}; 
export default function interviewerInfo(state = initialState, action) { 
  switch (action.type) { 
    case LOGIN: { 
      return { 
        ...state, 
        id:action.id,
        name: action.name, 
        phone: action.phone, 
      }
    } 
    default: 
      return state; 
  } 
} 