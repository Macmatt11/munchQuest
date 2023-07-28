import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserProvider';
import { AiOutlineLike, AiOutlineDislike } from 'react-icons/ai';
import { RiDeleteBinLine } from 'react-icons/ri';
import { FaRegComment } from 'react-icons/fa';
import CommentForm from '../comments/CommentsForm';
import Comment from '../comments/Comment';
import { MdOutlineExpandMore, MdClose } from 'react-icons/md';
import './profileDetails.css';

export default function ProfileDetails() {
    const { foodPosts, commentsData, upVote, downVote, showCommentsForPosts, toggleComment, setShowCommentsForPosts, addComment, deletePost } = React.useContext(UserContext);
    const { foodPostId } = useParams();
    const navigate = useNavigate();

    const foodPost = foodPosts.find(post => post._id === foodPostId);


 // Redirect if food post not found
    React.useEffect(() => {// checks if foodPost is not found. If it is falsy, it navigates the user to the '/profile' route using the navigate function from the react-router-dom library. 
        if (!foodPost) {
        navigate('/profile');
    }
    }, [foodPost, navigate]);// effect is triggered whenever the values of foodPost or navigate change. 

    const [showDiv, setShowDiv] = React.useState(false);

    function toggleClassName() {
    setShowDiv((prev) => !prev);
    }

    if (!foodPost) {//checks if foodPost is falsy. If it is falsy, the component returns null, which means the component won't render anything. 
        return null;
    }


    return (
        <div className="detailsContainer">
            <h1 className='publicFeed'>My MunchPost</h1>
                <div className='profileDetailPost'>
                    <img src={foodPost.imgUrl} className="postDetailsImg" alt="Food Post" />
                    <h1 className="postDetailsTitle">{foodPost.restaurantName}</h1>
                    <p className="detailsP">{foodPost.description}</p>
                    <div className='profileIconBox'>
                    <span className="likeDetailsIcon">
                        {foodPost.likes.length}
                            <AiOutlineLike onClick={() => upVote(foodPost._id)} />
                    </span>
                    <span className="dislikeDetailsIcon">
                        {foodPost.dislikes.length}
                        <AiOutlineDislike onClick={() => downVote(foodPost._id)} />
                    </span>
                    <RiDeleteBinLine className="deleteDetails" onClick={() => deletePost(foodPost._id)} />
                    {showCommentsForPosts.includes(foodPost._id) ? 
                        <MdClose className="detail-comment" onClick={() => toggleComment(foodPost._id)} />
                    : 
                        <FaRegComment className="detail-comment" onClick={() => toggleComment(foodPost._id)} />
                    }
                    </div>
                    {showCommentsForPosts.includes(foodPost._id) && (
                        <CommentForm
                        addComment={addComment}
                        foodPostId={foodPost._id}
                        className="commentForm"
                        setShowCommentsForPosts={setShowCommentsForPosts}
                        />
                    )}
                    <div className='profileComment-box'>
                        <h3 className="detail-commentSection">Comments</h3>
                        <MdOutlineExpandMore className="expandDetailPage" onClick={toggleClassName} />
                    </div>
                    
                    <Comment
                    foodPostId={foodPost._id}
                    commentsData={commentsData}
                    toggleClassName={toggleClassName}
                    showDiv={showDiv}
                        isProfilePage={false}
                    />
                    <button className="backBtn" onClick={() => navigate(-1)}>Back</button>
                </div>
        </div>
    );
    }




