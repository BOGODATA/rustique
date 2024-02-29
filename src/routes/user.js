const express = require('express');
const { importDataToUsers } = require('../utils/excel'); // Adjust the path
const User = require('../models/user'); // Adjust the path
const sequelize = require('../db/cnx'); // Adjust the path
const crypto = require('crypto'); // Node.js crypto module
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const router = express.Router();


router.get('/get-all-users', async (req, res) => {
  try {
    const users = await User.findAll();

    res.status(200).json( users);
  } catch (error) {
    console.error('Error getting all users:', error);
    res.status(500).json({ error: 'Error getting all users' });
  }
});
// Endpoint for importing data from an Excel file
router.post('/import-exceluser', upload.single('excelFile'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded.' });
    }

    const filePath = req.file.path;
    const userData = await importDataToUsers(filePath);

    await User.bulkCreate(userData);
    console.log('Data import completed.');

    res.status(200).json({ message: 'Import successful' });
  } catch (error) {
    console.error('Error during import:', error);
    res.status(500).json({ error: 'Error during import' });
  }
});
function generateRandomCode(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    code += characters.charAt(randomIndex);
  }

  return code;
}
router.put('/update-etat/:id', async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Assuming 'etat' is a boolean field
    user.valider = true;

    const validationCode = generateRandomCode(6);

    // You can skip the loop since the code is generated randomly
    user.code = validationCode;
    await user.save();
    await transporter.sendMail({
      from: "noreply@bogoplus.fr",
      to: user.email,
      subject: 'Confirmation de votre PASS activité',
      html: `
      <html>
    <head>
      <style>
      .centrer {
        text-align: center;
        margin: 0 auto;
      }
      
        .info{
          color: #9FA0A7;
          font-size:12px;
        }
  
      </style>
    </head>
    <body>
      <p>Bonjour ${user.prenom},</p>
  
      <p>Félicitations !</p>
      <p>Vous avez participé à l’opération LE RUSTIQUE et vous avez sélectionné l’activité JARDINAGE. Pour en bénéficier, veuillez cliquer sur le lien ci-dessous afin de télécharger vos trois fiches Jardinot :</p>
    <div class="centrer">
    <a href="http://54.38.32.61:7000/jardinage/Lecompostage.pdf" class="button">CONSEILS JARDIN : LE COMPOSTAGE</a>
    <a href="http://54.38.32.61:7000/jardinage/LePaillage.pdf" class="button">CONSEILS JARDIN : LE PAILLAGE</a>
    <a href="http://54.38.32.61:7000/jardinage/Bonnesgrainesbonssemis.pdf" class="button">CONSEILS JARDIN : BONNES GRAINES BONS SEMIS</a>
      </div>
      <p>Amusez-vous bien !</p>
      <p class="info">Les sociétés organisatrices ne sauraient être tenues pour responsable en cas d’un éventuel accident survenu lors de l’utilisation du pass. Conformément au Règlement Général sur la Protection des Données à caractère personnel, les Participants ont un droit d’accès, de rectification, de suppression ou d’opposition pour motifs légitimes. Les Participants pourront exercer leurs droits par email à contact@lerustique-unepartdenature.fr</p>
    </body>
  </html>
      `,      });
    res.status(200).json({ message: 'Etat updated successfully', validationCode });
  } catch (error) {
    console.error('Error during etat update:', error);
    res.status(500).json({ error: 'Error during etat update' });
  }
});
router.delete('/delete-user/:id', async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    await user.destroy();

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error during user deletion:', error);
    res.status(500).json({ error: 'Error during user deletion' });
  }
});
router.get('/check-user/:code', async (req, res) => {
  try {
    const userCode = req.params.code;

    const user = await User.findOne({
      where: {
        code: userCode
      }
    });

    const userExists = !!user; // Convert user to a boolean value

    res.status(200).json({ userExists });
  } catch (error) {
    console.error('Error checking user existence:', error);
    res.status(500).json({ error: 'Error checking user existence' });
  }
});
module.exports = router;
