const db = require('../models/db'); // fichier de connexion MySQL

exports.getAll = (req, res) => {
  db.query('SELECT * FROM routine_pictogram', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

exports.create = (req, res) => {
  const { routine_id, pictogram_id } = req.body;
  if (!routine_id || !pictogram_id) {
    return res.status(400).json({ error: 'routine_id and pictogram_id are required' });
  }

  const sql = 'INSERT INTO routine_pictogram (routine_id, pictogram_id) VALUES (?, ?)';
  db.query(sql, [routine_id, pictogram_id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: 'Relation added', id: result.insertId });
  });
};

exports.delete = (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM routine_pictogram WHERE id = ?', [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Relation deleted' });
  });
};
