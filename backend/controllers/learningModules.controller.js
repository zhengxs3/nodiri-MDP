const db = require("../models/db");

// GET /api/learning-modules
const getAllModules = (req, res) => {
  db.query("SELECT * FROM learning_modules", (err, results) => {
    if (err) return res.status(500).json({ error: "Erreur serveur" });
    res.json(results);
  });
};

// GET /api/learning-modules/:id
const getModuleById = (req, res) => {
  db.query("SELECT * FROM learning_modules WHERE id = ?", [req.params.id], (err, results) => {
    if (err) return res.status(500).json({ error: "Erreur serveur" });
    if (results.length === 0) return res.status(404).json({ error: "Module non trouvé" });
    res.json(results[0]);
  });
};

// POST /api/learning-modules
const createModule = (req, res) => {
  const { title, description, type, url } = req.body;
  db.query("INSERT INTO learning_modules (title, description, type, url) VALUES (?, ?, ?, ?)",
    [title, description, type, url],
    (err, result) => {
      if (err) return res.status(500).json({ error: "Erreur lors de la création du module" });
      res.status(201).json({ message: "Module créé", moduleId: result.insertId });
    }
  );
};

// PUT /api/learning-modules/:id
const updateModule = (req, res) => {
  const { title, description, type, url } = req.body;
  db.query("UPDATE learning_modules SET title = ?, description = ?, type = ?, url = ? WHERE id = ?",
    [title, description, type, url, req.params.id],
    (err) => {
      if (err) return res.status(500).json({ error: "Erreur lors de la mise à jour" });
      res.json({ message: "Module mis à jour" });
    }
  );
};

// DELETE /api/learning-modules/:id
const deleteModule = (req, res) => {
  db.query("DELETE FROM learning_modules WHERE id = ?", [req.params.id], (err) => {
    if (err) return res.status(500).json({ error: "Erreur lors de la suppression" });
    res.json({ message: "Module supprimé" });
  });
};

module.exports = {
  getAllModules,
  getModuleById,
  createModule,
  updateModule,
  deleteModule
};
