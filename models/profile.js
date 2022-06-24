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

    static showChance(minScoreProgramme) {
      let difference = minScoreProgramme - this.score, chance;
      let diffAbs = Math.abs(difference)
      if (difference < 0) {
          if (diffAbs < 5) {
              chance = 60
          }
          if (diffAbs < 10) {
              chance = 45
          }
          if (diffAbs < 20) {
              chance = 30
          }
          if (diffAbs < 30) {
              chance = 15
          }
          if (diffAbs < 40) {
              chance = 5
          }
      } else {
          if (diffAbs > 5) {
              chance = 65
          }
          if (diffAbs > 10) {
              chance = 70
          }
          if (diffAbs > 15) {
              chance = 75
          }
          if (diffAbs > 20) {
              chance = 80
          }
          if (diffAbs > 25) {
              chance = 85
          }
          if (diffAbs > 30) {
              chance = 90
          }
      }
      return chance
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