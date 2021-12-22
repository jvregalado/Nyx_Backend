const { DataTypes } = require("sequelize");
const sequelize = require("./index");



const User = sequelize.define("tbl_users", {
  id: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4
  },
  first_name: {
    allowNull: false,
    type: DataTypes.STRING
  },
  last_name: {
    allowNull: false,
    type: DataTypes.STRING
  },
  suffix: {
    type: DataTypes.STRING
  },
  email_add: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  contactNo: {
    type: DataTypes.STRING
  },
  password: {
    type: DataTypes.STRING
  },
  role_id: {
    type: DataTypes.STRING
  },
  userStatus: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  createdBy: {
    type: DataTypes.STRING
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE(6)
  },
  updatedBy: {
    type: DataTypes.STRING
  },
  updatedAt: {
    allowNull: true,
    type: DataTypes.DATE(6)
  }
    }
  );

  module.exports = User;