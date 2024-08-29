import React,{useState,useEffect} from 'react'
import './MainPage.css'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import {useNavigate } from 'react-router-dom'
import useLogUser from '../../../hooks/useLogUser'
import CenterFocusWeakIcon from '@mui/icons-material/CenterFocusWeak'
import MyLocationIcon from '@mui/icons-material/MyLocation'
import AddLinkIcon from '@mui/icons-material/AddLink'
import Post from '../../Feed/Posts/Post'
import axios from "axios"
import LockResetIcon from '@mui/icons-material/LockReset'
import EditProfile from '../EditProfile/EditProfile'

const MainPage = ( {user} ) => {
    const navigate=useNavigate()
    const [loggedInUser]=useLogUser();
    const username=user?.email?.split('@')[0];
    const[isloading,setIsloading]=useState("");
    
  
    const handleUploadCoverImage=(e)=>{
            setIsloading(true)
            const image=e.target.files[0];
            
            const formData=new FormData();
            formData.set('image',image)
    
            axios.post("https://api.imgbb.com/1/upload?key=12eb99820e298e5b1f3fc517cc798978",formData)
            .then(res=>{
                const url=res.data.data.display_url;
                const userCoverImage={
                  email:user?.email,
                  coverImage:url
                }
                setIsloading(false);
                if(url){
                    axios.patch(`http://localhost:5000/userUpdates/${user?.email}`,userCoverImage)
                }
            })
    }
    const handleProfileImage=(e)=>{
        setIsloading(true)
            const image=e.target.files[0];
            
            const formData=new FormData();
            formData.set('image',image)
    
            axios.post("https://api.imgbb.com/1/upload?key=12eb99820e298e5b1f3fc517cc798978",formData)
            .then(res=>{
                const url=res.data.data.display_url
                const userProfileImage={
                  email:user?.email,
                  profileImage:url
                }
                setIsloading(false);
                if(url){
                    axios.patch(`http://localhost:5000/userUpdates/${user?.email}`,userProfileImage)
                }
            })
    }

    const [posts,setPosts]=useState([]);

    useEffect(()=>{
       fetch(`http://localhost:5000/userPost?email=${user?.email}`)
       .then(res=>res.json())
       .then(data=>{setPosts(data)})
    },[posts,user?.email])

    return (
        <div>
          <ArrowBackIcon className='arrow-icon' onClick={() => navigate('/')} />
          <h4 className='heading-4'>{username}</h4>
          <div className='mainprofile' >
            {/* <h1 className='heading-1' style={{ color: "white" }}>Building of profile page Tweets </h1> */}
            <div className='profile-bio'>
              {
                <div >
                  <div className='coverImageContainer'>
                    <img src={loggedInUser[0]?.coverImage ? loggedInUser[0]?.coverImage : 'https://www.proactivechannel.com/Files/BrandImages/Default.jpg'} alt="" className='coverImage' />
                    <div className='hoverCoverImage'>
                      <div className="imageIcon_tweetButton">
                        <label htmlFor='image' className="imageIcon">
                              {
                                isloading?
                                <LockResetIcon className='photoIcon photoIconDisabled'/>
                                :
                                <CenterFocusWeakIcon className='photoIcon' />
                                }
                        </label>
                        <input
                          type="file"
                          id='image'
                          className="imageInput"
                          onChange={handleUploadCoverImage}
                        />
                      </div>
                    </div>
                  </div>
                  <div className='avatar-img'>
                    <div className='avatarContainer'>
                      <img src={loggedInUser[0]?.profileImage ? loggedInUser[0]?.profileImage : "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"} className="avatar" alt='' />
                      <div className='hoverAvatarImage'>
                        <div className="imageIcon_tweetButton">
                          <label htmlFor='profileImage' className="imageIcon">
                          {
                                isloading?
                                <LockResetIcon className='photoIcon photoIconDisabled'/>
                                :
                                <CenterFocusWeakIcon className='photoIcon' />
                           }
                          </label>
                          <input
                            type="file"
                            id='profileImage'
                            className="imageInput"
                            onChange={handleProfileImage}
                          />
                        </div>
                      </div>
                    </div>
                    <div className='userInfo'>
                      <div>
                        <h3 className='heading-3'>
                          {loggedInUser[0]?.name ? loggedInUser[0].name : user && user.displayName}
                        </h3>
                        <p className='usernameSection'>@{username}</p>
                      </div>
                      <EditProfile user={user} LoggedInUser={loggedInUser}/>
                    </div>
                    <div className='infoContainer'>
                      {loggedInUser[0]?.bio ? <p>{loggedInUser[0].bio}</p> : ''}
                      <div className='locationAndLink'>
                        {loggedInUser[0]?.location ? <p className='subInfo'><MyLocationIcon /> {loggedInUser[0].location}</p> : ''}
                        {loggedInUser[0]?.website ? <p className='subInfo link'><AddLinkIcon /> {loggedInUser[0].website}</p> : ''}
                      </div>
                    </div>
                    <h4 className='tweetsText'>Tweets</h4>
                  
                    <hr />
                  </div>
                  {
                    posts.map((p, index) => <Post key={index} p={p} />)
                  }
                </div>
              }
            </div>
          </div>
        </div>
      );
}

export default MainPage