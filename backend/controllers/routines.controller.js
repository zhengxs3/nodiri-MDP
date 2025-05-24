const db = require("../models/db");

// GET /api/routines
const getAllRoutines = (req, res) => {
  const sql = "SELECT * FROM routines";
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: "Erreur serveur" });
    res.json(results);
  });
};

// GET /api/routines/:id
const getRoutineById = (req, res) => {
  const sql = "SELECT * FROM routines WHERE id = ?";
  db.query(sql, [req.params.id], (err, results) => {
    if (err) return res.status(500).json({ error: "Erreur serveur" });
    if (results.length === 0) return res.status(404).json({ error: "Routine non trouvée" });
    res.json(results[0]);
  });
};

// POST /api/routines
const createRoutine = (req, res) => {
  const { title, description, img_url, user_id } = req.body;
  const sql = "INSERT INTO routines (title, description, img_url, user_id) VALUES (?, ?, ?, ?)";
  db.query(sql, [title, description, img_url, user_id], (err, result) => {
    if (err) return res.status(500).json({ error: "Erreur lors de la création de la routine" });
    res.status(201).json({ message: "Routine créée", routineId: result.insertId });
  });
};

// PUT /api/routines/:id
const updateRoutine = (req, res) => {
  const { title, description, img_url } = req.body;
  const sql = "UPDATE routines SET title = ?, description = ?, img_url = ? WHERE id = ?";
  db.query(sql, [title, description, img_url, req.params.id], (err) => {
    if (err) return res.status(500).json({ error: "Erreur lors de la mise à jour" });
    res.json({ message: "Routine mise à jour" });
  });
};

// DELETE /api/routines/:id
const deleteRoutine = (req, res) => {
  const sql = "DELETE FROM routines WHERE id = ?";
  db.query(sql, [req.params.id], (err) => {
    if (err) return res.status(500).json({ error: "Erreur lors de la suppression" });
    res.json({ message: "Routine supprimée" });
  });
};

module.exports = {
  getAllRoutines,
  getRoutineById,
  createRoutine,
  updateRoutine,
  deleteRoutine
};
