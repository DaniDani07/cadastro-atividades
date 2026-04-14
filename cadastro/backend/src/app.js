const express = require('express');
const cors = require('cors');
const path = require('path');
const authRoutes = require('./routes/authRoutes');
const pessoaRoutes = require('./routes/pessoaRoutes');
const atividadeRoutes = require('./routes/atividadeRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, '../../frontend')));

app.use('/atividades', atividadeRoutes);
app.use('/pessoas', pessoaRoutes);
app.use('/auth', authRoutes);

app.get('/', (req, res) => {
  res.redirect('/pages/login.html');
});

module.exports = app;