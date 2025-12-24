// server.js
const express = require("express");
const bodyParser = require("body-parser");
const { Pool } = require("pg");

const app = express();
app.use(bodyParser.json());

// Conexión a PostgreSQL (Render te da DATABASE_URL)
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false } // importante en Render
});

// Ruta para suscripción
app.post("/subscribe", async (req, res) => {
  const { nombre, email } = req.body;
  try {
    await pool.query(
      "INSERT INTO suscriptores(nombre, email) VALUES($1, $2)",
      [nombre, email]
    );
    res.json({ message: "¡Gracias por suscribirte!" });
  } catch (err) {
    if (err.code === "23505") { // email duplicado
      res.status(400).json({ message: "Este correo ya está registrado." });
    } else {
      console.error(err);
      res.status(500).json({ message: "Error en el servidor" });
    }
  }
});

// Ruta para login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await pool.query(
      "SELECT * FROM usuarios WHERE email=$1 AND password=$2",
      [email, password]
    );
    if (result.rows.length > 0) {
      res.json({ message: "Bienvenido!" });
    } else {
      res.status(401).json({ message: "Credenciales incorrectas" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error en el servidor" });
  }
});

app.listen(3000, () => console.log("Servidor corriendo en puerto 3000"));
