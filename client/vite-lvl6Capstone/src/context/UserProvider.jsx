import React from 'react'
import axios from 'axios'


const UserContext = React.createContext()
const userAxios = axios.create()//creates a configurable version of axios 



userAxios.interceptors.request.use(config=>{
    const token = localStorage.getItem('token')
    config.headers.Authorization = `Bearer ${token}`
    return config
})

function UserProvider(props){
    //state w/all restaurants array
    const [restaurants, setRestaurants] = React.useState([])
//state for saving added items into state
const [addedRestaurant, setAddedRestaurants ] = React.useState([])


    //initial state for user 
    const initState = {
        user: JSON.parse(localStorage.getItem('user')) || {},
        token: localStorage.getItem('token') || '',
        foodPosts: [],
        errMsg: ''
    }
//userstate
    const [userState, setUserState] = React.useState(initState)

//signup function w/authentication
function signup(credentials){
    axios.post('/api/auth/signup', credentials)//credentias is obj w/token
    .then(res=>{
        const {user,token} = res.data
        localStorage.setItem('token', token)
        localStorage.setItem('user', JSON.stringify(user))
        getUserFoodPosts()
        setUserState(prevState=>({
            ...prevState,
            user,
            token
        }))
    })
    .catch(error=>{
        if(error.response.data.errMsg === "User validation failed: username: Path `username` is required."){
            handleAuthErr("Please enter a username")
        } else if(error.response.data.errMsg === "User validation failed: password: Path `password` is required."){
            handleAuthErr("Please enter a password")
        } else if(error.response.data.errMsg === 'User validation failed: email: Path `email` is required.'){
            handleAuthErr('Please Enter Email')
        }else if(error.response.data.errMsg === "User validation failed: username: Path `username` is required., password: Path `password` is required., email: Path `email` is required."){
            handleAuthErr("Username, Password, and Email required")
        } else{
            handleAuthErr(error.response.data.errMsg)
        }
    })
}
console.log('userState', userState)

//login
function login(credentials){
axios.post('/api/auth/login',credentials)
.then(res=>{
    const {user,token} = res.data
    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(user))
    getUserFoodPosts()
    setUserState( prevState =>({
        ...prevState,
        user,
        token
    }))
})
.catch(err=> handleAuthErr(err.response.data.errMsg))
}

//logout
function logout(){
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUserState({
        user: {},
        token: '',
        foodPosts: []
    })
}


//handling auth errors
function handleAuthErr(errMsg){
    setUserState(prev=>({
        ...prev,
        errMsg
    }))
}

//reset auth errors 
function resetAuthErr(){
    setUserState(prev=>({
        ...prev,
        errMsg: ''
    }))
}


//get all users posts only
function getAllFoodPosts(){
    userAxios.get('/api/foodPost')
    .then(res=>setUserState(prev=>({
        ...prev,
        foodPosts: res.data
    })))
    .catch(error=>console.log(error.response.data.errMsg))
}

//get the users issues only
function getUserFoodPosts(){
    userAxios.get('/api/foodPost/user')
    .then(res=>setUserState(prev=>({
        ...prev,
        foodPosts: res.data 
    })))
    .catch(error=> console.log(error.response.data.errMsg))
    }

//addFoodPost
function addFoodPost(newPost){
    userAxios.post('/api/foodPost', newPost)
    .then(res=>{
        setUserState(prevState=>({
            ...prevState,
            foodPosts: [...prevState.foodPosts, res.data]//grabbing all posts and adding the new one created
        }))
    })
    .catch(error=>console.log(error.response.data.errMsg))
}

//comments array state 
const [commentsData, setCommentsData] = React.useState([])

function getAllComments() {
userAxios.get('/api/comments')
    .then(res => {
    setCommentsData(res.data);
    })
    .catch(error => console.log(error.response.data.errMsg));
    }

    React.useEffect(() => {
    getAllComments();
    }, []);

//addComment
function addComment(newComment,foodPostId) {
    userAxios .post(`/api/comments/${foodPostId}`, newComment)//posting comment to the issue by id 
        .then(res => {
            setCommentsData(prevState =>[...prevState, res.data]);
            getAllComments()
        })
        .catch(error => console.log(error.response.data.errMsg));
    }
    console.log('commentsData', commentsData)

