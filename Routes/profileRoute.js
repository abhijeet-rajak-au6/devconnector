const { Router } = require("express");
const router = Router();
const { autentication } = require("../middleware/auth");
const { checkUser } = require("../middleware/userMiddleware");
const {
  getUserProfile,
  addProfile,
  getAllProfile,
  getProfileById,
  updateProfileExperience,
  deleteExperience,
  addEducation,
  deleteEducation,
  getUserRepos,
  getAllUserRepos

} = require("../Controllers/profileController");
const { check } = require("express-validator");

router.get("/me", autentication, getUserProfile);
router.post(
  "/addProfile",
  [autentication, checkUser("CHECK_PROFILE")],
  addProfile
);
router.get("/getAllProfiles", getAllProfile);
router.get("/getProfileById/:userId", getProfileById);

router.patch(
  "/updateExperience",
  [autentication, checkUser("UPDATE_PROFILE")],
  updateProfileExperience
);

router.delete("/deleteExperiencne/:expId", [autentication], deleteExperience);
router.patch(
  "/addEducation",
  [autentication, checkUser("ADD_EDUCATION")],
  addEducation
);

router.delete("/deleteEducation/:eduId",autentication, deleteEducation);

router.get("/getRepos", autentication,getUserRepos);
router.get("/getUserRepos/:username",getAllUserRepos);

module.exports = router;
