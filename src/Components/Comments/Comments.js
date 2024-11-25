import { useEffect, useState } from "react";
import { getComments as getCommentsApi, createComment as createCommentApi} from "../../api";
import Comment from "./Comment";
import CommentForm from "./CommentForm";

const Comments = ({currentUserId}) =>{
const [backendComments, setBackendComments] = useState([])
const [activeComment, setActiveComment] = useState(null)
const rootComments = backendComments.filter((backendComment) => backendComment.parentId===null)

const getReplies = commentId => {
    return backendComments.filter(backendComment => backendComment.parentId === commentId).sort((a,b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
}

const addComment = (text, parentId) => {
    console.log("addComment", text, parentId)
    createCommentApi(text,parentId).then(comment => {
        setBackendComments([comment,...backendComments])
        setActiveComment(null)
    })
}

useEffect(() => {
    getCommentsApi().then((data) => {
        setBackendComments(data)
    })
},[])

 return(
    <div className="comments">
        <h3 className="comments-title">Comments</h3>
        <div className="comment-form-title">Write Comment</div>
        <CommentForm submitLabel="Write" handleSubmit={addComment}/>
        <div className="comments-container">
        {rootComments.map(rootComment => (
            <Comment 
            key={rootComment.id} 
            comment={rootComment} 
            replies={getReplies(rootComment.id)}
            currentUserId = {currentUserId}
            activeComment = {activeComment}
            setActiveComment = {setActiveComment}
            />
        ))}
        </div>
    </div>
 )

} 

export default Comments;