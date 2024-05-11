import React, { useState } from 'react';
import axios from '../../config/axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Styles from "./ResetForgetPassword.module.css";
import 'remixicon/fonts/remixicon.css'
import { useNavigate, useParams } from "react-router-dom";

const ResetForgetPassword = () => {
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const { id } = useParams();
    const [otp, setOtp] = useState('');

    const handleResetPassword = async () => {
        if (!otp) {
            toast.error("OTP  is required.");
            return
          }else if(!password){
            toast.error("Password is required.");
            return
          }
        try {
            const response = await axios.post(`/seekers/forget-link/${id}`, { otp: otp, password: password });
            toast.success('Password Reset Successfully', { position: 'top-center' });
            navigate('/seekers/signin')
            
        } catch (error) {
            console.error(error);
            toast.error('You have entered an incorrect or expired OTP.', { position: 'top-center' });
            setPassword('')
            setOtp('')
        }
    };
    
    
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };

    return (
        <div className={Styles.main}>
            <p>𝑶𝑻𝑷 𝒉𝒂𝒔 𝒃𝒆𝒆𝒏 𝒔𝒆𝒏𝒕 𝒕𝒐 𝒚𝒐𝒖𝒓 𝒆𝒎𝒂𝒊𝒍.</p>
            <div className={Styles.form}>
                <div className={Styles.form_front}>
                    <div className={Styles.form_details}>𝑹𝒆𝒔𝒆𝒕 𝑷𝒂𝒔𝒔𝒘𝒐𝒓𝒅</div>
                    <input
                        type="text"
                        id='otp'
                        className={Styles.input}
                        placeholder="OTP"
                        autoComplete="off"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                    />
                    <div className={Styles.show}>
                      <input
                          type={showPassword ? 'text' : 'password'}                          
                          id='password'
                          className={Styles.input1}
                          placeholder="Password"
                          autoComplete="off"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                      />
                      <button onClick={togglePasswordVisibility}>   
                        <i className="ri-eye-line"></i>
                      </button>
                    </div>
                    <button className={Styles.btn} onClick={handleResetPassword}>Reset Password</button>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default ResetForgetPassword;
