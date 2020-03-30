import { combineReducers } from 'redux';

import {reqLogin} from 'api'

/* NOTE: candidateList */
// action-types
const LOGIN = 'LOGIN'; 

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
export function login({id,name,phone}) { 
  return { 
    type:LOGIN, 
    id,
    name,
    phone,
  }; 
} 

// reducer
const initialInterviewerInfo = null
function interviewerInfo(state = initialInterviewerInfo, action) { 
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


/* NOTE: candidateList */

// action-types
const LOAD_CANDIDATE_LIST = 'LOAD_CANDIDATE_LIST'; 

import {reqCandidateList} from 'api'

// actionCreator
// 异步`action creator`(返回一个函数)
export const loadCandidateListAsync = ({id}) => {
  return dispatch => {
    // 面试官的姓名和电话，作为pk
    return reqCandidateList({id})
    .then((result) => {
      console.log(result)
      dispatch(loadCandidateList(result))
      return  result
    })
  }
}
export function loadCandidateList(candidateList) { 
  return { 
    type:LOAD_CANDIDATE_LIST, 
    data:candidateList
  }; 
} 

// reducer
const initialCandidateList = []; 
function candidateList(state = initialCandidateList, action) { 
  switch (action.type) { 
    case LOAD_CANDIDATE_LIST: { 
      return [...state,...action.data]
    } 
    default: 
      return state; 
  } 
} 


export default combineReducers({
  interviewerInfo,
  candidateList,
});