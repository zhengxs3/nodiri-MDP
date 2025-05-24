const db = require("../models/db");

// GET /api/agenda
const getAllEvents = (req, res) => {
  const sql = "SELECT * FROM agenda";
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: "Erreur serveur" });
    res.json(results);
  });
};

// GET /api/agenda/:id
const getEventById = (req, res) => {
  const sql = "SELECT * FROM agenda WHERE id = ?";
  db.query(sql, [req.params.id], (err, results) => {
    if (err) return res.status(500).json({ error: "Erreur serveur" });
    if (results.length === 0) return res.status(404).json({ error: "Événement non trouvé" });
    res.json(results[0]);
  });
};

// POST /api/agenda
const createEvent = (req, res) => {
  const { event_title, event_date, start_time, end_time, description, user_id } = req.body;
  const sql = `
    INSERT INTO agenda (event_title, event_date, start_time, end_time, description, user_id)
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  db.query(sql, [event_title, event_date, start_time, end_time, description, user_id], (err, result) => {
    if (err) return res.status(500).json({ error: "Erreur à la création" });
    res.status(201).json({ message: "Événement créé", eventId: result.insertId });
  });
};

// PUT /api/agenda/:id
const updateEvent = (req, res) => {
  const { event_title, event_date, start_time, end_time, description } = req.body;
  const sql = `
    UPDATE agenda SET event_title = ?, event_date = ?, start_time = ?, end_time = ?, description = ?
    WHERE id = ?
  `;
  db.query(sql, [event_title, event_date, start_time, end_time, description, req.params.id], (err) => {
    if (err) return res.status(500).json({ error: "Erreur lors de la mise à jour" });
    res.json({ message: "Événement mis à jour" });
  });
};

// DELETE /api/agenda/:id
const deleteEvent = (req, res) => {
  const sql = "DELETE FROM agenda WHERE id = ?";
  db.query(sql, [req.params.id], (err) => {
    if (err) return res.status(500).json({ error: "Erreur lors de la suppression" });
    res.json({ message: "Événement supprimé" });
  });
};

module.exports = {
  getAllEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent
};
