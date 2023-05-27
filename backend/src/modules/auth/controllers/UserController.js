const User = require("../models/UserSchema");

exports.findUserById = async function (id) {
  try {
    let user = await User.findById(id);

    return user;
  } catch (err) {
    console.error("ERROR: ", err);
  }
};

/**
 * *Se encarga de validar la existencia en la base de datos de los datos ingresados en el login.
 * @returns Mensajes de error en caso de que el sistema no encuentre el usuario o contraseña.
 */
exports.findUserAndPassword = async function (username, password) {

  if (password.length == 0) {
    return {
      message: "Empty password.",
      wasFound: false,
    };
  }

  if (username.length == 0) {
    return {
      message: "Empty username.",
      wasFound: false,
    };
  }

  let us = await User.findOne({
    user: username,
  });

  if (!us) {
    us = await User.findOne({
      email: username,
    });
  }

  if (!us) {
    return {
      message: "Username or email not found.",
      wasFound: false,
    };
  } else {
    let match = await us.comparePassword(password);

    if (match) {
      return {
        user: username,
        id: us._id,
      };
    } else {
      return {
        message: "Incorrect password.",
        wasFound: false,
      };
    }
  }
};

exports.getUserNameByMongoId = async function (req, res) {
  let mongoId = req.params.mongoId;

  if (mongoId.length == 0) {
    return res.status(422).jsonp("Empty MongoId");
  }

  const result = await User.findById(mongoId);

  if (result) {
    return res.status(200).jsonp({
      user: result.user,
    });
  } else {
    return res.status(400).jsonp("MongoId not found");
  }
};

/**
 * * Crea un usuario en base a los datos enviados del formulario de registro.
 * @returns En caso de que el usuario exista, un mensaje de error. Si no existe el usuario,
 * añade el registro a la base de datos.
 */
exports.addUser = async function (user, email, password) {
  // *Validación de campos vacíos
  if (user.length == 0 || email.length == 0 || password.length == 0) {
    return {
      message: "Must be fill in all required fields.",
      correct: false,
    };
  }

  emailRegex =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  if (!emailRegex.test(email)) {
    return {
      message: "The email address: " + email + " is not valid.",
      correct: false,
    };
  }

  let _email = await User.findOne({
    email: email,
  });

  let _user = await User.findOne({
    user: user,
  });

  if (_email) {
    return {
      message: "The email address is already registered.",
      correct: false,
    };
  } else if (_user) {
    return { 
      message: "The user is already registered.", 
      correct: false 
    };
  } else {
    let new_user = new User({
      user: user,
      email: email,
      password: password,
    });

    new_user.password = await new_user.encryptPassword(password);

    let userSaved = await new_user.save(new_user);

    return {
      message: "User has been registered.",
      id: userSaved.id,
      correct: true
    }
  }
};
