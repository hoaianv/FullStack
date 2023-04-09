'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class allcode extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      allcode.hasMany(models.User,{foreignKey:'positionId',as:'positionData'})
      allcode.hasMany(models.User,{foreignKey:'gender',as:'genderData'})

    }
  }
  allcode.init(
    {
      keyMap: DataTypes.STRING,
      type: DataTypes.STRING,
      valueVn: DataTypes.STRING,
      valueVi: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'allcode',
    },
  )
  return allcode
}
