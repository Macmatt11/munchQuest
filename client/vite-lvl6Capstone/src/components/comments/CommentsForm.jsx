import React from 'react'
import { UserContext } from '../../context/UserProvider'



const defaultInput = {
    comment: ''
}
export default function CommentForm(props){
    //state
    const [inputs,setInputs] = React.useState(defaultInput)
    const {foodPostId, setShowCommentsForPosts}= props
    const {addComment} = React.useContext(UserContext)


//handle change
function handleCommentChange(e){
    const {name,value} = e.target
    setInputs(prevInputs=>({
        ...prevInputs,
        [name] : value 
    }))
}

//handle submit
function commentSubmit(e){
    e.preventDefault()
    addComment(inputs,foodPostId)//adding new todo item
    setInputs(defaultInput)//clears input forms
    setShowCommentsForPosts([])
}



const {comment} = inputs
    return(
        
            <form onSubmit={commentSubmit} className='commentForm'>
                <textarea
                    type= "text"
                    name='comment'
                    value={comment}
                    onChange={handleCommentChange}
                    placeholder="Type your comment..."
                    style={{width: '200px'}}
                />
                <button className= 'postComment' type="submit">Post</button>
            </form>
            
        
        
        
    )
}