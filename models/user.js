'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require('bcryptjs')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasOne(models.Profile)
    }
  



  }
  User.init({
    email: {
      type : DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: { msg: `email cannot be empty`},
        len: {args : [1,50], msg: `Maximum length is 50 characters`},
        isEmail: { msg: `input must be an email`}
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: { msg: `password cannot be empty`},
        len: {args : [8,20], msg: `minimum length is 8, and maximum length is 20`},
        isAlphanumeric: { msg: `must be letter or number`}
      }
    },
    role: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'User',
    hooks : {
      beforeCreate(User,options){
        User.role = `student`
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(User.password, salt);
        User.password = hash
      }
    }
  });
  return User;
};