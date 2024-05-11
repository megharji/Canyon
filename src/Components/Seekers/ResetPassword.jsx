import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Styles from "./ResetPassword.module.css";
import 'remixicon/fonts/remixicon.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { asyncResetPassword } from '../../store/Actions/userActions';

const ResetPassword = () => {
  const navigate = useNavigate();
    const dispatch = useDispatch();
    const [newPassword, setNewPassword] = useState('');

    const handleResetPassword = async () => {
      try {
          await dispatch(asyncResetPassword(newPassword));
          setNewPassword('');
          navigate('/seekers/profile');
          toast.success('Password reset successfully');
      } catch (error) {
          console.error('Failed to reset password:', error);
         toast.error('Failed to reset password');

      }
  };

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

    return (
        <div className={Styles.main}>
            <div className={Styles.form}>
                <div className={Styles.form_front}>
                    <div className={Styles.form_details}>Reset Password</div>
                    <div className={Styles.show}>
                      <input
                          type={showPassword ? 'text' : 'password'}    
                          id='password'
                          className={Styles.input1}
                          placeholder="New Password"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
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

export default ResetPassword;
