const { DataTypes } = require('sequelize');
const sequelize = require('../db/cnx');
const User = require('./user');
const Partenaire = require('./partenaire');

const Participation = sequelize.define('Participation', {
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
    code: {
      type: DataTypes.STRING,
      allowNull: true,
  },
});

Participation.belongsTo(User, {
  foreignKey: {
    name: 'userId',
    allowNull: false,
  },
});
User.hasMany(Participation, {
  foreignKey: 'userId',
  onDelete: 'CASCADE',
  onUpdate:'CASCADE' 

});

Participation.belongsTo(Partenaire, {
  foreignKey: {
    name: 'partenaireId',
    allowNull: false,
  },
});
Partenaire.hasMany(Participation, {
  foreignKey: 'partenaireId',
  onDelete: 'CASCADE', 
  onUpdate:'CASCADE'


});

module.exports = Participation;
