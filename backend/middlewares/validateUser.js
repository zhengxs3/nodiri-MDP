// middlewares/validateUser.js
const { userSchema } = require("../services/users.validation");

const validateUser = (req, res, next) => {
  console.log("🛂 Corps reçu dans validateUser :", req.body); // 🔍 log du corps

  const { error } = userSchema.validate(req.body, { abortEarly: false });

  if (error) {
    const errorMessages = error.details.map((detail) => detail.message);
    console.log("❌ Erreurs de validation :", errorMessages); // 🔍 log des erreurs
    return res.status(400).json({ errors: errorMessages });
  }

  next();
};

module.exports = validateUser;
