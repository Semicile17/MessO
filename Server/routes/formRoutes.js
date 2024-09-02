const express = require("express");
const formController = require("../controllers/formController");
const { protect, restrictTo } = require("../controllers/authController");
const router = express.Router();

router
  .route("/")
  .post(formController.addForm)
  .get(
    formController.getAllForms
  );

router
  .route("/forms/:id")
  .patch(protect, restrictTo("warden", "devs"), formController.updateForm);

router
  .route("/forms")
  .patch(protect, restrictTo("warden", "devs"), formController.updateAllForms);

module.exports = router;
