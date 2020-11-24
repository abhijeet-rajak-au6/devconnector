const { Router } = require("express");

const router = Router();
const { checkUser } = require("../middleware/userMiddleware");
const { autentication } = require("../middleware/auth");

const {
  addPost,
  getAllPost,
  getPostById,
  deletePost,
  likePost,
  disLikePost,
  addComment,
  deleteComment
} = require("../Controllers/postController");

router.post("/addPost", [autentication, checkUser("CHECK_POST")], addPost);
router.get("/allPost", autentication, getAllPost);
router.get("/getPostById/:postId", autentication, getPostById);
router.delete("/removePost/:postId", autentication, deletePost);
router.patch("/post/like/:postId", autentication, likePost);
router.patch("/post/dislike/:postId", autentication, disLikePost);
router.patch("/post/addComment/:postId",[autentication,checkUser("ADD_COMMENT")],addComment);
router.delete("/post/removeComment/:postId/:commentId",autentication,deleteComment);

module.exports = router;
