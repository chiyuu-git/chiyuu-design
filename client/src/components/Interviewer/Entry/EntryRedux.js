
// action-types
const LOGIN = 'LOGIN'; 

// actionCreator
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