const profileModel = require("../models/Profile");
const userModel = require("../models/User");
const { validationResult } = require("express-validator");
// const moment = require("moment-timezone");
const fetch = require("node-fetch");

module.exports = {
  async getUserProfile(req, res, next) {
    try {
      const userProfile = await profileModel
        .findOne({ user: req.userId })
        .populate("user", ["name", "avatar"]);
      // if (!userProfile) {
      //   throw new Error("user profile not found");
      // }
      console.log(userProfile);
      return res.status(200).send({
        userProfile,
      });
    } catch (err) {
      let error = new Error();
      error.status = "fail";
      if (err.message === "user profile not found") {
        error.statusCode = 404;
        error.msg = "user profile donot exist";
        return next(error);
      }
      error.statusCode = 404;
      error.msg = err.message;
      return next(error);
    }
  },

  async addProfile(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(404).send({
          errors: errors.array(),
        });
      }
      const {
        social: { youtube, linkedin, facebook, twitter, instagram },
      } = req.body;
      const userProfile = await profileModel.findOne({ user: req.userId });
      console.log("user profile", userProfile);
      if (!userProfile) {
        await profileModel.create({
          ...req.body,
          user: req.userId,
          skills: req.body.skills.split(",").map((skill) => skill.trim()),
        });
        return res.status(201).send({
          status: "success",
          msg: "profile has been created sucessfully",
        });
      }
      const updatedUserProfile = await profileModel.findOneAndUpdate(
        { user: req.userId },
        {
          ...req.body,
          skills: req.body.skills.split(",").map((skill) => skill.trim()),
          social: {
            youtube,
            facebook,
            linkedin,
            instagram,
            twitter,
          },
        },
        { new: true }
      );
      return res.status(201).send({
        status: "success",
        msg: "profile updated successfully",
      });
    } catch (err) {
      let errors = new Error();
      errors.statusCode = 500;
      errors.status = "fail";
      errors.msg = err.message;
      return next(errors);
    }
  },
  async getAllProfile(req, res, next) {
    try {
      const profiles = await profileModel
        .find()
        .populate("user", ["name", "avatar"]);
      if (!profiles) {
        throw new Error("profile not found");
      }
      return res.status(200).send({
        profiles,
      });
    } catch (err) {
      let errors = new Error();
      if (err.message.includes("profile not found")) {
        errors.statusCode = 404;
        errors.msg = err.message;
        errors.status = "fail";
        return next(errors);
      }
      errors.statusCode = 500;
      errors.msg = err.message;
      errors.status = "fail";
      return next(errors);
    }
  },
  async getProfileById(req, res, next) {
    try {
      const profile = await profileModel
        .findOne({ user: req.params.userId })
        .populate("user", ["name", "avatar"]);
      if (!profile) {
        throw new Error("profile not found");
      }
      return res.status(200).send({
        status: "success",
        profile,
      });
    } catch (err) {
      let errors = new Error();
      if (err.message.includes("profile not found")) {
        errors.statusCode = 404;
        errors.msg = err.message;
        errors.status = "fail";
        return next(errors);
      } else if (err.kind.includes("ObjectId")) {
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
  async updateProfileExperience(req, res, next) {
    try {
      let errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).send({
          errors: errors.array(),
        });
      }
      const profile = await profileModel.findOne({ user: req.userId });
      if (!profile) {
        throw new Error("profile not found");
      }

      profile.experience.push({ ...req.body });
      const updatedProfile = await profile.save();
      return res.status(201).send({
        status: "success",
        updatedProfile,
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
  async deleteExperience(req, res, next) {
    try {
      const { expId } = req.params;
      const profile = await profileModel.findOne({ user: req.userId });
      profile.experience = profile.experience.filter((exp) => exp.id !== expId);
      console.log(profile.experience);
      const updatedProfile = await profile.save();
      return res.status(201).send({
        status: "success",
        msg: "expreience deleted successfully",
        updatedProfile,
      });
    } catch (err) {
      let errors = new Error();
      errors.statusCode = 500;
      errors.msg = err.message;
      errors.status = "fail";
      return next(errors);
    }
  },
  async addEducation(req, res, next) {
    try {
      let errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).send({
          errors: errors.array(),
        });
      }
      console.log(req.body);
      const profile = await profileModel.findOne({ user: req.userId });
      // profile.education = [];
      profile.education.push({
        ...req.body,
      });
      console.log(profile.education);
      const updatedProfile = await profile.save();
      console.log("updated profile", updatedProfile);
      return res.status(201).send({
        msg: "added education successfully",
        status: "success",
        updatedProfile,
      });
    } catch (err) {
      let errors = new Error();
      errors.statusCode = 500;
      errors.msg = err.message;
      errors.status = "fail";
      return next(errors);
    }
  },
  async deleteEducation(req, res, next) {
    try {
      const { eduId } = req.params;
      const profile = await profileModel.findOne({ user: req.userId });
      profile.education = profile.education.filter((edu) => edu.id !== eduId);
      console.log(profile.education);
      const updatedProfile = await profile.save();
      return res.status(201).send({
        status: "success",
        msg: "education deleted successfully",
        updatedProfile,
      });
    } catch (err) {
      let errors = new Error();
      errors.statusCode = 500;
      errors.msg = err.message;
      errors.status = "fail";
      return next(errors);
    }
  },
  async getAllUserRepos(req, res, next) {
    try {
      const { username } = req.params;
      const response = await fetch(
        `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.GIT_HUB_CLIENT_ID}&client_secret=${process.env.GIT_HUB_SECRECT}`,
        {
          method: "GET",
          headers: { "user-agent": "node.js" },
        }
      );
      
      const repos = await response.json();
      console.log(repos);
      return res.status(200).send({
        status: "success",
        count: repos.length,
        repos,
      });
    } catch (err) {
      console.log(err.message);
      let errors = new Error();
      errors.statusCode = 500;
      errors.msg = err.message;
      errors.status = "fail";
      return next(errors);
    }
  },
  async getUserRepos(req, res, next) {
    try {
      console.log("hello");
      const user = await profileModel.findOne({ user: req.userId });
      if (!user) {
        throw new Error("no user found");
      }
      const response = await fetch(
        `https://api.github.com/users/${user.githubUserName}/repos?per_page=5&sort=created:asc&client_id=${process.env.GIT_HUB_CLIENT_ID}&client_secret=${process.env.GIT_HUB_SECRECT}`,
        {
          method: "GET",
          headers: { "user-agent": "node.js" },
        }
      );
      const repos = await response.json();
      return res.status(200).send({
        status: "success",
        count: repos.length,
        repos,
      });
    } catch (err) {
      console.log(err.message);
      let errors = new Error();
      errors.statusCode = 500;
      errors.msg = err.message;
      errors.status = "fail";
      return next(errors);
    }
  },
};
