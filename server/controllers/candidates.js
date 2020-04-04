const Candidate = require('../modules/candidates.js')
const User = require('../modules/users.js')

const getCandidateList = async function(ctx,next){
  const pk = ctx.query.id
  let result = await Candidate.getCandidateListByPk(pk)
  ctx.response.body = result
}

const updateCandidate = async function(ctx,next){
  const newInfo = ctx.request.body
  newInfo.pk = newInfo.name+newInfo.phone
  let result = await Candidate.getCandidateByPk(newInfo.pk)
  if(result){
    // 更新
    result = await Candidate.updateCandidateByPK(newInfo.pk,newInfo)
  }
  else{
    // 新建
    result = await Candidate.createCandidate(newInfo)
  }
  ctx.response.body = result
}

const getInterviewerInfo = async function(ctx,next){
  const pk = ctx.query.id
  const candidateInfo = await Candidate.getCandidateByPk(pk)
  const result = await User.getUserByPk(candidateInfo.foreignKey)
  ctx.response.body = result
}


module.exports = {
  getCandidateList,
  updateCandidate,
  getInterviewerInfo,
}