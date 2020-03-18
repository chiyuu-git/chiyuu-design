const Candidate = require('../modules/candidates.js')

const getCandidateList = async function(ctx,next){
  const userInfo = ctx.request.body
  const pk = userInfo.name+userInfo.phone
  console.log(pk)
  let result = await Candidate.getUserByPk(pk)
  // 第一次登陆，帮他注册
  if(result===null){
    Object.assign(userInfo,{pk})
    result = await Candidate.createUser(userInfo)
  }
  ctx.response.body = result
}


module.exports = {
  getCandidateList,
}