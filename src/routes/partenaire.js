const express = require('express');
const { importDataToUsers } = require('../utils/excel'); // Adjust the path
const sequelize = require('../db/cnx'); // Adjust the path
const crypto = require('crypto'); // Node.js crypto module
const Partenaire = require('../models/partenaire');
const upload = multer();
const xlsx = require('xlsx');

const router = express.Router();

app.post('/import-excel', upload.single('file'), async (req, res) => {
  try {
    // Vérifier si le fichier a été correctement téléchargé dans la requête
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // Accéder au buffer du fichier
    const fileBuffer = req.file.buffer;

    // Convertir le buffer en tableau de données Excel
    const workbook = xlsx.read(fileBuffer, { type: 'buffer' });

    // Supposons que la feuille de calcul est la première feuille du classeur
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];

    // Convertir les données de la feuille Excel en tableau JavaScript
    const excelData = xlsx.utils.sheet_to_json(sheet);

    // Synchroniser le modèle avec la base de données
    await sequelize.sync();

    // Importer les données dans la base de données
    await Partenaire.bulkCreate(excelData);

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
router.get('/get-partenaires-by-region/:ville', async (req, res) => {
  const ville = req.params.ville;

  try {
    const partenairesByRegion = await Partenaire.findAll({
      where: {
        ville: ville,
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
