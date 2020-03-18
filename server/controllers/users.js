const User = require('../modules/users.js')
const login = async function(ctx,next){
  const userInfo = ctx.request.body
  const pk = userInfo.name+userInfo.phone
  console.log(pk)
  let result = await User.getUserByPk(pk)
  // 第一次登陆，帮他注册
  if(result===null){
    Object.assign(userInfo,{pk})
    result = await User.createUser(userInfo)
  }
  ctx.response.body = result
}
const getUserInfo = async function (ctx, next){
  const id = ctx.params.id// 获取url里传过来的参数里的id
  const result = await User.getUserById(id);  // 通过await“同步”地返回查询结果
  ctx.response.body = result // 将请求的结果放到response的body里返回
}

const updateUser = async function (ctx){
  const id = ctx.params.id
  const newInfo = ctx.request.body
  const result = await User.updateUserById(id,newInfo)
  ctx.response.body = result
}

module.exports = {
  login,
  getUserInfo, // 把获取用户信息的方法暴露出去
  updateUser,
}