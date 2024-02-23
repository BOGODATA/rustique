const express = require('express');
const { importDataToUsers } = require('../utils/excel'); // Adjust the path
const sequelize = require('../db/cnx'); // Adjust the path
const crypto = require('crypto'); // Node.js crypto module
const Partenaire = require('../models/partenaire');

const router = express.Router();

// Endpoint for importing data from an Excel file
router.post('/import-excel', async (req, res) => {
  try {
    await sequelize.sync(); // Synchronize the model with the database

    const filePath = "C:\/Bn\/PARTENAIRESTEST.xlsx"
    const partenaireData = await importDataToPartenaires(filePath);


    await Partenaire.bulkCreate(partenaireData);
    console.log('Data import completed.');

    res.status(200).json({ message: 'Import successful' });
  } catch (error) {
    console.error('Error during import:', error);
    res.status(500).json({ error: 'Error during import' });
  }
});
router.delete('/delete-partenaire/:id', async (req, res) => {
  const partenaireId = req.params.id;

  try {
    const partenaire = await Partenaire.findByPk(partenaireId);

    if (!partenaire) {
      return res.status(404).json({ error: 'Partenaire not found' });
    }

    await user.destroy();

    res.status(200).json({ message: 'Partenaire deleted successfully' });
  } catch (error) {
    console.error('Error during user deletion:', error);
    res.status(500).json({ error: 'Error during partenaire deletion' });
  }
});
router.get('/get-partenaires-by-region/:region', async (req, res) => {
  const ville = req.params.region;

  try {
    const partenairesByRegion = await Partenaire.findAll({
      where: {
        region: region,
      },
    });

    res.status(200).json(partenairesByRegion);
  } catch (error) {
    console.error('Error getting partenaires by region:', error);
    res.status(500).json({ error: 'Error getting partenaires by region' });
  }
});
router.get('/get-all-partenaires', async (req, res) => {
  try {
    const partenaires = await Partenaire.findAll();

    res.status(200).json(partenaires);
  } catch (error) {
    console.error('Error getting all partenaires:', error);
    res.status(500).json({ error: 'Error getting all partenaires' });
  }
});
module.exports = router;
