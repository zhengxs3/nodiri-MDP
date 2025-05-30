const db = require("../models/db");

const getAllPictograms = (req, res) => {
  db.query("SELECT * FROM pictograms", (err, results) => {
    if (err) return res.status(500).json({ error: "Erreur serveur" });
    res.json(results);
  });
};

const createPictogram = (req, res) => {
  const { name, category, image_url } = req.body;
  const sql = "INSERT INTO pictograms (name, category, image_url) VALUES (?, ?, ?)";
  db.query(sql, [name, category, image_url], (err, result) => {
    if (err) return res.status(500).json({ error: "Erreur lors de la création" });
    res.status(201).json({ message: "Pictogramme ajouté", id: result.insertId });
  });
};

module.exports = {
  getAllPictograms,
  createPictogram
};
