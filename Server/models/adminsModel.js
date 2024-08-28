const mongoose = require('mongoose');
const validator = require('validator');

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
});

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;