// delete function
function deletePost(foodPostId) {
    userAxios.delete(`/api/foodPost/${foodPostId}`)
        .then((res) => {
        setUserState((prevState) => ({
            ...prevState,
            foodPosts: prevState.foodPosts.filter(
            (foodPost) => foodPost._id !== foodPostId
            )
        }));
        setCommentsData(prevComments=> prevComments.filter(comment => comment.foodPost !== foodPostId))
        })
        .catch((error) => console.log(error.response.data.errMsg));
    }


//delete comments 
function deleteComment(commentId){
    userAxios.delete(`/api/comments/${commentId}`)
    .then(res => {
        setCommentsData(prevComments => prevComments.filter(comment => comment._id !== commentId))
        })
    .catch(error => console.log(error.response.data.errMsg))
    }

// add likes/dislikes
function upVote(foodPostId) {
    userAxios
        .put(`/api/foodPost/upVote/${foodPostId}`)
        .then((res) => {
        setUserState((prevState) => ({
            ...prevState,
            foodPosts: prevState.foodPosts.map((foodPost) =>
            foodPost._id !== foodPostId ? foodPost : res.data
            ),
        }));
        })
        .catch((err) => console.log(err.response.data.errMsg));
    }


    function downVote(foodPostId) {
    userAxios.put(`/api/foodPost/downVote/${foodPostId}`)
        .then((res) => {
        setUserState((prevState) => ({
            ...prevState,
            foodPosts: prevState.foodPosts.map((foodPost) =>
            foodPost._id !== foodPostId ? foodPost : res.data
            ),
        }));
        })
        .catch((err) => console.log(err.response.data.errMsg));
    }

//comment likses/dislikes 
function commentUpVote(commentId) {
    userAxios.put(`/api/comments/upVote/${commentId}`)
        .then((res) => {
            setCommentsData((prevState) => prevState.map(comment => comment._id !== commentId ? comment : res.data));
        })
        .catch((err) => console.log(err.response.data.errMsg));
}

function commentDownVote(commentId){
    userAxios.put(`/api/comments/downVote/${commentId}`)
        .then(res =>{
            setCommentsData((prevState)=> prevState.map(comment => comment._id !== commentId ? comment : res.data))
        })
        .catch(err=> console.log(err.response.data.errMsg))
}

 //commentsform state 
const [showCommentsForPosts, setShowCommentsForPosts] = React.useState([]);
 //toggle commentform
    function toggleComment(foodPostId) {
        setShowCommentsForPosts(prev => {
            const exists = prev.some(id => id === foodPostId);// line checks if the foodPostId already exists in the showCommentsForPosts.
            //the some() method is used to iterate over the array and returns true if any element matches the condition (id === foodPostId).
            if (exists) {//If the foodPostId already exists
            return prev.filter(id => id !== foodPostId);//we want to remove the foodPostId from the showCommentsForPosts array. The filter() method is used to create a 
            //new array with all the elements that do not match the condition (id !== foodPostId).
            } else {
            return [...prev, foodPostId];
            }//we want to add the foodPostId to the showCommentsForPosts array. The spread operator ... is used to create a new array that includes all 
            //the elements from the previous state (prev), and foodPostId is appended to the end
        });
        }
const isProfilePage = true
    return(
        <UserContext.Provider value={{
            restaurants,
            setRestaurants,
            ...userState,
            signup,
            login,
            logout,
            resetAuthErr,
            addedRestaurant,
            setAddedRestaurants,
            getAllFoodPosts,
            getUserFoodPosts,
            addFoodPost,
            downVote,
            upVote,
            deleteComment,
            deletePost,
            addComment,
            commentsData,
            commentDownVote,
            commentUpVote,
            showCommentsForPosts,
            setShowCommentsForPosts,
            toggleComment,
            isProfilePage
        }}
        >
            {props.children}
        </UserContext.Provider>
    )
}

export {UserContext, UserProvider}