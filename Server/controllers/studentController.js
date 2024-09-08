const Form = require("../models/formModel");
const Student = require("../models/studentModel");
const APIFeatures = require('../utils/apiFeatures');

// exports.addForm = async (req, res) => {
//   try {
//     const data = req.body;
//     const form = await Form.create(data);
//     return res.status(201).json({
//       status: "success",
//       message: "Form added successfully",
//     });
//   } catch (err) {
//     return res.status(400).json({
//       status: "fail",
//       message: err.message,
//     });
//   }
// };

exports.getAllStudents = async (req, res) => {
  try {
    const features = new APIFeatures(Student.find().populate("forms"), req.query)
      .filter()
      .sort()
      .limitFields()
      .pagination();
    
    const students = await features.query;
    
    return res.status(200).json({
      status: "success",
      results: students.length,
      data: {
        students: students,
      },
    });
  
  } catch (err) {
    return res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};
