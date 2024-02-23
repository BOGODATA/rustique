const express = require('express');
const user = require('./src/routes/user'); // Adjust the path
const partenaire = require('./src/routes/partenaire');
const participation=require('./src/routes/participation');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 7000;
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', user,participation,partenaire); // Mount the router under the /api path

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

