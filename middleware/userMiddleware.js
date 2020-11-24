const { check, validationResult } = require("express-validator");

module.exports = {
  checkUser(method) {
    switch (method) {
      case "USER_VALIDATION":
        return [
          check("email")
            .not()
            .isEmpty()
            .withMessage("please provide your email")
            .isEmail()
            .withMessage("please enter a valid email"),
          check("name").not().isEmpty().withMessage("please provide your name"),
          check("password")
            .not()
            .isEmpty()
            .withMessage("please provide your password")
            .isLength({ min: 6 })
            .withMessage("password must be atleat 6 character long")
            .matches(/\d{1}/)
            .withMessage("password must contain atleast 1 number")
            .matches(/.*[a-zA-Z]+.*/)
            .withMessage("password must contain atleast 1 aplhabet")
            .matches(/[$&+,:;=?@#|'<>.^*()%!-]/)
            .withMessage("password must contain atleat one special character"),
        ];
      case "USER_LOGIN":
        return [
          check("email")
            .not()
            .isEmpty()
            .withMessage("please provide your email")
            .isEmail()
            .withMessage("please enter a valid email"),
          check("password")
            .not()
            .isEmpty()
            .withMessage("please provide your password")
            .isLength({ min: 6 })
            .withMessage("password must be atleat 6 character long")
            .matches(/\d{1}/)
            .withMessage("password must contain atleast 1 number")
            .matches(/[$&+,:;=?@#|'<>.^*()%!-]/)
            .withMessage("password must contain atleat one special character"),
        ];

      case "CHECK_PROFILE":
        return [
          check("status").not().isEmpty().withMessage("status is  required"),
          check("skills").not().isEmpty().withMessage("skills is required"),
        ];
      case "UPDATE_PROFILE":
        return [
          check("title").not().isEmpty().withMessage("title is required"),
          check("company").not().isEmpty().withMessage("company is required"),
          check("from").not().isEmpty().withMessage("starting date is required")
        ]
      case "ADD_EDUCATION":
        return [
          check("institution").not().isEmpty().withMessage("please enter the name of the institution"),
          check("degree").not().isEmpty().withMessage("please enter your degree"),
          check("fieldOfStudy").not().isEmpty().withMessage("please enter field of study"),
          check("from").not().isEmpty().withMessage("Please enter the starting date")

        ];
      case "CHECK_POST":
        return [
          check("text").not().isEmpty().withMessage("please enter the post text")
        ]
      case "ADD_COMMENT":
        return[
          check("text").not().isEmpty().withMessage("please add comment")
        ]
      default:
        return "Invalid method";
    }
  },
};
