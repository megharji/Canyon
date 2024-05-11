import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Styles from "./OwnerForgetPassword.module.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom"; 
import axios from "../../config/axios";

const OwnerForgetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');


  const sendResetLink = async () => {
   if(!email){
      toast.error("Email  is required.");
      return
    }
    try {
        const response = await axios.post('/owner/send-mail', { email });
        const { ownerId } = response.data; 
        toast.success("OTP has been sent to your email successfully", { position: 'top-center' });
        navigate(`/owner/resetforgetpassword/${ownerId}`); 
    } catch (error) {
      setEmail('')
       
        toast.error('Email not found!. Give a valid email address', { position: 'top-center' });
    }
};

const handleReset = () => {
    sendResetLink();
};
  return (
    <div className={Styles.main}>
            <div className={Styles.form}>
                <div className={Styles.form_front}>
                <div className={Styles.form_details}>Email</div>
                <input className={Styles.input} type="email"  placeholder="Enter your email"  value={email} onChange={(e) => setEmail(e.target.value)} />

                <button className={Styles.btn}  onClick={handleReset}>Send Reset Email</button>

            </div>
        </div> 
        <ToastContainer />
    </div>
  )
}

export default OwnerForgetPassword