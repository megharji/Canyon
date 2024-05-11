import React, { useEffect, useState } from "react";
import { useDispatch , useSelector  } from "react-redux";
import { asyncseekerssignin } from "../../store/Actions/userActions";
import { Link, useNavigate } from "react-router-dom"; 
import Styles from "./Signin.module.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'remixicon/fonts/remixicon.css'

const Signin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isAuth } = useSelector((state) => state.user);

  const handleSignIn = async () => {
    if (!email) {
      toast.error("Email is required.");
      return
    }else if(!password){
      toast.error("Password is required.");
      return
    }
    try {
  
      await dispatch(asyncseekerssignin({ email, password }));
      navigate("/seekers/profile");
  
    } catch (error) {
      toast.error(error.message);
      
      setEmail("");
      setPassword("");
    }
  };
  
  
  useEffect(() => {
    
    isAuth  && navigate("/seekers/profile"); 
  
    
  }, [isAuth])
  

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={Styles.main}>
      <div className={Styles.main1}>
        <div className={Styles.pg1}>
          <p>
            "𝐖𝐞𝐥𝐜𝐨𝐦𝐞 𝐛𝐚𝐜𝐤! 𝐒𝐢𝐠𝐧 𝐢𝐧 𝐭𝐨 𝐞𝐱𝐩𝐥𝐨𝐫𝐞 𝐨𝐮𝐫 𝐰𝐢𝐝𝐞 𝐫𝐚𝐧𝐠𝐞 𝐨𝐟 𝐚𝐯𝐚𝐢𝐥𝐚𝐛𝐥𝐞 𝐫𝐨𝐨𝐦𝐬 𝐭𝐚𝐢𝐥𝐨𝐫𝐞𝐝 𝐭𝐨 𝐲𝐨𝐮𝐫 𝐩𝐫𝐞𝐟𝐞𝐫𝐞𝐧𝐜𝐞𝐬. 𝐖𝐡𝐞𝐭𝐡𝐞𝐫 𝐲𝐨𝐮'𝐫𝐞 𝐥𝐨𝐨𝐤𝐢𝐧𝐠 𝐟𝐨𝐫 𝐚 𝐜𝐨𝐳𝐲 𝐬𝐢𝐧𝐠𝐥𝐞 𝐫𝐨𝐨𝐦 𝐨𝐫 𝐚 𝐬𝐩𝐚𝐜𝐢𝐨𝐮𝐬 𝐬𝐡𝐚𝐫𝐞𝐝 𝐚𝐜𝐜𝐨𝐦𝐦𝐨𝐝𝐚𝐭𝐢𝐨𝐧, 𝐰𝐞'𝐯𝐞 𝐠𝐨𝐭 𝐨𝐩𝐭𝐢𝐨𝐧𝐬 𝐭𝐡𝐚𝐭 𝐬𝐮𝐢𝐭𝐞 𝐲𝐨𝐮𝐫 𝐧𝐞𝐞𝐝𝐬. 𝐃𝐨𝐧'𝐭 𝐦𝐢𝐬𝐬 𝐨𝐮𝐭 𝐨𝐧 𝐟𝐢𝐧𝐝𝐢𝐧𝐠 𝐲𝐨𝐮𝐫 𝐩𝐞𝐫𝐟𝐞𝐜𝐭 𝐥𝐢𝐯𝐢𝐧𝐠 𝐬𝐩𝐚𝐜𝐞 – 𝐬𝐢𝐠𝐧 𝐢𝐧 𝐧𝐨𝐰 𝐭𝐨 𝐠𝐞𝐭 𝐬𝐭𝐚𝐫𝐭𝐞𝐝!"
          </p>
        </div>
        <div className={Styles.container}>
          <div className={Styles.form}>
            <div className={Styles.form_front}>
              <div className={Styles.form_details}>Seeker SignIn</div>
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
              <Link className= {Styles.forget} to={'/seekers/forgetpasswordmail'}>Forget Password</Link>
              <button className={Styles.btn} onClick={handleSignIn}>
                SignIn
              </button>
            </div>
          </div>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
};

export default Signin;
