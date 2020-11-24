const postModel = require("../models/Post");
const userModel = require("../models/User");
const { validationResult } = require("express-validator");
const { post } = require("../Routes/postRoutes");
const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");
const { collection } = require("../models/Post");
module.exports = {
  async addPost(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(403).send({
          errors: errors.array(),
        });
      }
      const user = await userModel.findById(req.userId);
      const postSaved = await postModel.create({
        ...req.body,
        user: req.userId,
      });
      const post = await postModel
        .findOne({ _id: postSaved._id })
        .populate("user", ["name", "avatar"]).sort("date");
      return res.status(201).send({
        status: "success",
        msg: "post sucessfully created",
        post,
      });
    } catch (err) {
      let errors = new Error();
      errors.statusCode = 500;
      (errors.status = "fail"), (errors.msg = err.message);
      return next(errors);
    }
  },
  async getAllPost(req, res, next) {
    try {
      const posts = await postModel
        .find({})
        .sort({ date: 1 })
        .populate("user", ["name", "avatar"]);
      if (!posts) {
        throw new Error("no post available");
      }
      return res.status(200).send({
        posts,
      });
    } catch (err) {
      let errors = new Error();
      errors.status = "fail";
      if (err.message.includes("no post available")) {
        errors.statusCode = 404;
        errors.msg = err.message;
        return next(errors);
      }
      errors.statusCode = 500;
      errors.msg = err.message;
      return next(errors);
    }
  },
  async getPostById(req, res, next) {
    try {
      const post = await postModel
        .findOne({ _id: req.params.postId })
        .populate("comments.user", ["name", "avatar"])
        .populate("user", ["name", "avatar"]);
      if (!post) {
        throw new Error("no post available");
      }
      return res.status(200).send({
        post,
      });
    } catch (err) {
      let errors = new Error();
      errors.status = "fail";
      if (err.message.includes("no post available")) {
        errors.statusCode = 404;
        errors.msg = err.message;
        return next(errors);
      } else if ((err.kind = "ObjectId")) {
        errors.statusCode = 403;
        errors.msg = "no post available";
        return next(errors);
      }
      errors.statusCode = 500;
      errors.msg = err.message;
      return next(errors);
    }
  },
  async deletePost(req, res, next) {
    try {
      console.log(req.params.postId);
      const userPost = await postModel.findOne({ _id: req.params.postId });
      if (!userPost) {
        throw new Error("post not found");
      }
      if (userPost.user.toString() !== req.userId) {
        throw new Error("user is not authorized");
      } else {
        const delPost = await postModel.findOneAndDelete({
          _id: req.params.postId,
          user: req.userId,
        });
        return res.status(201).send({
          msg: "deleted sucessfully ",
          status: "success",
        });
      }
    } catch (err) {
      let errors = new Error();
      errors.status = "fail";
      if (err.message.includes("post not found")) {
        errors.statusCode = 404;
        errors.msg = err.message;
        return next(errors);
      } else if (err.message.includes("user is not authorized")) {
        errors.statusCode = 401;
        errors.msg = err.message;
        return next(errors);
      } else if ((err.kind = "ObjectId")) {
        errors.statusCode = 403;
        errors.msg = "no post available";
        return next(errors);
      }
      errors.statusCode = 404;
      errors.msg = err.message;
      return next(errors);
    }
  },
  async likePost(req, res, next) {
    try {
      const post = await postModel.findOne({ _id: req.params.postId });
      if (!post) {
        throw new Error("post not found");
      }
      // check post is already been like
      if (post.likes.find((like) => like.user.toString() === req.userId)) {
        throw new Error("post has already been like");
      }
      post.likes.push({
        user: req.userId,
      });
      const savedPost = await post.save();
      return res.status(201).send({
        status: "success",
        posts: savedPost,
        msg: "Post has been liked sucessfully",
      });
    } catch (err) {
      let errors = new Error();
      errors.status = "fail";
      if (err.message.includes("post has already been like")) {
        errors.msg = err.message;
        err.statusCode = 403;
        return next(errors);
      } else if (err.message.includes("post not found")) {
        errors.msg = err.message;
        err.statusCode = 404;
        return next(errors);
      } else if ((err.kind = "ObjectId")) {
        errors.statusCode = 403;
        errors.msg = "no post available";
        return next(errors);
      }
      errors.statusCode = 404;
      errors.msg = err.message;
      return next(errors);
    }
  },
  async disLikePost(req, res, next) {
    try {
      const post = await postModel.findOne({ _id: req.params.postId });
      console.log(post);
      if (!post) {
        throw new Error("post not found");
      }
      if (!post.likes.find((like) => like.user.toString() === req.userId)) {
        throw new Error("Post is not liked");
      }
      const deletePostIndex = post.likes.findIndex(
        (like) => like.user.toString() === req.userId
      );
      if (deletePostIndex === -1) {
        throw new Error("Post is not liked");
      }
      post.likes.splice(deletePostIndex, 1);
      const savedPost = await post.save();
      return res.status(201).send({
        status: "success",
        posts: savedPost,
        msg: "Post has been disliked",
      });
    } catch (err) {
      let errors = new Error();
      errors.status = "fail";
      if (err.message.includes("Post is not liked")) {
        errors.msg = err.message;
        err.statusCode = 403;
        return next(errors);
      } else if (err.message.includes("post not found")) {
        errors.msg = err.message;
        err.statusCode = 404;
        return next(errors);
      } else if ((err.kind = "ObjectId")) {
        errors.statusCode = 403;
        errors.msg = "no post available";
        return next(errors);
      }

      errors.msg = err.message;
      err.statusCode = 500;
      return next(errors);
    }
  },
  sortByDate(a,b){
    console.log("a",a);
    console.log("b",b);
  },
  async addComment(req, res, next) {
    try {
      console.log("hi");
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).send({
          errors: errors.array(),
        });
      }
      const post = await postModel.findOne({ _id: req.params.postId });
      if (!post) {
        throw new Error("post not find");
      }
      post.comments.push({
        user: req.userId,
        text: req.body.text,
        date: new Date(),
      });
      const commentPost = await post.save();
      console.log(mongoose.Types.ObjectId(req.params.postId));
      const postDetails = await postModel.aggregate([
        {
          $match: {
            _id: mongoose.Types.ObjectId(req.params.postId),
          },
        },
        {
          $unwind: { path: "$comments" },
        },
        {
          $lookup: {
            from: "users",
            localField: "comments.user",
            foreignField: "_id",
            as: "userInfo",
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "user",
            foreignField: "_id",
            as: "user",
          },
        },
        {
          $unwind: { path: "$user" },
        },
        // {
        //   $unwind: { path: "$likes" },
        // },

        {
          $addFields: {
            "comments.userInfo": "$userInfo",
          },
        },
        {
          $sort: { "comments.date": 1 },
        },
        {
          $group: {
            _id: "$_id",
            comments: { $addToSet: "$comments" },
            likes: { $addToSet: "$likes" },
            text: { $addToSet: "$text" },
            user: { $addToSet: "$user" },
            date: { $addToSet: "$comments.date" },
          },
        },
      ]);

      // console.log("post", postDetails);
      // console.log("postdetails ", postDetails[0].comments);
     
    //   console.log("hello");
      let commentList = postDetails[0].comments.map((comment) => {
        return {
          _id: comment._id,
          text: comment.text,
          date: comment.date,
          user: {
            _id:comment.userInfo[0]._id,
            name: comment.userInfo[0].name,
            avatar: comment.userInfo[0].avatar,
          },
        };
      });
      let postFilter={
        _id: postDetails[0]._id,
          text: postDetails[0].text[0],
          date: postDetails[0].date[0],
          user: {
            _id: postDetails[0].user[0]._id,
            name: postDetails[0].user[0].name,
            avatar: postDetails[0].user[0].avatar,
          },
          comments: commentList,
      }

     let newPost= postFilter.comments.sort((a,b)=>{
        console.log("a",a.date);
        console.log("b",b.date);
        if(new Date(a.date).getTime() < new Date(b.date).getTime()){
          console.log("hi");
          return -1
        }
        else if(new Date(a.date) > new Date(b.date)){
          console.log("hello");
          return 1
        }
        else return 0
        
    });
    // console.log("postFilter", postFilter);

      // console.log(commentList);

      // post.comments = [];
      // await post.save()

      return res.status(201).send({
        status: "success",
        msg: "commnent is added sucessfully",
        post: postFilter
      });
    } catch (err) {
      let errors = new Error();
      console.log(err.message);
      errors.status = "fail";
      if (err.message.includes("post not found")) {
        errors.msg = err.message;
        err.statusCode = 404;
        return next(errors);
      }
      errors.msg = err.message;
      err.statusCode = 500;
      return next(errors);
    }
  },
  //   @todo
  async deleteComment(req, res, next) {
    try {
      console.log(req.params.commentId);
      console.log(req.params.postId);
      const post = await postModel.findOne({ _id: req.params.postId }).populate("comments.user",["_id","name","avatar"]).populate("user",["_id","name","avatar"]);
      console.log(post);
      const comment = post.comments.find(
        (comment) => req.params.commentId === comment._id.toString()
      );
        console.log('comment',comment);
      if (req.userId !== comment.user._id.toString() && comment) {
        throw new Error("user is not unauthorized");
      }
      const delIndex = post.comments.findIndex((comment) => {
        return comment._id.toString() === req.params.commentId;
      });
      if (delIndex === -1) {
        throw new Error("comment not found");
      }
      post.comments.splice(delIndex, 1);
      const delComment = await post.save();
      return res.status(201).send({
        status: "success",
        msg: "deleted sucessfully",
        post: delComment,
      });
    } catch (err) {
      console.log(err);
      let errors = new Error();
      errors.status = "fail";
      if (err.message.includes("user is not unauthorized")) {
        errors.statusCode = 401;
        errors.msg = err.message;
        return next(errors);
      }
      errors.msg = err.message;
      err.statusCode = 500;
      return next(errors);
    }
  },
};
