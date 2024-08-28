const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const Form = require('../models/formModel')

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A user must have a name'],
    trim: true,
    maxlength: [40, 'A name must have atmost 40 characters'],
  },
  email: {
    type: String,
    required: [true, 'A user must have an email'],
    trim: true,
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email'], //converts the entered email to lowercase
  },
  role:{
    type:String,
    default:"student"
  },
  photo: {
    type: String,
  },
  forms: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Form",
    },
  ],
  id:{
    type:Number,
    required:[true,"A student must have an id"],
    unique:true,
    minlength:[2000000,"Invalid student Id"],
    maxlength:[9999999,"Invalid student Id"]
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: [8, 'A password must have atleast 8 characters'],
    select: false,
  },

  branch:{
    type:String,
    enum:['ECE','CSE','AIML','EE','ME'],
    required:[true,"There should be a branch name"]
  },
  hostel:{
    type:String,
    enum:['Kailash','Rudra','Kedar'],
    required:[true,"There should be a hostel name"]
  },
  
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password'],
    validate: {
      validator: function (val) {
        return val == this.password;
      },
      message: 'Password and Confirm Password must be same ',
    },
  },
  passwordChangedAt: Date,
});

studentSchema.pre('save', async function (next) {
  // runs this function only if the password was modified
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12); // hashing algorithm (Async version)

  this.passwordConfirm = undefined;
  next();
});

studentSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};
studentSchema.methods.changedPasswordAfter = async function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    return JWTTimestamp < changedTimestamp;
  }

  return false;
};

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
