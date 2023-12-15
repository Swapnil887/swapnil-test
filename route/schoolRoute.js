const express = require("express");
const authenticattion = require("../middleware/authentication");
const authorization = require("../middleware/authorization");
const schoolController = require("../controller/schoolController");
const Establishment = require("../model/schoolModel");

const schoolRoute = express.Router();

schoolRoute.get("/", schoolController.getAllSchools);

schoolRoute.get("/:urn", authenticattion, schoolController.getUniqueSchool);

schoolRoute.post(
  "/",
  authenticattion,
  authorization,
  schoolController.createSchool
);

schoolRoute.delete(
  "/:urn",
  authenticattion,
  authorization,
  schoolController.deleteSchool
);

schoolRoute.get("/search/s", schoolController.searchSchool);

schoolRoute.get("/filter/f", schoolController.filterController);

module.exports = schoolRoute;
