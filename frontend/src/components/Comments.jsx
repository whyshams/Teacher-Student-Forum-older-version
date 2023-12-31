import React, { useState, useContext } from "react";
import axios from "axios";
import MainContext from "../context/MainContext";
import { useSelector } from "react-redux";

const PostDetail = ({ post }) => {
  const [newComment, setNewComment] = useState("");
  const { postsUpdated, setPostsUpdated } = useContext(MainContext);

  const { userData } = useSelector((state) => state.auth);

  const handleCommentCreate = async () => {
    try {
      await axios.post(`/api/v2/posts/${post._id}/comments`, {
        userId: userData._id,
        text: newComment,
      });
      setPostsUpdated(!postsUpdated);
      // Reset new comment input
      setNewComment("");
    } catch (error) {
      console.error("Error creating comment:", error);
    }
  };

  return (
    <div className="d-flex flex-column text-center p-2">
      {/* Existing code to display post */}

      <h3>Add a New Comment</h3>
      <textarea
        className="commentArea"
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
      />
      <div className="d-center">
        <button className="commentBtn " onClick={handleCommentCreate}>
          Add Comment
        </button>
      </div>
    </div>
  );
};

export default PostDetail;
