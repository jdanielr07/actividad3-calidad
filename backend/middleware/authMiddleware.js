exports.isAuth = (req, res, next) => {
    if (!req.session.user) {
      return res.status(401).send("No autorizado");
    }
    next();
  };