import {combineReducers} from 'redux'

import interviewer from '../components/Interviewer/InterviewerRedux';
import connection from '../components/shared/Room/RoomRedux';

export default combineReducers({
  interviewer,
  connection,
})