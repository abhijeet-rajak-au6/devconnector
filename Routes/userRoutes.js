const { Router } = require("express");
const { userRegister, userLogin, removeUser,userLogout } = require("../Controllers/userController");
const { checkUser } = require("../middleware/userMiddleware");
const { autentication } = require("../middleware/auth");
const router = Router();

router.post(
  "/register",
  checkUser("USER_VALIDATION"),
  userRegister
);

router.post("/login",[checkUser("USER_LOGIN")],userLogin);

// router.get("/",autentication,(req,res)=>{
//     return res.status(200).send({
//         msg:"welcome to test route"
//     })
// });

router.delete("/removeUser",autentication,removeUser);
router.delete("/logout",autentication,userLogout);

module.exports = router;
