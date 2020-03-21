const Candidate = require('../modules/candidates.js')

const getCandidateList = async function(ctx,next){
  const pk = ctx.params.id
  console.log(pk)
  let result = await Candidate.getCandidateListByPk(pk)
  ctx.response.body = result
}


module.exports = {
  getCandidateList,
}