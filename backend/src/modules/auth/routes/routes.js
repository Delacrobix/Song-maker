const express = require("express");
const router = express.Router();
const controllers = require("../controllers/UserController");
const passport = require("passport");
require("../controllers/PassportControllers");

/**
 * *Render de las vistas con sus respectivas rutas.
 */
router.get("/login", (req, res) => {
  if(req.isAuthenticated()){
    let id = req.user.id.toString();

    res.redirect(`/lobby/${id}`);
  }

  res.render("login", { message: req.flash('error') });
});

router.get("/signup", (req, res) => {
  if(req.isAuthenticated()){
    let id = req.user.id.toString();

    res.redirect(`/lobby/${id}`);
  }

  res.render("signup", { message: req.flash('error') });
});

router.get(
  "/bingo/:id",
  (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    } else {
      res.redirect("/login");
    }
  },
  (req, res) => {
    res.render("bingo");
  }
);

router.get(
  "/lobby/:id",
  (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    } else {
      res.redirect("/login");
    }
  },
  (req, res) => {
    res.render("lobby");
  }
);

router.post(
  "/login", 
  passport.authenticate("local-auth", {
    failureRedirect: "/login",
    passReqToCallback: true,
    failureFlash: true
  }),
  (req, res) => {
    let id = req.user.id.toString();
    res.redirect(`/lobby/${id}`);
  }
);

router.post(
  "/addUser",
  passport.authenticate("local-auth-register", {
    failureRedirect: "/signup",
    passReqToCallback: true,
    failureFlash: true
  }),
  (req, res) => {
    let id = req.user.id.toString();
    res.redirect(`/lobby/${id}`);
  }
);

router.get('/logout', (req, res, next) => {
  req.logout((err) => {
    if(err){ 
      return next(err);
    }

    res.redirect('/login');
  });
});

/**
 * *Rutas dedicadas al registro y control de los usuarios.
 */
router.route("/getUser/:userId").get(controllers.findUserById);
router.route("/get-userName/:mongoId").get(controllers.getUserNameByMongoId);

module.exports = router;