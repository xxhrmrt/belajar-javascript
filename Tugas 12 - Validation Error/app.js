const express = require("express");
const { body, validationResult } = require("express-validator");
const Joi = require("joi");

const app = express();
const port = 3000;

app.use(express.json());

// Middleware untuk validasi input route menggunakan exress-validator
const validateInput = [
  body("username")
    .isLength({ min: 5 })
    .withMessage("Panjang username minimal 5 karakter"),
  body("email").isEmail().withMessage("Format email tidak valid"),
];

// Middleware untuk validasi input route menggunakan Joi
const validateInputJoi = (req, res, next) => {
  const schema = Joi.object({
    username: Joi.string().min(5).required(),
    email: Joi.string().email().required(),
  });

  const { error } = schema.validate(res, body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

// Contoh route dengan validasi menggunakan express-validator
app.post("/user", validateInput, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array()[0].msg });
  }

  // Pemrosesan data user
  res.json({ message: "Data User Valid!" });
});

// Contoh route dengan validasi menggunakan Joi
app.post("/user-joi", validateInputJoi, (req, res) => {
  // Pemrosesan data user
  res.json({ message: "Data User Valid!" });
});

app.listen(port, () => {
  console.log(`Server sedang berjalan di http://localhost:${port}`);
});
