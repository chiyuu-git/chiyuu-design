const router = require('koa-router')()
const UserController = require('../controllers/users.js')

// router.prefix('/api/users')

// 用户登陆，如果没有就注册
router.post('/login',UserController.login)

router.post('/user/:id', UserController.getUserInfo) //用POST请求
router.patch('/user/update/:id',UserController.updateUser) // 更新用户信息

module.exports = router
