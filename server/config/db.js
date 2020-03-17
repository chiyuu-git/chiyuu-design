const Sequelize = require('sequelize');

// 前三个参数分别是 数据库的名称 数据库账号 数据库密码，最后一个参数为相应的参数配置
const design = new Sequelize('design', 'root', '123456', {
    host: 'localhost',
    dialect: 'mysql',
    dialectOptions: {
        // 字符集
        charset: "utf8mb4",
        collate: "utf8mb4_unicode_ci",
        supportBigNumbers: true,
        bigNumberStrings: true
    },
    pool: {
        max: 5,
        min: 0,
    },
    timezone: '+08:00', //东八时区
    define:{
      timestamps: false // 取消 Sequelzie 自动给数据表加入时间戳（createdAt 以及 updatedAt）
    }
});

module.exports = {
  design
}