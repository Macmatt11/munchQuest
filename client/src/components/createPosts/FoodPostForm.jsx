import React from "react";
import { UserContext } from "../../context/UserProvider";
import './FoodPost.css'
import FileBase64 from 'react-file-base64'

//initial state value 
const initInputs ={
    restaurantName: '',
    description: '',
    imgUrl: ''
}

export default function FoodPostForm(){
//state 
const [inputs,setInputs] = React.useState(initInputs)
const { addFoodPost} = React.useContext(UserContext)

//handle change
function handleFoodPostChange(e){
    const {name,value} = e.target
    setInputs(prevInputs=>({
        ...prevInputs,
        [name] : value 
    }))
}

//handle submit
function handleSubmit(e){
    e.preventDefault()
    addFoodPost(inputs)
    setInputs(initInputs)//clears input forms 
}

const {restaurantName, description,imgUrl} = inputs

    return(
        <div className="foodFormContainer">
            <h3 className="spot">Tell Us About a Spot:</h3>
            <form onSubmit={handleSubmit} className='foodPostForm'>
                <input 
                type="text" 
                name="restaurantName" 
                value={restaurantName} 
                onChange={handleFoodPostChange} 
                placeholder="Restaurant"
                className="restName"
                />
                <input
                type="text" 
                name="imgUrl" 
                value={imgUrl}
                onChange={handleFoodPostChange} 
                placeholder="Add Image Url"
                className="userImg"
                />
                <textarea 
                type="text" 
                name="description" 
                value={description} 
                onChange={handleFoodPostChange} 
                placeholder="Tell us about this Restaurant"
                className="userTxt"
                />
                <button className="createpost-btn">Create Post</button>
            </form>
        </div>
    )
}