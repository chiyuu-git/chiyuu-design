import myFetch from './fetch'

export const reqLogin = ({name,phone})=> myFetch('/api/login','POST',{name,phone})
