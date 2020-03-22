import myFetch from './fetch'

export const reqLogin = ({name,phone})=> myFetch('/api/login','POST',{name,phone})
export const reqCandidateList = ({id})=> myFetch('/api/candidateList','GET',{id})
