// import React, { useState, useEffect } from "react";
// import { useUser } from "../UserContext";


// const CommentSection = () => {
//   const { user } = useUser(); // Access the logged-in user (if any)
//   const [comments, setComments] = useState([]);
//   const [newComment, setNewComment] = useState("");

//   // Fetch comments from the backend
//   useEffect(() => {
//     fetch(`http://localhost:${process.env.REACT_APP_API_PORT}/api/comments`)
//       .then((res) => res.json())
//       .then((data) => setComments(data))
//       .catch((err) => console.error("Error fetching comments:", err));
//   }, []);

//   // Handle adding a new comment
//   const handleAddComment = () => {
//     if (newComment.trim() === "") {
//       alert("Comment cannot be empty!");
//       return;
//     }

//     const commentData = {
//       userId: user?.id || null,
//       username: user?.username || "Visitor",
//       comment: newComment,
//     };

//     fetch(`http://localhost:${process.env.REACT_APP_API_PORT}/api/comments`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(commentData),
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         if (data.success) {
//           // Fetch updated comments
//           fetch(`http://localhost:${process.env.REACT_APP_API_PORT}/api/comments`)
//             .then((res) => res.json())
//             .then((data) => setComments(data));
//           setNewComment(""); // Clear the input
//         } else {
//           alert("Failed to add comment.");
//         }
//       })
//       .catch((err) => console.error("Error adding comment:", err));
//   };

//   return (
//     <div>
//       <h2>Comments</h2>
//       <div>
//         <textarea
//           value={newComment}
//           onChange={(e) => setNewComment(e.target.value)}
//           placeholder="Write your comment here..."
//           rows="4"
//           cols="50"
//         />
//         <button onClick={handleAddComment}>Add Comment</button>
//       </div>
//       <ul>
//         {comments.map((comment) => (
//           <li key={comment.id}>
//             <strong>{comment.username}:</strong> {comment.comment}
//             <div>
//               <small>{new Date(comment.createdAt).toLocaleString()}</small>
//             </div>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default CommentSection;