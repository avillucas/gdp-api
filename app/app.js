const express = require('express');
const cors = require('cors');
require('dotenv').config();
//
const port = env.PORT ??  3000;
//
app.use(cors());
app.use(express.json()); // Permite trabajar con JSON en las solicitudes
app.use(express.urlencoded({ extended: true })); // Soporta datos codificados en URL
//
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

// Importamos la ruta de messages
const contactRoute = require('./routes/contact');
app.use('/api/v1/contact', contactRoute);