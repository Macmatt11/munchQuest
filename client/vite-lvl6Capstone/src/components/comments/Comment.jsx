import React from 'react'
import {TiDeleteOutline} from 'react-icons/ti'
import {AiOutlineLike, AiOutlineDislike} from 'react-icons/ai'
import { UserContext } from '../../context/UserProvider'
import './comment.css'


export default function Comments(props){
    const {foodPostId, showDiv, isProfilePage} = props
    const{ commentsData, deleteComment, commentDownVote, commentUpVote} = React.useContext(UserContext)



    const filteredComments = commentsData.filter(comment => comment.foodPost === foodPostId)
    const commentElements = filteredComments.map(comment=>(
    <div key = {comment._id} className={isProfilePage?'commentBox': 'publicCommentBox'}>
            <span>@{comment.user.username}:</span>
            <span className={isProfilePage?'likeIconComment':'publicLikeIcon'}>{comment.likes.length}<AiOutlineLike onClick={()=>commentUpVote(comment._id)}/></span>
            <span className={isProfilePage?'dislikeIconComment' : 'publisDislikeIconComment'}>{comment.dislikes.length}<AiOutlineDislike onClick={()=>commentDownVote(comment._id)}/></span>
            <p>{comment.comment} <TiDeleteOutline onClick={()=>deleteComment(comment._id)} className={isProfilePage? "deleteComment": 'publicDeleteComment'}/></p>
    </div>
    ))

    

    return(
        <div  className={showDiv && !isProfilePage? "expandedCommentsDiv" : "commentsDiv"}>
            {commentElements}
        </div>
        
    )
}