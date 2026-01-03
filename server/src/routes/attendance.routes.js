const express = require("express");
const router = express.Router();

const {
  markSchoolAttendance,
  markSubjectAttendance
} = require("../controllers/attendance.controller");

const { protect } = require("../middleware/auth.middleware");
const {
  schoolOnly,
  collegeOnly
} = require("../middleware/role.middleware");
const { onboardingRequired } = require("../middleware/onboarding.middleware");

// SCHOOL
router.post(
  "/school",
  protect,
  markSchoolAttendance
);

// COLLEGE
router.post(
  "/college",
  protect,
  markSubjectAttendance
);

module.exports = router;
