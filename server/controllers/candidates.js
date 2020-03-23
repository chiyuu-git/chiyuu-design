const Candidate = require('../modules/candidates.js')

const getCandidateList = async function(ctx,next){
  const pk = ctx.query.id
  let result = await Candidate.getCandidateListByPk(pk)
  ctx.response.body = result
}


const updateCandidate = async function(ctx,next){
  const pk = ctx.body.id
  const newInfo = ctx.body.newInfo
  console.log('pk:',pk)
  console.log('newInfo:',newInfo)
  let result = await Candidate.updateCandidateById(pk)
  ctx.response.body = result
}

const getInterviewerID = async function(ctx,next){
  const pk = ctx.query.id
  console.log('pk:',pk)
  let result = await Candidate.getInterviewerByPk(pk)
  console.log('result:',result.foreignKey)
  ctx.response.body = {id:result.foreignKey}
}


module.exports = {
  getCandidateList,
  updateCandidate,
  getInterviewerID,
}