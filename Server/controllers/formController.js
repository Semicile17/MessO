const Form = require("../models/formModel");
const Student = require("../models/studentModel");


exports.addForm = async (req, res) => {
  try {
    const data = req.body;
    const form = await Form.create(data);
    return res.status(201).json({
      status: "success",
      message: "Form added successfully",
    });
  } catch (err) {
    return res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.getAllForms = async (req, res) => {
  try {

    const features = new APIFeatures(Form.find().populate("student"), req.query)
      .filter()
      .sort()
      .limitFields()
      .pagination();

    const forms = await features.query;

    console.log(forms)
    
    return res.status(200).json({
      status: "success",
      results: forms.length,
      data: {
        forms: forms,
      },
    });
  
  } catch (err) {
    return res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};
