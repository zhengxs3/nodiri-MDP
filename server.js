const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

// Configuration de la connexion à la base de données
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', //doit modifier
  password: '', //doit modifier
  database: 'cfgqmpcj_nodiri',
  port: 3308
});

db.connect(err => {
  if (err) {
    console.error('❌ Échec de la connexion à la base de données :', err);
    return;
  }
  console.log('✅ Connexion à la base de données réussie');
});

// Endpoint pour l'inscription
app.post('/register', async (req, res) => {
  const { name, role, age, email, password } = req.body;

  if (!name || !role || !age || !email || !password) {
    return res.status(400).json({ error: 'Champs manquants' });
  }

  try {
    const [existing] = await db.promise().query('SELECT id FROM users WHERE email = ?', [email]);
    if (existing.length > 0) {
      return res.status(409).json({ error: 'Email déjà utilisé' });
    }

    const hashed = await bcrypt.hash(password, 10);
    await db.promise().query(
      'INSERT INTO users (name, role, age, email, password) VALUES (?, ?, ?, ?, ?)',
      [name, role, age, email, hashed]
    );

    res.json({ success: true });
  } catch (err) {
    console.error('Erreur serveur :', err);
    res.status(500).json({ error: "Erreur lors de l'enregistrement" });
  }
});

// Endpoint pour la connexion (vérifie le mot de passe avec bcrypt)
app.post('/login', (req, res) => {
  const { name, password } = req.body;

  if (!name || !password) {
    return res.status(400).json({ message: 'Champs manquants' });
  }

  const sql = 'SELECT * FROM users WHERE name = ?';
  db.query(sql, [name], (err, results) => {
    if (err) {
      console.error('Erreur SQL :', err);
      return res.status(500).json({ message: 'Erreur serveur' });
    }

    if (results.length === 0) {
      return res.status(401).json({ message: 'Nom introuvable' });
    }

    const user = results[0];

    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        return res.status(500).json({ message: 'Erreur de comparaison' });
      }

      if (!isMatch) {
        return res.status(401).json({ message: 'Mot de passe incorrect' });
      }

      return res.status(200).json({ message: 'Connexion réussie', user });
    });
  });
});

app.listen(port, () => {
  console.log(`🚀 Serveur Node démarré sur http://localhost:${port}`);
});
