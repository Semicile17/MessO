const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");

const signToken = (id) => {
  return jwt.sign({ id: id }, process.env.SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user,statusCode,res)=>{
    const token = signToken(user._id);

    const cookieOptions = {
        expires:new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
        secure:false,
        httpOnly:true
    }
    
    if(process.env.NODE_ENV === 'production') cookieOptions.secure = true;

    user.password = undefined;

    res.cookie('jwt',token,cookieOptions)
    return res.status(statusCode).json({
        status: "success",
        token: token,
        data: {
          User: user,
        },
      });
}

exports.signup = async (req, res) => {
  try {
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
    });
    createSendToken(newUser,201,res);
  } catch (error) {
    return res.status(500).json({
      status: "fail",
      error: error,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1) Check if email and password exist
    if (!email || !password) {
      return res.status(404).json({
        status: "fail",
        error: "Please provide email and password",
      });
    }
    // 2) Check if user exists && password is correct
    const user = await User.findOne({ email }).select("+password"); //getting the field that is by default not selected
    if (!user || !(await user.correctPassword(password, user.password))) {
      return res.status(401).json({
        status: "fail",
        error: "Incorrect email or password",
      });
    }

    // 3) If everything ok, send token to client
    createSendToken(user,200,res);
  } catch (error) {
    return res.status(500).json({
      status: "fail",
      error: error.messsage || error,
    });
  }
};

exports.protect = async (req, res) => {
  try {
    let token;
    // 1) getting token and check if it's there
    token = req.cookies.jwt;
    if (!token) {
      return res.status(401).json({
        status: "fail",
        message: "You are not logged in !",
      });
    }

    // 2) Verifiy token
    const decoded = await promisify(jwt.verify)(token, process.env.SECRET); // returns a callback function , so we'll promisify it

    // 3) Check if the user still exists
    const currentUser = await User.findById(decoded.id);

    if (!currentUser) {
      return res.status(401).json({
        status: "fail",
        message: "User doesn't exist!",
      });
    }
      
    // 4) Check if user changed password after the token was issued
    // if (currentUser.changedPasswordAfter(decoded.iat)) {
    //   return res.status(401).json({
    //     status: "fail",
    //     message: "password changed !",
    //   });
    // }
    // GRANT ACCESSS TO PROTECTED DATA
    return res.status(200).json({
      status:"success",
      data : currentUser

    })
    return res
  } catch (error) {
    return res.status(401).json({
      status: "fail",
      error: error,
    });
  }
};

