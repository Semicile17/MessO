const Form = require("../models/formModel");
const Student = require("../models/studentModel");
const APIFeatures = require("../utils/apiFeatures")


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

exports.updateForm = async (req, res) => {
  try {

    const {id} = req.params;
    const {status} = req.body;

    
    if (!status) {
      return res.status(400).json({
        status: "fail",
        message: "Status is required",
      });
    }

    const form = await Form.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true } 
    );

    if (!form) {
      return res.status(404).json({
        status: "fail",
        message: "No form found with that ID",
      });
    }

    
    return res.status(200).json({
      status: "success",
      results: forms.length,
      data: {
        form: form,
      },
    });
  
  } catch (err) {
    return res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.updateAllForms = async (req, res) => {
  try {
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({
        status: "fail",
        message: "Status is required",
      });
    }

    // Update all forms with the new status
    const result = await Form.updateMany(
      {}, // Empty filter to match all documents
      { status },
      { new: true, runValidators: true } // Options are ignored for updateMany
    );

    // Check how many documents were modified
    const { modifiedCount } = result;

    return res.status(200).json({
      status: "success",
      message: `${modifiedCount} forms updated`,
    });
  } catch (err) {
    return res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

