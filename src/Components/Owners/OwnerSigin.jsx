import React, { useEffect, useState } from "react";
import { useDispatch , useSelector  } from "react-redux";
import { asyncownersignin } from "../../store/Actions/userActions";
import { Link, useNavigate } from "react-router-dom"; 
import Styles from "./OwnerSigin.module.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'remixicon/fonts/remixicon.css'

const OwnerSigin = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate(); 

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };

    const handleSignIn = async () => {
      if (!email) {
        toast.error("Email is required.");
        return
      }else if(!password){
        toast.error("Password is required.");
        return
      }
      try {
        await dispatch(asyncownersignin({ email, password }));
        navigate("/owner/profile")
      } catch (error) {
        toast.error(error.message);
        
        
        setEmail("");
        setPassword("");
      }
    };

   

  return (
    <div className={Styles.main}>
    <div className={Styles.main1}>
      <div className={Styles.pg1}>
        <p>
        𝑾𝒆𝒍𝒄𝒐𝒎𝒆 𝒃𝒂𝒄𝒌! 𝑺𝒊𝒈𝒏 𝒊𝒏 𝒕𝒐 𝒍𝒊𝒔𝒕 𝒚𝒐𝒖𝒓 𝑷𝑮 𝒓𝒐𝒐𝒎𝒔 𝒂𝒏𝒅 𝒄𝒐𝒏𝒏𝒆𝒄𝒕 𝒘𝒊𝒕𝒉 𝒑𝒐𝒕𝒆𝒏𝒕𝒊𝒂𝒍 𝒕𝒆𝒏𝒂𝒏𝒕𝒔 𝒍𝒐𝒐𝒌𝒊𝒏𝒈 𝒇𝒐𝒓 𝒕𝒉𝒆 𝒑𝒆𝒓𝒇𝒆𝒄𝒕 𝒍𝒊𝒗𝒊𝒏𝒈 𝒔𝒑𝒂𝒄𝒆. 𝑾𝒉𝒆𝒕𝒉𝒆𝒓 𝒚𝒐𝒖'𝒓𝒆 𝒐𝒇𝒇𝒆𝒓𝒊𝒏𝒈 𝒄𝒐𝒛𝒚 𝒔𝒊𝒏𝒈𝒍𝒆 𝒓𝒐𝒐𝒎𝒔 𝒐𝒓 𝒔𝒑𝒂𝒄𝒊𝒐𝒖𝒔 𝒔𝒉𝒂𝒓𝒆𝒅 𝒂𝒄𝒄𝒐𝒎𝒎𝒐𝒅𝒂𝒕𝒊𝒐𝒏, 𝒐𝒖𝒓 𝒑𝒍𝒂𝒕𝒇𝒐𝒓𝒎 𝒉𝒆𝒍𝒑𝒔 𝒚𝒐𝒖 𝒓𝒆𝒂𝒄𝒉 𝒂 𝒘𝒊𝒅𝒆 𝒂𝒖𝒅𝒊𝒆𝒏𝒄𝒆 𝒐𝒇 𝒔𝒆𝒆𝒌𝒆𝒓𝒔 𝒆𝒂𝒈𝒆𝒓 𝒕𝒐 𝒇𝒊𝒏𝒅 𝒕𝒉𝒆𝒊𝒓 𝒏𝒆𝒙𝒕 𝒉𝒐𝒎𝒆.
        </p>
      </div>
      <div className={Styles.container}>
        <div className={Styles.form}>
          <div className={Styles.form_front}>
            <div className={Styles.form_details}>Owners SignIn</div>
            <input
              type="email"
              className={Styles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required

            />
            <div className={Styles.show}>
              <input
                type={showPassword ? 'text' : 'password'}
                className={Styles.input1}
                placeholder="Password"
                autoComplete="off"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required

              />
              <button onClick={togglePasswordVisibility}>   
                <i className="ri-eye-line"></i>
              </button>
            </div>
            <Link className= {Styles.forget} to={'/owner/forgetpasswordmail'}>Forget Password</Link>
            <button className={Styles.btn} onClick={handleSignIn}>
              SignIn
            </button>
            <p className= {Styles.register1}>Don't have an account?</p>
            <Link className= {Styles.register2} to={'/owner/register'}>Register Here</Link>

          </div>
        </div>
        <ToastContainer />
      </div>
    </div>
  </div>
  )
}

export default OwnerSigin