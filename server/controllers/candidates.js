const Candidate = require('../modules/candidates.js')
const User = require('../modules/users.js')

const getCandidateList = async function(ctx,next){
  const pk = ctx.query.id
  let result = await Candidate.getCandidateListByPk(pk)
  ctx.response.body = result
}


const updateCandidate = async function(ctx,next){
  const pk = ctx.body.id
  const newInfo = ctx.body.newInfo
  let result = await Candidate.updateCandidateById(pk)
  ctx.response.body = result
}

const getInterviewerInfo = async function(ctx,next){
  const pk = ctx.query.id
  const candidateInfo = await Candidate.getInterviewerByPk(pk)
  const result = await User.getUserByPk(candidateInfo.foreignKey)
  ctx.response.body = result
}


module.exports = {
  getCandidateList,
  updateCandidate,
  getInterviewerInfo,
}