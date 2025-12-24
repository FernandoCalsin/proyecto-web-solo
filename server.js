// server.js
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const { Pool } = require("pg");

const app = express();
app.use(bodyParser.json());

// Servir archivos estáticos (frontend)
// Cambia "public" por la carpeta donde tengas tu HTML/CSS/JS
app.use(express.static(path.join(__dirname, "public")));

// Conexión a PostgreSQL (Render/Supabase)
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

// Ruta de prueba para verificar conexión
app.get("/test-db", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json({ time: result.rows[0] });
  } catch (err) {
    console.error("Error en conexión DB:", err);
    res.status(500).json({ message: "Error conectando a la base de datos" });
  }
});

// Rutas
app.post("/subscribe", async (req, res) => {
  const { nombre, email } = req.body;
  try {
    await pool.query(
      "INSERT INTO suscriptores(nombre, email) VALUES($1, $2)",
      [nombre, email]
    );
    res.json({ message: "¡Gracias por suscribirte!" });
  } catch (err) {
    if (err.code === "23505") {
      res.status(400).json({ message: "Este correo ya está registrado." });
    } else {
      console.error("Error en /subscribe:", err);
      res.status(500).json({ message: "Error en el servidor" });
    }
  }
});

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
    console.error("Error en /login:", err);
    res.status(500).json({ message: "Error en el servidor" });
  }
});

// Puerto dinámico para Render
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
