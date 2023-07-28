import './App.css'
import LocationForm from './components/locationComponents/LocationForm'
import { BrowserRouter as Router,Routes,Route, Navigate} from 'react-router-dom'
import LocationFormItemDetails from './components/locationComponents/LocationFormItemDetails'
import Auth from './components/login/Auth'
import Navbar from './components/navbar/Navbar'
import { UserContext } from './context/UserProvider'
import React from 'react'
import AddedRest from './components/addedRestaurants/AddedRest'
import Public from './components/userScreens/Public'
import Profile from './components/userScreens/Profile'
import FoodPostForm from './components/createPosts/FoodPostForm'
import ProtectedRoutes from './ProtectedRoutes'
import ProfileDetails from './components/userScreens/ProfileDetails'
import AddedDetails from './components/addedRestaurants/AddedDetails'
import Navbar2 from './components/navbar/Navbar2'


function App() {
const {token, logout}=React.useContext(UserContext)

  return (
    <Router>
      <h1 className='main-title'>MunchQuest</h1>
      {token && <Navbar2 logout={logout}/>}
      <Routes>
        <Route path='/' element={token ? <Navigate to='/profile'/> : <Auth/>}/>

        <Route path='/locationForm' element= {
        <ProtectedRoutes token={token} redirectTo='/'>
          <LocationForm/>
        </ProtectedRoutes>
        }/>  
        
        <Route path='/locationForm/:locationFormId' element= {
        <ProtectedRoutes token={token} redirectTo='/'>
          <LocationFormItemDetails/>
        </ProtectedRoutes>
        }/>  
        
        <Route path='/addedRestaurants' element= {
        <ProtectedRoutes token={token} redirectTo='/'>
          <AddedRest/>
        </ProtectedRoutes>
        }/>  

        <Route path='/addedRestaurants/:addedDetailsId' element= {
        <ProtectedRoutes token={token} redirectTo='/'>
          <AddedDetails/>
        </ProtectedRoutes>
        }/>  

        <Route path='/public' element= {
        <ProtectedRoutes token={token} redirectTo='/'>
          <Public/>
        </ProtectedRoutes>
        }/>  

        <Route path='/profile' element= {
        <ProtectedRoutes token={token} redirectTo='/'>
          <Profile/>
        </ProtectedRoutes>
        }/>

        <Route path = '/profile/:foodPostId' element = { 
          <ProtectedRoutes token={token} redirectTo='/'>
            <ProfileDetails/>
          </ProtectedRoutes>
        }/>

        <Route path='/foodPostForm' element= {
        <ProtectedRoutes token={token} redirectTo='/'>
          <FoodPostForm/>
        </ProtectedRoutes>
        }/>
          
      </Routes>
      {token && <Navbar logout={logout}/>}
    </Router>
  )
}

export default App
