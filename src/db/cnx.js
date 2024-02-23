const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('rustique', 'rustique', 'Bogo150915', {
  host: 'fe46787-001.eu.clouddb.ovh.net',
  port: 35385,
  dialect: 'mysql',
  dialectOptions: {
    connectTimeout: 60000, 
  },
});

sequelize
  .authenticate()
  .then(() => {
    console.log('CONNEXION DB OK !');
  })
  .catch((err) => {
    console.error('CONNEXION KO !', err);
  });

module.exports = sequelize;
