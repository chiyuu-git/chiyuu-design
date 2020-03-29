import {combineReducers} from 'redux'

import interviewer from '../components/Interviewer/InterviewerRedux';
import candidate from '../components/Candidate/CandidateRedux';

export default combineReducers({
  interviewer,
  candidate,
})