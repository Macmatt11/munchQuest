import React from 'react';
import { UserContext } from '../../context/UserProvider';
import FoodPostsList from './FoodPostsList'
import { Link, json } from 'react-router-dom';
import './profile.css'


export default function Profile() {
  const { user: { username }, foodPosts, getUserFoodPosts, deletePost } = React.useContext(UserContext);

  React.useEffect(() => {
    getUserFoodPosts();
  }, []);

  const [image,setImage] = React.useState(null)

  function handleImage(e) {
    const selectedImage = e.target.files[0];

    // Check if an image is selected
    if (selectedImage) {
      const imageUrl = URL.createObjectURL(selectedImage);

      // Remove the previous image URL from local storage if it exists
      const previousImageUrl = JSON.parse(localStorage.getItem('image'));
      if (previousImageUrl) {
        URL.revokeObjectURL(previousImageUrl);
      }

      // Store the new image URL in local storage
      localStorage.setItem('image', JSON.stringify(imageUrl));

      // Update the state with the selected image URL
      setImage(imageUrl);
    }
  }

  React.useEffect(() => {
    // When the component mounts, check if there's an image stored in local storage
    const storedImageUrl = JSON.parse(localStorage.getItem('image'));
    if (storedImageUrl) {
      setImage(storedImageUrl);
    }
  }, []);

function deleteProfilePic(){
  // Get the stored image URL from local storage
  const imageUrl = JSON.parse(localStorage.getItem('image'));
  // Check if there's a stored image URL
  if (imageUrl) {
    // Revoke the object URL to release resources
    URL.revokeObjectURL(imageUrl);
    // Remove the image URL from local storage
    localStorage.removeItem('image');
    // Update the state to remove the image from display
    setImage(null);
  }
}

  return (
    <div className='profileContainer'>
      <div className='user'>
        <h1 className="welcome">Welcome Back, {username.charAt(0).toUpperCase() + username.slice(1)}</h1>
        { image !== null ? 
        <img className='profilePic' src= {image}/>
        :
        <img className='profilePic' src='https://static.vecteezy.com/system/resources/previews/005/544/718/original/profile-icon-design-free-vector.jpg'/>
        }
        <div className='fileButtons'>
        <label htmlFor="file-input" className="custom-file-upload">
        Choose File
        <input id="file-input" type="file" name="file" onChange={handleImage} />
        </label>
        <button className='deletePic'onClick={deleteProfilePic}>Delete Current Image</button>
        </div>
      </div>
      <div className='userPosts'>
        <FoodPostsList foodPosts={foodPosts} deletePost={deletePost} isPublicPage={false} isProfilePage={true}>
          {foodPosts.map(foodPost => (
            <Link key={foodPost._id} to={`/profile/${foodPost._id}`}>
              <img src={foodPost.imgUrl} className="postImg" style={{ height: '95px', width: '95px' }} />
            </Link>
          ))}
        </FoodPostsList>
      </div>
    </div>
  );
}

    
