import {combineReducers} from 'redux'

import interviewer from '../components/Interviewer/InterviewerRedux';
import candidate from '../components/Candidate/CandidateRedux';
import connection from '../components/shared/Room/RoomRedux';

export default combineReducers({
  interviewer,
  candidate,
  connection,
})