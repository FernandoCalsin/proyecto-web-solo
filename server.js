// server.js
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const { Pool } = require("pg");

const app = express();

// Middleware para leer JSON
app.use(bodyParser.json());

// CONFIGURACIÓN DE ARCHIVOS ESTÁTICOS
// Como tus carpetas (css, js, imagenes) y archivos HTML están en la raíz, usamos __dirname
app.use(express.static(__dirname));

// CONEXIÓN A LA BASE DE DATOS
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

// --- RUTAS DE NAVEGACIÓN (FRONTEND) ---

// Carga la página principal (index.html)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Ruta para verificar que la DB responde
app.get("/test-db", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json({ message: "Conectado a Supabase", time: result.rows[0] });
  } catch (err) {
    console.error("Error en conexión DB:", err);
    res.status(500).json({ message: "Error conectando a la base de datos" });
  }
});

// --- RUTAS DE API (LÓGICA) ---

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
      res.json({ message: "¡Bienvenido!" });
    } else {
      res.status(401).json({ message: "Credenciales incorrectas" });
    }
  } catch (err) {
    console.error("Error en /login:", err);
    res.status(500).json({ message: "Error en el servidor" });
  }
});

// PUERTO PARA RENDER
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});