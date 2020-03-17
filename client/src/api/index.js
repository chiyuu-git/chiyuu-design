import myFetch from './fetch'

export const reqLogin = ({name,phone})=> {
  console.log(3)
  myFetch('/api/login','POST',{name,phone})
}