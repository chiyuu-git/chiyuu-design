const candidateModel = require('./candidates')

const userModel = function(sequelize, DataTypes) {
  return sequelize.define(
    'interviewer',
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
      }
    },
    { 
      freezeTableName: true,
    }
  )
}

userModel.hasMany(candidateModel)

module.exports = userModel