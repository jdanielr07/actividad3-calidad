const db = require("../db");
const bcrypt = require("bcrypt");

exports.login = (req, res) => {
  const { email, password } = req.body;

  db.query("SELECT * FROM users WHERE email = ?", [email], async (err, results) => {

    // Usuario no existe → mensaje genérico
    if (results.length === 0) {
      return res.send("Credenciales inválidas");
    }

    const user = results[0];
    const now = new Date();

    // Verificar bloqueo temporal
    if (user.bloqueado_hasta && new Date(user.bloqueado_hasta) > now) {
      return res.send("Cuenta bloqueada temporalmente");
    }

    const match = await bcrypt.compare(password, user.password);

    if (match) {
      // Reset intentos y bloqueo
      db.query(
        "UPDATE users SET intentos = 0, bloqueado_hasta = NULL WHERE id = ?",
        [user.id]
      );

      req.session.user = user;
      return res.send("Usuario logueado satisfactoriamente");
    }

    // Si falla contraseña
    const nuevosIntentos = user.intentos + 1;

    if (nuevosIntentos >= 3) {
      const bloqueo = new Date();
      bloqueo.setMinutes(bloqueo.getMinutes() + 5);

      db.query(
        "UPDATE users SET intentos = 0, bloqueado_hasta = ? WHERE id = ?",
        [bloqueo, user.id]
      );

      return res.send("Cuenta bloqueada temporalmente");
    } else {
      db.query(
        "UPDATE users SET intentos = ? WHERE id = ?",
        [nuevosIntentos, user.id]
      );

      return res.send("Credenciales inválidas");
    }
  });
};