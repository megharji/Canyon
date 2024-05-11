import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Styles from './App.module.css';
import Home from './Components/Home';
import Nav from './Components/Nav';
import RoomDetails from './Components/RoomDetails.jsx';
import ChooseUs from './Components/ChooseUs.jsx';
import About from './Components/About.jsx';

{/* -------------------------------------------------------------Seekers------------------------------------------------------------ */}

import Register from './Components/Seekers/Register.jsx';
import Signin from './Components/Seekers/Signin.jsx';
import ForgetPassword from './Components/Seekers/ForgetPassword';
import ResetForgetPassword from './Components/Seekers/ResetForgetPassword';
import Profile from './Components/Seekers/Profile';
import ProfileRoomDetails from './Components/Seekers/ProfileRoomDetails.jsx';
import ResetPassword from './Components/Seekers/ResetPassword';
import { asynccurrentSeekers } from './store/Actions/userActions';

{/* -------------------------------------------------------------Owner------------------------------------------------------------ */}

import OwnerSignin from './Components/Owners/OwnerSigin';
import OwnerRegister from './Components/Owners/OwnerRegister';
import OwnerProfile from './Components/Owners/OwnerProfile';
import OwnerForgetPassword from './Components/Owners/OwnerForgetPassword.jsx';
import OwnerResetForgetPassword from './Components/Owners/OwnerResetForgetPassword.jsx';
import OwnerResetPassword from './Components/Owners/OwnerResetPassword.jsx';
import OwnerSubmitPg from './Components/Owners/OwnerSubmitPg.jsx';
import OwnerRoomDetails from './Components/Owners/OwnerRoomDetails.jsx';
import OwnerRoomUpdate from './Components/Owners/OwnerRoomUpdate.jsx';
import { asynccurrentOwner } from './store/Actions/userActions';



const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuth, loading, user } = useSelector((state) => state.user);
  useEffect(() => {
    dispatch(asynccurrentSeekers());
    dispatch(asynccurrentOwner());

  }, [dispatch]);

 
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={Styles.container}>
      <Nav />
      <Routes>
        <Route path="/" element={isAuth ? (user && user.owner ? <Navigate to="/owner/profile" /> : <Navigate to="/seekers/profile" />) : <Home />} />
        <Route path="/about" element={<About />} />                                                                                                 
        <Route path="/choose" element={<ChooseUs />} />
        <Route path="/roomdetails/:roomId" element={ <RoomDetails/>} />
        
{/* -------------------------------------------------------------Seekers------------------------------------------------------------ */}

        <>
        
        <Route path="/seekers/register" element={!isAuth  ? <Register /> : <Navigate to="/seekers/profile" />} />

        <Route path="/seekers/signin" element={!isAuth  ? <Signin /> : <Navigate to="/seekers/profile" /> } />

        <Route path="/seekers/forgetpasswordmail" element={<ForgetPassword />} />

        <Route path="/seekers/resetforgetpassword/:id" element={<ResetForgetPassword/>} />

        <Route path="/seekers/profile" element={isAuth  ? <Profile /> : <Navigate to="/seekers/signin" />} />

        <Route path="/seekers/profile/:roomId" element={isAuth ? <ProfileRoomDetails/> : <Navigate to="/seekers/signin"/> } />

        <Route path="/seekers/resetpassword" element={isAuth ? <ResetPassword/> : <Navigate to="/seekers/signin"/>} />
        

      </>

    

{/* -------------------------------------------------------------Owner------------------------------------------------------------ */}

  
      <>
        <Route path="/owner/register" element={ !isAuth ? <OwnerRegister /> : <Navigate to="/owner/profile" />} />

        <Route path="/owner/signin" element={!isAuth ? <OwnerSignin /> : <Navigate to="/owner/profile" />} />
        
        <Route path="/owner/forgetpasswordmail" element={<OwnerForgetPassword />} />

        <Route path="/owner/resetforgetpassword/:id" element={<OwnerResetForgetPassword/>} />

        <Route path="/owner/profile" element={isAuth  ? <OwnerProfile /> : <Navigate to="/owner/signin" />} />

        <Route path="/owner/resetpassword" element={isAuth ? <OwnerResetPassword/> : <Navigate to="/owner/signin"/>} />

        <Route path="/owner/submitPg" element={isAuth  ? <OwnerSubmitPg /> : <Navigate to="/owner/signin" />} />

        <Route path="/owner/profile/:roomId" element={isAuth ? <OwnerRoomDetails/> : <Navigate to="/owner/signin"/> } />

        <Route path="/owner/profile/update/:roomId" element={isAuth ? <OwnerRoomUpdate/> : <Navigate to="/owner/signin"/> } />


      </>

      </Routes> 

      
    </div>
  );
};

export default App;


