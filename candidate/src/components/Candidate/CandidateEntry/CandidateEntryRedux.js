
// action-types
const GET_INTERVIEWER_ID = 'GET_INTERVIEWER_ID'; 



// actionCreator
// 异步`action creator`(返回一个函数)
export const getInterviewerIDAsync = ({id}) => {
  return async dispatch => {
    const result = await reqInterviewerID({id})
    dispatch(getInterviewerID(result.id))
    return result
  }
}
export function getInterviewerID(interviewerId) { 
  return { 
    type:GET_INTERVIEWER_ID, 
    data:interviewerId,
  }; 
} 

// reducer
export default function interviewerID(state = '高13724824476', action) { 
  switch (action.type) { 
    case GET_INTERVIEWER_ID: { 
      return action.data
    } 
    default: 
      return state; 
  } 
} 