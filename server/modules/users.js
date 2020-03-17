const db = require('../config/db.js')// 引入user的表结构
const design = db.design // 引入数据库
const UserModel = design.import('../schemas/users.js') // 用sequelize实例的import方法引入表结构，实例化了basicTable。

UserModel.sync({force:false})

const createUser = async function(userInfo){
  let res = await UserModel.create(userInfo)
  return res 
}

const getUserByPk = async function(id) {
  const userInfo = await UserModel.findByPk(id)
  return userInfo // 返回数据
}

const updateUserById = async function(id,newInfo){
  const userInfo = await UserModel.update(newInfo,{
    where:{
      id:id
    }
  })
  return userInfo
}

module.exports =  {
  createUser,
  getUserByPk, // 导出getUserById的方法，将会在controller里调用
  updateUserById,
}