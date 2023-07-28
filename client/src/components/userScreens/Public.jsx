import React from'react'
import FoodPostsList from './FoodPostsList'
import { UserContext } from '../../context/UserProvider'
import './public.css'

export default function Public(){
    const {getAllFoodPosts, foodPosts, }=React.useContext(UserContext)

    React.useEffect(()=>{
        getAllFoodPosts()
    }, [])

    return(
        <div className='publicContainer'>
            <h1 className='publicFeed'>Public feed</h1>
            <FoodPostsList foodPosts = {foodPosts} isPublicPage = {true}/>
        </div>
    )
}