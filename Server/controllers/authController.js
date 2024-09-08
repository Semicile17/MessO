const Student = require("../models/studentModel");
const Admin = require("../models/adminsModel");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);

  // Set the JWT in the headers
  res.setHeader('Authorization', `Bearer ${token}`);

  // Store the JWT in cookies as well
  const cookieOptions = {
    expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
    secure: false,
    httpOnly: true
  };

  if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

  res.cookie('jwt', token, cookieOptions);

  user.password = undefined;

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user
    }
  });
};


exports.studentSignup = async (req, res) => {
  try {
    const newStudent = await Student.create(req.body);
    createSendToken(newStudent, 201, res);
  } catch (error) {
    return res.status(500).json({
      status: "fail",
      error: error.message,
    });
  }
};

exports.studentLogin = async (req, res) => {
  try {
    const { id, password } = req.body;

    // 1) Check if id and password exist
    if (!id || !password) {
      return res.status(404).json({
        status: "fail",
        error: "Please provide id and password",
      });
    }
    // 2) Check if user exists && password is correct
    const user = await Student.findOne({ id }).select("+password");
    if (!user || !(await user.correctPassword(password, user.password))) {
      return res.status(401).json({
        status: "fail",
        error: "Incorrect id or password",
      });
    }
    // 3) If everything ok, send token to client
    createSendToken(user, 200, res);
  } catch (error) {
    return res.status(500).json({
      status: "fail",
      error: error.message,
    });
  }
};

exports.adminSignup = async (req, res) => {
  try {
    const newAdmin = await Admin.create(req.body);
    createSendToken(newAdmin, 201, res);
  } catch (error) {
    return res.status(500).json({
      status: "fail",
      error: error.message,
    });
  }
};

exports.adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);

    // 1) Check if email and password exist
    if (!email || !password) {
      return res.status(404).json({
        status: "fail",
        error: "Please provide email and password",
      });
    }
    // 2) Check if user exists && password is correct
    const user = await Admin.findOne({ email }).select("+password");
    console.log(user);
    if (!user || !(await user.correctPassword(password, user.password))) {
      return res.status(401).json({
        status: "fail",
        error: "Incorrect email or password",
      });
    }

    // 3) If everything ok, send token to client
    createSendToken(user, 200, res);
  } catch (error) {
    return res.status(500).json({
      status: "fail",
      error: error.message,
    });
  }
};

exports.protect = async (req, res, next) => {
  try {
    let token;
    // 1) Get the token from the authorization header
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({
        status: "fail",
        message: "You are not logged in!",
      });
    }

    // 2) Verify the token
    const decoded = await promisify(jwt.verify)(token, process.env.SECRET);

    // 3) Check if the user still exists
    const currentUser = await Admin.findById(decoded.id);
    if (!currentUser) {
      return res.status(401).json({
        status: "fail",
        message: "User doesn't exist!",
      });
    }

    // GRANT ACCESS TO PROTECTED DATA
    req.user = currentUser;
    next();
  } catch (error) {
    return res.status(401).json({
      status: "fail",
      error: error.message,
    });
  }
};

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        status: "fail",
        message: "You do not have permission to perform this action",
      });
    }
    next();
  };
};
