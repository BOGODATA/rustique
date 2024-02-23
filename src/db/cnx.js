const { Sequelize } = require('sequelize');

// Remplacez les valeurs de connexion appropriées
const sequelize = new Sequelize('le_rustique', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

// Testez la connexion à la base de données
sequelize
  .authenticate()
  .then(() => {
    console.log('CONNEXION DB OK !');
  })
  .catch((err) => {
    console.error('CONNEXION KO !', err);
  });

module.exports = sequelize;
