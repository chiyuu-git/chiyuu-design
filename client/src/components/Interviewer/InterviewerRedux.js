import { combineReducers } from 'redux';

// 引入 reducer 及 actionCreator
import interviewerInfo from './Entry/EntryRedux';
/* NOTE:公共redux */

// action-types
const LOAD_CANDIDATE_LIST = 'LOAD_CANDIDATE_LIST'; 

import {reqCandidateList} from 'api'

// actionCreator
// 异步`action creator`(返回一个函数)
export const loadCandidateListAsync = ({id}) => {
  return dispatch => {
    // 面试官的姓名和电话，作为pk
    reqCandidateList({id})
    .then((result) => {
      console.log(result)
      dispatch(loadCandidateList(result))
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
const initialState = []; 
function candidateList(state = initialState, action) { 
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