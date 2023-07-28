import React, { useContext } from 'react'
import { useParams, useNavigate } from "react-router-dom"
import { UserContext } from '../../context/UserProvider'


export default function LocationFormItemDetails(){
    const {restaurants } = useContext(UserContext)
    const {locationFormId} = useParams()
    const navigate = useNavigate()

    console.log('locationId', locationFormId)
    console.log('restaurants',restaurants )

    const foundRestaurant = restaurants.find(item=> item.restaurantsId === locationFormId)
    console.log('foundRestaurant', foundRestaurant)

    React.useEffect(()=>{
        if(!foundRestaurant){
            navigate('/locationForm')
        }
    }, [foundRestaurant, navigate])


    if(!foundRestaurant){
        return null
    }



    return(
        <div className='restaurantDetails'>
                <h2>{foundRestaurant.name}</h2>
                <img className='detailImg' src={foundRestaurant.heroImgUrl}/>
                <span className='priceDetails'>Price: {foundRestaurant.priceTag}</span><h4 className='typeFood'>Type: {foundRestaurant.establishmentTypeAndCuisineTags.length > 1 ? 
                foundRestaurant.establishmentTypeAndCuisineTags.join(' '): foundRestaurant.establishmentTypeAndCuisineTags}</h4>
                {foundRestaurant.menuUrl !== null && <a className='menuDetails' href={foundRestaurant.menuUrl}>See Menu</a>}
                <button className="goBackBtn1" onClick={() => navigate(-1)}>Back</button>
        </div>
    )
}