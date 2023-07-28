import React from "react";
import { UserContext } from "../../context/UserProvider";
import { Link, Navigate, useNavigate } from "react-router-dom";
import './addedRest.css'
import {PiSmileySadLight} from 'react-icons/pi'


export default function AddedRest(){
const {addedRestaurant, setAddedRestaurants} = React.useContext(UserContext)
const navigate = useNavigate()

//gets data from local storage 
React.useEffect(() => {
    const storedRestaurants = localStorage.getItem('addedRestaurants');
    if (storedRestaurants) {
        setAddedRestaurants(JSON.parse(storedRestaurants));
    }
}, []);

//remove restaurant 
function removeRestaurant(restaurantsId) {
    setAddedRestaurants(prev => prev.filter(restaurant => restaurant.restaurantsId !== restaurantsId));
    const updatedRestaurants = addedRestaurant.filter(restaurant => restaurant.restaurantsId !== restaurantsId);
    localStorage.setItem('addedRestaurants', JSON.stringify(updatedRestaurants));
}


const addedRestaurantElements = addedRestaurant.map(restaurant=>(
    <div key={restaurant.restaurantsId} className="addedItemBox">
            <h3>{restaurant.name}</h3>
            <Link to={`/addedRestaurants/${restaurant.restaurantsId}`}>
            <img src={restaurant.heroImgUrl} className="addedItemImg"/>
            </Link>
            <h4 className='foodType'>Type: {restaurant.establishmentTypeAndCuisineTags.length > 1 ? 
                restaurant.establishmentTypeAndCuisineTags.join(' '): restaurant.establishmentTypeAndCuisineTags}</h4>
            <span className="price">Price: {restaurant.priceTag}</span>
            {restaurant.menuUrl !== null && <a className="menu" href={restaurant.menuUrl}>See Menu</a>}
            <button onClick={()=> removeRestaurant(restaurant.restaurantsId)}>Remove</button>
    </div>
))
    return(
        <div className="addedContainer">
            
            {addedRestaurant.length > 0 ?

            <div className= 'addedRest'>
                {addedRestaurantElements}
            </div>
            :
            <div className="pizzaImg">
            <h1 className="spots">No Spots Yet <PiSmileySadLight className="sadFace"/></h1>
            <img src='https://img.freepik.com/free-vector/flying-slice-pizza-cartoon-vector-illustration-fast-food-concept-isolated-vector-flat-cartoon-style_138676-1934.jpg?w=2000'/>
            </div>
            }
            <button className="goBackBtn" onClick={() => navigate(-1)}>Back</button>
        </div>
    )
}