'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    get halo(){
      return `Hallo ${this.name}`
    }

    static associate(models) {
      // define association here
      this.belongsTo(models.User)
      this.belongsTo(models.University)
    }
  }
  Profile.init({
    name: DataTypes.STRING,
    age: DataTypes.INTEGER,
    school: DataTypes.STRING,
    gender: DataTypes.STRING,
    score: DataTypes.DECIMAL,
    UniversityId: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Profile',
  });
  return Profile;
};