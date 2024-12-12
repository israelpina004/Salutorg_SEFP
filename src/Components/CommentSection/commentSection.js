import React, { useState, useEffect } from "react";
import "./commentSection.css";
const CommentSection = () => {
  const [userId, setUserId] = useState(null); // Store user ID
  const [username, setUsername] = useState("Visitor"); // Default to "Visitor"
  const [comment, setComment] = useState(""); // Comment input
  const [message, setMessage] = useState(""); // Success/error message
  const [loading, setLoading] = useState(false); // Loading state
  const [comments, setComments] = useState([]); // Store previous comments

  const API_URL = `http://localhost:${process.env.REACT_APP_API_PORT || 5000}/api`;

  // Fetch logged-in user details
  useEffect(() => {
    const fetchLoggedInUser = async () => {
      try {
        const response = await fetch(`${API_URL}/getlogin`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        });

        if (response.ok) {
          const data = await response.json();
          if (data.loggedInUser) {
            setUserId(data.loggedInUser.user_ID);
            setUsername(data.loggedInUser.username);
          }
        } else {
          console.warn("No logged-in user detected.");
        }
      } catch (error) {
        console.error("Error fetching logged-in user:", error.message);
      }
    };

    console.log("User: ", fetchLoggedInUser());
  }, [API_URL]);

  // Fetch all comments
  /*useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(`${API_URL}/comments`);
        if (response.ok) {
          const data = await response.json();
          setComments(data); // Set fetched comments
        } else {
          console.warn("Failed to fetch comments.");
        }
      } catch (error) {
        console.error("Error fetching comments:", error.message);
      }
    };

    fetchComments();
  }, [API_URL]);*/

  const fetchComments = async () => {
    try {
      const response = await fetch(`http://localhost:${process.env.REACT_APP_API_PORT}/api/getcomment`);
      if (response.ok) {
        const data = await response.json();
        setComments(data); // Update the comments state with the latest data
      } else {
        console.warn("Failed to fetch comments.");
      }
    } catch (error) {
      console.error("Error fetching comments:", error.message);
    }
  };
  
  fetchComments();
  
  // Handle comment submission
  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    if (!comment.trim()) {
      setMessage("Comment cannot be empty.");
      return;
    }

    if (comment.trim().length > 500) {
      setMessage("Comment cannot exceed 500 characters.");
      return;
    }

    setLoading(true); // Start loading
    try {
      const response = await fetch(`${API_URL}/addcomment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          username,
          comment,
        }),
      });

      if (response.ok) {
        setMessage("Comment added successfully!");
        setComment(""); // Clear comment input
        fetchComments();

        // Reload comments
        
        const updatedComments = await response.json();
        console.log(updatedComments);
        setComments([...comments, updatedComments]);
      } else {
        const errorData = await response.json();
        setMessage(`Error: ${errorData.error}`);
      }
    } catch (error) {
      setMessage("Failed to add comment. Please try again later.");
      console.error("Error submitting comment:", error.message);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  
  

  return (
    <div className="comment-section">
      <h2>Leave a Comment</h2>
      <form onSubmit={handleCommentSubmit}>
        <div>
          <label htmlFor="comment">Comment:</label>
          <textarea
            id="comment"
            value={comment}
            onChange={(e) => {
              setComment(e.target.value);
              setMessage(""); // Clear previous message
            }}
            placeholder="Write your comment here..."
            rows="4"
            maxLength="500"
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Posting..." : "Post Comment"}
        </button>
      </form>
      {message && <p>{message}</p>}

      <div className="comments-list">
        <h3>Previous Comments</h3>
        {comments.length > 0 ? (
          comments.map((comment, index) => (
            <div key={index} className="comment-item">
              <p>
                <strong>{comment.username}:</strong> {comment.comment}
              </p>
            </div>
          ))
        ) : (
          <p>No comments yet.</p>
        )}
      </div>
    </div>
  );
};

export default CommentSection;