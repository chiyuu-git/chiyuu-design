import { combineReducers } from 'redux';

// 引入 reducer 及 actionCreator
import interviewerInfo from './Entry/EntryRedux';
import candidateList from './Manage/ManageRedux';


export default combineReducers({
  interviewerInfo,
  candidateList,
});