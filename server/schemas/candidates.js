const usersModel = require('./users')


const candidateModel = function(sequelize, DataTypes) {
  return sequelize.define(
    'candidate',
    {
      pk: {
        type: DataTypes.STRING(45),
        allowNull: false,
        primaryKey:true,
      },
      name: {
        type: DataTypes.STRING(45),
        allowNull: false
      },
      phone: {
        type: DataTypes.STRING(11),
        allowNull: false
      },
      email:{
        type: DataTypes.STRING(45),
        allowNull: false
      },
      date:{
        type:DataTypes.STRING(45),
        allowNull: false
      },
      time:{
        type:DataTypes.STRING(45),
        allowNull: false
      },
      status:{
        type:DataTypes.STRING(45),
        allowNull: false
      },
       // It is possible to create foreign keys:
       foreignKey: {
        type: DataTypes.STRING(45),
        references: {
          model: 'interviewer',
          key: 'pk',
        }
      },
    },
    { 
      freezeTableName: true,
    }
  )
}

module.exports = candidateModel