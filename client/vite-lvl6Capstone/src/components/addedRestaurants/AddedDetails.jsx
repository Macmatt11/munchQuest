import React from 'react'
import { useParams, useNavigate } from "react-router-dom"
import { UserContext } from '../../context/UserProvider'


export default function AddedDetails(){
    const {addedRestaurant, setAddedRestaurants} = React.useContext(UserContext)
    const {addedDetailsId} = useParams()
    const navigate = useNavigate()

    console.log('addedDetailsId', addedDetailsId)
    console.log('addedRestaurant',addedRestaurant )

    const foundRestaurant = addedRestaurant.find(item=> item.restaurantsId === addedDetailsId)
    console.log('foundRestaurant', foundRestaurant)

    React.useEffect(()=>{
        if(!foundRestaurant){
            navigate('/addedRestaurants')
        }
    }, [foundRestaurant, navigate])


    if(!foundRestaurant){
        return null
    }


    return(
        <div className='addedDetailsContainer'>
                <h2 className='addedName'>{foundRestaurant.name}</h2>
                <img className= 'addedImg' src={foundRestaurant.heroImgUrl}/>
                <span className='priceDetailsAdded'>Price: {foundRestaurant.priceTag}</span>
                <h4 className='typeFoodAdded'>Type: {foundRestaurant.establishmentTypeAndCuisineTags.length > 1 ? 
                foundRestaurant.establishmentTypeAndCuisineTags.join(' '): foundRestaurant.establishmentTypeAndCuisineTags}</h4>
                {foundRestaurant.menuUrl !== null && <a className='menuDetails' href={foundRestaurant.menuUrl}>See Menu</a>}

                <button className="goBackBtnAdded" onClick={() => navigate(-1)}>Back</button>
        </div>
    )
}
