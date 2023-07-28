import React, { useContext } from 'react';
import axios from 'axios';
import './location.css'
import { BrowserRouter as Router,Routes,Route, Link} from 'react-router-dom'
const apiKey = import.meta.env.VITE_API_KEY
import { UserContext } from '../../context/UserProvider';

console.log(apiKey)

export default function LocationForm() {

const {restaurants, setRestaurants,addedRestaurant, setAddedRestaurants} = useContext(UserContext)

  // Location state
    const [location, setLocation] = React.useState({
    city: '',
    state: '',
    country: '',
    });

    const [locationId, setLocationId] = React.useState(null);

  // Submit input data
    function handleSubmit(e) {
    e.preventDefault();
    const options = {
        method: 'GET',
        url: 'https://tripadvisor16.p.rapidapi.com/api/v1/restaurant/searchLocation',
        params: {
        query: `${location.city} ${location.state} ${location.country}`,
        },
        headers: {
        'X-RapidAPI-Key': apiKey,
        'X-RapidAPI-Host': 'tripadvisor16.p.rapidapi.com',
        },
    };
    axios.request(options)
        .then((res) => {
        const data = res.data.data;
        if (Array.isArray(data) && data.length > 0) {//checks if the retrieved data is an array and if it has a length greater than zero using Array.isArray(data) and data.length > 0 condition.
            const locationData = data[0];// the code retrieves the first location from the data array using data[0] and assigns it to the locationData variable.
            setLocationId(locationData.locationId);
            getRestaurants(locationData.locationId); // locationId passed to getsRestaurants 
        }
        })
        .catch((err) => console.log(err));
    }

    function handleChange(e) {
    const { name, value } = e.target;
    setLocation((prevLocation) => ({
        ...prevLocation,
        [name]: value,
    }));
    }
// const [restaurants, setRestaurants] = React.useState([])
  // Get restaurants
    function getRestaurants(locationId) {
    const options = {
        method: 'GET',
        url: 'https://tripadvisor16.p.rapidapi.com/api/v1/restaurant/searchRestaurants',
        params: {
        locationId: locationId,
        } ,
        headers: {
        'X-RapidAPI-Key': apiKey,
        'X-RapidAPI-Host': 'tripadvisor16.p.rapidapi.com',
        },
    };
    axios.request(options)
        .then((res) => setRestaurants(res.data.data.data))
        .catch((err) => console.log(err));
    }
console.log(restaurants)

//state for err msg if reastauarant is added to addedRestaurants array already 
const [duplicateRestaurantId, setDuplicateRestaurantId] = React.useState(null);

//add restaurant to added restaurant list 
function addToMyRestaurants(restaurant) {
//getting existing restaurants from localstorage if they exist or [] if they dont
const existingRestaurants = JSON.parse(localStorage.getItem('addedRestaurants') || [])
const isRestaurantAdded = existingRestaurants.some(existingRestaurant => existingRestaurant.restaurantsId === restaurant.restaurantsId)
if(isRestaurantAdded){
    setDuplicateRestaurantId(restaurant.restaurantsId)
    return //returns early to prevent adding a duplicate.
}else{
    const updatedRestaurants = [...existingRestaurants, restaurant];
    localStorage.setItem('addedRestaurants', JSON.stringify(updatedRestaurants));
    setAddedRestaurants(prev => [...prev, restaurant]);
    console.log('addedRestaurants', updatedRestaurants);
}}


const restaurantElements = restaurants.map(restaurant=>(
    <div key={restaurant.restaurantsId} className='restaurant' id='restaurant'>
        <h3 className='title'>{restaurant.name}</h3>
        <Link to={`/locationForm/${restaurant.restaurantsId}`}>
            <img className='imgLocation' src={restaurant.heroImgUrl}/>
        </Link>
        <h4 className='foodType'>Type: {restaurant.establishmentTypeAndCuisineTags.length > 1 ? 
                restaurant.establishmentTypeAndCuisineTags.join(' '): restaurant.establishmentTypeAndCuisineTags}</h4>
        <span className='price'>Price: {restaurant.priceTag}</span>
        {restaurant.menuUrl !== null && <a href={restaurant.menuUrl} className='menu'>See Menu</a>}
        <button onClick={()=>addToMyRestaurants(restaurant)}>Save restaurant</button>
        {duplicateRestaurantId === restaurant.restaurantsId && <p className='savedErr'>Restaurant already saved</p>}
    </div>
))


return (
    <div className='locationContainer'>
        <h1 className='find-food'>Find Some Food!</h1>
        <form onSubmit={handleSubmit} className='locationForm'>
            <input
            name="city"
            value={location.city}
            type="text"
            placeholder="City"
            onChange={handleChange}
            />
            <input
            type="text"
            name="state"
            value={location.state}
            onChange={handleChange}
            placeholder="State"
            />
            <input
            type="text"
            name="country"
            value={location.country}
            onChange={handleChange}
            placeholder="Country"
            />
            <button>Submit</button>
        </form>
        <div className='restaurantsBox'>
            {restaurantElements}
        </div>
    </div>

    )
}
