const userModel = require('./users')

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
      interviewDate:{
        type:DataTypes.DATE,
        allowNull: false
      },
      interviewStatus:{
        type:DataTypes.STRING(45),
        allowNull: false
      },
    },
    { 
      freezeTableName: true,
    }
  )
}

candidateModel.belongsTo(userModel)

module.exports = candidateModel