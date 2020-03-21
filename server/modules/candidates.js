const db = require('../config/db.js')// 引入user的表结构
const design = db.design // 引入数据库
const CandidateModel = design.import('../schemas/candidates.js') // 用sequelize实例的import方法引入表结构，实例化了basicTable。

CandidateModel.sync({force:false})

const createCandidate = async function(candidateInfo){
  let res = await CandidateModel.create(candidateInfo)
  return res 
}

const getCandidateListByPk = async function(pk) {
  const candidateList = await CandidateModel.findAll({
    where:{
      pk
    }
  })
  return candidateList
}

const updateCandidateById = async function(id,newInfo){
  const userInfo = await CandidateModel.update(newInfo,{
    where:{
      id:id
    }
  })
  return userInfo
}

module.exports =  {
  createCandidate,
  getCandidateListByPk,
}