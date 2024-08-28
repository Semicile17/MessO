const Student = require("../models/studentModel");
const Admin = require("../models/adminsModel")
const jwt = require("jsonwebtoken");

const { promisify } = require("util");

const signToken = (id) => {
  return jwt.sign({ id: id }, process.env.SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (student,statusCode,res)=>{
    const token = signToken(student._id);
    const cookieOptions = {
        expires:new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
        secure:false,
        httpOnly:true
    }
    
    if(process.env.NODE_ENV === 'production') cookieOptions.secure = true;

    student.password = undefined;

    res.cookie('jwt',token,cookieOptions)
    return res.status(statusCode).json({
        status: "success",
        token: token,
        data: {
          Student: student,
        },
      });
}

exports.studentSignup = async (req, res) => {
  try {
    const newStudent = await Student.create(req.body);
    createSendToken(newStudent,201,res);
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

    // 1) Check if email and password exist
    if (!id || !password) {
      return res.status(404).json({
        status: "fail",
        error: "Please provide id and password",
      });
    }
    // 2) Check if user exists && password is correct
    const user = await Student.findOne({ id }).select("+password"); //getting the field that is by default not selected
    if (!user || !(await user.correctPassword(password, user.password))) {
      return res.status(401).json({
        status: "fail",
        error: "Incorrect id or password",
      });
    }
    // 3) If everything ok, send token to client
    createSendToken(user,200,res);
  } catch (error) {
    return res.status(500).json({
      status: "fail",
      error: error.messsage,
    });
  }
};

exports.adminSignup = async (req, res) => {
  try {
    const newAdmin = await Admin.create(req.body);
    createSendToken(newAdmin,201,res);
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

    // 1) Check if email and password exist
    if (!email || !password) {
      return res.status(404).json({
        status: "fail",
        error: "Please provide id and password",
      });
    }
    // 2) Check if user exists && password is correct
    const user = await User.findOne({ email }).select("+password"); //getting the field that is by default not selected
    if (!user || !(await user.correctPassword(password, user.password))) {
      return res.status(401).json({
        status: "fail",
        error: "Incorrect id or password",
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

exports.protect = async (req, res,next) => {
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
    const currentUser = await Admin.findById(decoded.id);

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

