const db = require("../models/db");

// GET /api/module-permissions
const getModulePermissions = (req, res) => {
  const sql = `
    SELECT mp.id, mp.learning_module_id, lm.title AS module_title,
           mp.permission_id, mp.is_enabled
    FROM module_permission mp
    JOIN learning_modules lm ON mp.learning_module_id = lm.id
  `;
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: "Erreur serveur" });
    res.json(results);
  });
};

// POST /api/module-permissions
const assignPermissionToModule = (req, res) => {
  const { learning_module_id, permission_id, is_enabled } = req.body;
  const sql = `
    INSERT INTO module_permission (learning_module_id, permission_id, is_enabled)
    VALUES (?, ?, ?)
  `;
  db.query(sql, [learning_module_id, permission_id, is_enabled], (err, result) => {
    if (err) return res.status(500).json({ error: "Erreur lors de l'assignation" });
    res.status(201).json({ message: "Permission module ajoutée", id: result.insertId });
  });
};

module.exports = { getModulePermissions, assignPermissionToModule };
