const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;
const PassportLocal = require("passport-local").Strategy;
const userControllers = require("./UserController");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  let user = await userControllers.findUserById(id);
  done(null, user);
});

passport.use(
  "local-auth",
  new PassportLocal(async (username, password, done) => {
    let user = await userControllers.findUserAndPassword(username, password);

    if (user.wasFound == false) {
      return done(null, false, { message: user.message });
    } else {
      return done(null, user);
    }
  })
);

passport.use(
  "local-auth-register",

  new PassportLocal(
    {
      usernameField: "username",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, username, password, done) => {
      let email = req.body.email;
      let response = await userControllers.addUser(username, email, password);

      if (response.correct == false) {
        return done(null, false, { message: response.message });
      } else {
        return done(null, response);
      }
    }
  )
);
