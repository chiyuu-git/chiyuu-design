import myFetch from './fetch'

export const reqLogin = ({name,phone})=> myFetch('/api/login','POST',{name,phone})
export const reqCandidateList = ({id})=> myFetch('/api/candidateList','GET',{id})
// 接受candidateID 查询 interviewerID
export const reqInterviewerID = ({id})=> myFetch('/api/interviewerID','GET',{id})
