import express from "express";
import {
  getFeedPosts,
  getUserPosts,
  likePost,
  createPost,
  createComment,
  editPost,
  deletePost,
  getPostById,
} from "../controllers/postController.js";
import { protect } from "../middleware/authMiddleware.js";
import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "backend/public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
export const upload = multer({ storage });

const router = express.Router();

//Create
router.post("/", protect, upload.single("picture"), createPost);

//Read
router.get("/", protect, getFeedPosts);
router.get("/:userId/posts", protect, getUserPosts);
router.get("/:id", protect, getPostById);

// UPDATE
router.put("/edit", protect, upload.single("picture"), editPost);
router.patch("/:id/like", protect, likePost);
router.post("/:postId/comments", protect, createComment);

//delete
router.delete("/delete", protect, deletePost);

//routes for react native
router.post("/allpostapp", protect, getFeedPosts);

export default router;
