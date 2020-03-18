const db = require('../config/db.js')// 引入user的表结构
const design = db.design // 引入数据库
const CandidateModel = design.import('../schemas/candidates.js') // 用sequelize实例的import方法引入表结构，实例化了basicTable。

CandidateModel.sync({force:false})

const createCandidate = async function(candidateInfo){
  let res = await CandidateModel.create(candidateInfo)
  return res 
}

const getCandidateByPk = async function(id) {
  const userInfo = await CandidateModel.findByPk(id)
  return userInfo // 返回数据
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
}