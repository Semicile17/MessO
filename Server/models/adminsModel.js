const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs')

const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'An admin must have a name'],
    trim: true,
    maxlength: [40, 'A name must have at most 40 characters'],
  },
  number: {
    type: String,
    required: [true, 'An admin must have a contact number'],
    validate: {
      validator: function (value) {
        return validator.isMobilePhone(value);
      },
      message: 'Please provide a valid phone number',
    },
  },
  role: {
    type: String,
    enum: ['warden', 'caretaker', 'devs'],
    required: [true, 'An admin must have a role'],
  },
  hostel: {
    type: String,
    enum: ['Kailash', 'Rudra', 'Kedar'], 
    required: function () {
      return this.role === 'warden' || this.role === 'caretaker';
    },
  },
  email: {
    type: String,
    required: [true, 'An admin must have an email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email'],
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: [8, 'A password must have atleast 8 characters'],
    select: false,
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

});

adminSchema.pre('save', async function (next) {
  // runs this function only if the password was modified
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12); // hashing algorithm (Async version)

  this.passwordConfirm = undefined;
  next();
});

adminSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

adminSchema.methods.changedPasswordAfter = async function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    return JWTTimestamp < changedTimestamp;
  }

  return false;
};

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;
