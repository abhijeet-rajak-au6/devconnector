const { check, validationResult } = require("express-validator");
const userModel = require("../models/User");
const gravatar = require("gravatar");

module.exports = {
  async userRegister(req, res, next) {
    try {
      const { email, name, password } = req.body;
      let errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
        });
      }

      const avatar = gravatar.url(email, {
        s: "200",
        r: "pg",
        d: "mm",
      });
      const newUser = await userModel.create({
        name,
        email,
        password,
        avatar,
      });
      return res.status(200).send({
        msg: "user registerd sucessfully",
      });
    } catch (err) {
      let error = new Error();
      if (err.message.includes("email_1 dup key")) {
        error.msg = "email is already registered";
        error.statusCode = 403;
        error.status = "fail";
        return next(error);
      }
      error.msg = err.message;
      return next(error);
    }
  },
  async userLogin(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).send({
          errors: errors.array(),
        });
      }
      const { email, password } = req.body;
      const user = await userModel.findByEmailAndPassword(email, password);
      console.log(user);
      const { name, avatar } = user;
      const token = await user.generateToken();
      return res.status(200).send({
        status: "success",
        id:user._id,
        token: user.token,
        name,
        email,
        avatar,
      });
    } catch (err) {
      let errors = new Error();
      console.log(err);
      // console.log(err.includes("Incorrect creedential"));
      if (err.includes("Incorrect credential")) {
        console.log(111);
        errors.statusCode = 403;
        errors.msg = err;
        errors.status = "fail";
        next(errors);
      }
      errors.statusCode = 500;
      errors.msg = err.message;
      errors.status = "fail";
      return next(errors);
    }
  },
  async removeUser(req, res, next) {
    try {
      const userRemoved = await userModel.findOneAndDelete({ _id: req.userId });
      // console.log("userRemoved",userRemoved);
      if (!userRemoved) {
        throw new Error("profile not found");
      }
      return res.status(201).send({
        status: "success",
        msg: "user removed",
      });
    } catch (err) {
      let errors = new Error();
      if (err.message.includes("profile not found")) {
        errors.statusCode = 404;
        errors.msg = "profile not found";
        errors.status = "fail";
        return next(errors);
      }
      errors.statusCode = 500;
      errors.msg = err.message;
      errors.status = "fail";
      return next(errors);
    }
  },
  async userLogout(req, res, next) {
    console.log("IN LOGOUT");
    try {
      const user = await userModel.findByIdAndUpdate(
        req.userId,
        { token: null },
        { new: true }
      );
      console.log(user);
      return res.status(201).send({
        status: "success",
        msg: "Thank you visit again",
      });
    } catch (err) {
      let errors = new Error();
      errors.statusCode = 500;
      errors.msg = err.message;
      errors.status = "fail";
      return next(errors);
    }
  },
};
