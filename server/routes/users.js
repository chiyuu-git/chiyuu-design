const router = require('koa-router')()
const UserController = require('../controllers/users.js')
const CandidateController = require('../controllers/candidates.js')

// router.prefix('/api/users')

// 用户登陆，如果没有就注册
router.post('/login',UserController.login)
// 获取面试者的列表
router.get('/candidateList',CandidateController.getCandidateList)

router.post('/user/:id', UserController.getUserInfo) //用POST请求
router.patch('/user/update/:id',UserController.updateUser) // 更新用户信息

module.exports = router
