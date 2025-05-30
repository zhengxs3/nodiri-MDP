const db = require("../models/db");

// GET /api/routine-events/:userId?date=YYYY-MM-DD
const getRoutineEventsByUserAndDate = (req, res) => {
  const { userId } = req.params;
  const { date } = req.query;

  const sql = `
    SELECT re.id, re.event_date, p.name AS pictogram_name, p.image_url
    FROM routine_events re
    JOIN pictograms p ON re.pictogram_id = p.id
    WHERE re.user_id = ? AND re.event_date = ?
    ORDER BY re.id ASC
  `;
  db.query(sql, [userId, date], (err, results) => {
    if (err) return res.status(500).json({ error: "Erreur serveur" });
    res.json(results);
  });
};

// POST /api/routine-events
const addRoutineEvent = (req, res) => {
  const { user_id, pictogram_id, event_date } = req.body;

  const sql = "INSERT INTO routine_events (user_id, pictogram_id, event_date) VALUES (?, ?, ?)";
  db.query(sql, [user_id, pictogram_id, event_date], (err, result) => {
    if (err) return res.status(500).json({ error: "Erreur lors de l'ajout du pictogramme à la routine" });
    res.status(201).json({ message: "Pictogramme ajouté à la routine", id: result.insertId });
  });
};

// DELETE /api/routine-events/:id
const deleteRoutineEvent = (req, res) => {
  const sql = "DELETE FROM routine_events WHERE id = ?";
  db.query(sql, [req.params.id], (err) => {
    if (err) return res.status(500).json({ error: "Erreur lors de la suppression" });
    res.json({ message: "Pictogramme retiré de la routine" });
  });
};

module.exports = {
  getRoutineEventsByUserAndDate,
  addRoutineEvent,
  deleteRoutineEvent
};
