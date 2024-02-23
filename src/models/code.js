const { DataTypes } = require('sequelize');
const sequelize = require('../db/cnx');

const Code = sequelize.define('Code', {
  code: {
    type: DataTypes.STRING,
    allowNull: false,
  }
  
}, {
  tableName: 'code',
});


module.exports =Code;
