const { DataTypes } = require('sequelize');
const sequelize = require('../db/cnx');

const User = sequelize.define('User', {
  nom: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  prenom: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  valider: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
    defaultValue: false
  },
  lienTicket: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  code: {
    type: DataTypes.STRING,
    defaultValue: null  },
}, {
  tableName: 'users',
});


module.exports = User;
