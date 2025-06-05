const mysql = require("mysql2");
const dotenv = require("dotenv");

// Charger les variables d'environnement
dotenv.config();

// Création de la connexion MySQL
const db = mysql.createConnection({
  host: process.env.DB_HOST,       // ex: localhost
  user: process.env.DB_USER,       // ex: root
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME, 
  port:process.env.DB_PORT  //ex: localhost:port
});
// Connexion
db.connect((err) => {
  if (err) {
    console.error("Erreur de connexion MySQL :", err.message);
    process.exit(1); // Arrête le serveur
  } else {
    console.log("Connecté à la base de données MySQL");
  }
});

module.exports = db;
