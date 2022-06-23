'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Programme extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.University)
    }

    // SELECT u.name, ROUND(AVG("min_score")) as average FROM "Programmes" p 
    // LEFT OUTER JOIN "Universities" u ON u.id = p."UniversityId" GROUP BY u.name

  }
  Programme.init({
    name: DataTypes.STRING,
    min_score: DataTypes.DECIMAL,
    min_age: DataTypes.INTEGER,
    UniversityId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Programme',
  });
  return Programme;
};