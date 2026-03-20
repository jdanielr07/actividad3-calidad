const express = require("express");
const session = require("express-session");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const rateLimit = require("express-rate-limit");
const limiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutos
  max: 10, // 10 intentos
  message: "Demasiados intentos, intenta luego"
});

const app = express();

app.use("/login", limiter);

app.use(cors({
  origin: "http://localhost:3001",
  credentials: true
}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
    secret: "secreto123",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false
    }
  }));

app.use("/", authRoutes);

app.get("/auth-check", (req, res) => {
    if (req.session.user) {
      return res.json({ auth: true });
    } else {
      return res.json({ auth: false });
    }
  });

app.get("/bienvenida", (req, res) => {
  if (!req.session.user) {
    return res.send("No autorizado");
  }

  res.send("Usuario logueado satisfactoriamente");
});

app.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: "Error al cerrar sesion" });
    }

    res.clearCookie("connect.sid");
    return res.json({ message: "Sesion cerrada" });
  });
});

app.listen(3000, () => {
  console.log("Backend corriendo en http://localhost:3000");
});

