const db = require('../config/db.js')// 引入user的表结构
const design = db.design // 引入数据库
const CandidateModel = design.import('../schemas/candidates.js') // 用sequelize实例的import方法引入表结构，实例化了basicTable。

CandidateModel.sync({force:false})

const getCandidateListByPk = async function(pk) {
  const candidateList = await CandidateModel.findAll({
    where:{
      foreignKey:pk
    }
  })
  return candidateList
}

const updateCandidateByPK = async function(pk,newInfo){
  const candidateInfo = await CandidateModel.update(newInfo,{
    where:{
      pk
    }
  })
  return candidateInfo
}

const createCandidate = async function(candidateInfo){
  let res = await CandidateModel.create(candidateInfo)
  return res 
}


// const getInterviewerByPk = async function(pk){
//   const candidate = await CandidateModel.findOne({
//     where:{name:'张三'}
//   })
//   return candidate 
// }

const getCandidateByPk = async function(pk){
  const candidate = await CandidateModel.findByPk(pk)
  return candidate 
}

module.exports =  {
  getCandidateListByPk,
  createCandidate,
  updateCandidateByPK,
  getCandidateByPk,
}