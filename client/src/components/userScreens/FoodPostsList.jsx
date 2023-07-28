import React from 'react'
import FoodPost from './FoodPost'

export default function FoodPostsList(props){
    const {foodPosts, deletePost, isPublicPage, isProfilePage} = props
    return(
        <>
            <FoodPost 
            foodPosts = {foodPosts}
            deletePost={deletePost} 
            isPublicPage={isPublicPage}
            isProfilePage={isProfilePage} />
        </>
    )
}