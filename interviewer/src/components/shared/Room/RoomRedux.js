/* NOTE:公共redux */

// action-types
const CREAT_CONNECTION = 'CREAT_CONNECTION'; 

export function creatConnection(connection) { 
  return { 
    type:CREAT_CONNECTION, 
    data:connection
  }; 
} 

// reducer
const initialState = null
function connection (state = initialState, action) { 
  switch (action.type) { 
    case CREAT_CONNECTION:
      return action.data
    default: 
      return state; 
  } 
} 

export default connection