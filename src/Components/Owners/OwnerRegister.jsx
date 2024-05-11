import React, { useEffect, useState } from "react";
import { useDispatch , useSelector  } from "react-redux";
import { asyncownerregister } from "../../store/Actions/userActions";
import { Link, useNavigate } from "react-router-dom"; 
import Styles from "./OwnerSigin.module.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'remixicon/fonts/remixicon.css'

const OwnerRegister = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate(); 
  const { isAuth } = useSelector((state) => state.user);

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };



  const handleRegister = async () => {
    if (!formData.fullname) {
      toast.error("Fullname  is required.");
      return
    }else if(!formData.email){
      toast.error("Email  is required.");
      return
    }else if(!formData.password){
      toast.error("Password is required.");
      return
    }
    try {
      await dispatch(asyncownerregister(formData));
      dispatch(asynccurrentOwner()); 
      navigate("/owner/profile");
      toast.success("Registration successful");
    } catch (error) {
     
      toast.error(error.message)
      setFormData({ ...formData, email: "", password: "", fullname: '' });
      }
  };
  



  return (
     <div className={Styles.main}>
      <div className={Styles.main1}>
        <div className={Styles.pg1}>
          <p>
           𝑾𝒆𝒍𝒄𝒐𝒎𝒆! 𝑺𝒊𝒈𝒏 𝒖𝒑 𝒏𝒐𝒘 𝒕𝒐 𝒖𝒏𝒍𝒐𝒄𝒌 𝒆𝒙𝒄𝒍𝒖𝒔𝒊𝒗𝒆 𝒂𝒄𝒄𝒆𝒔𝒔 𝒕𝒐 𝒐𝒖𝒓 𝒑𝒍𝒂𝒕𝒇𝒐𝒓𝒎 𝒇𝒐𝒓 𝒍𝒊𝒔𝒕𝒊𝒏𝒈 𝒚𝒐𝒖𝒓 𝑷𝑮 𝒂𝒄𝒄𝒐𝒎𝒎𝒐𝒅𝒂𝒕𝒊𝒐𝒏𝒔. 𝑾𝒉𝒆𝒕𝒉𝒆𝒓 𝒚𝒐𝒖'𝒓𝒆 𝒂 𝒔𝒆𝒂𝒔𝒐𝒏𝒆𝒅 𝒍𝒂𝒏𝒅𝒍𝒐𝒓𝒅 𝒐𝒓 𝒏𝒆𝒘 𝒕𝒐 𝒕𝒉𝒆 𝒓𝒆𝒏𝒕𝒂𝒍 𝒎𝒂𝒓𝒌𝒆𝒕, 𝒘𝒆'𝒓𝒆 𝒉𝒆𝒓𝒆 𝒕𝒐 𝒔𝒖𝒑𝒑𝒐𝒓𝒕 𝒚𝒐𝒖 𝒊𝒏 𝒇𝒊𝒏𝒅𝒊𝒏𝒈 𝒕𝒉𝒆 𝒑𝒆𝒓𝒇𝒆𝒄𝒕 𝒕𝒆𝒏𝒂𝒏𝒕𝒔. 𝑹𝒆𝒈𝒊𝒔𝒕𝒆𝒓 𝒕𝒐𝒅𝒂𝒚 𝒂𝒏𝒅 𝒃𝒆𝒈𝒊𝒏 𝒔𝒉𝒐𝒘𝒄𝒂𝒔𝒊𝒏𝒈 𝒚𝒐𝒖𝒓 𝒑𝒓𝒐𝒑𝒆𝒓𝒕𝒊𝒆𝒔 𝒕𝒐 𝒔𝒆𝒆𝒌𝒆𝒓𝒔 𝒍𝒐𝒐𝒌𝒊𝒏𝒈 𝒇𝒐𝒓 𝒕𝒉𝒆𝒊𝒓 𝒊𝒅𝒆𝒂𝒍 𝒍𝒊𝒗𝒊𝒏𝒈 𝒔𝒑𝒂𝒄𝒆𝒔!
          </p>
        </div>

        <div className={Styles.container}>
          <div className={Styles.form}>
            <div className={Styles.form_front}>
              <div className={Styles.form_details}>Owner Register</div>
              <input
                type="text"
                className={Styles.input}
                name="fullname"
                placeholder="Full Name"
                value={formData.fullname}
                onChange={handleChange}
                required

              />
              <input
                type="email"
                className={Styles.input}
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                name="email"
                required

              />
              <div className={Styles.show}>
                <input
                  type={showPassword ? "text" : "password"}
                  className={Styles.input1}
                  name="password"
                  placeholder="Password"
                  autoComplete="off"
                  value={formData.password}
                  onChange={handleChange}
                  required

                />
                <button onClick={togglePasswordVisibility}>
                  <i className="ri-eye-line"></i>
                </button>
              </div>
              <button className={Styles.btn} onClick={handleRegister}>
                Register
              </button>
              <p className= {Styles.register1}>Already have an account?</p>
            <Link className= {Styles.register2} to={'/owner/signin'}>SignIn Here</Link>
            </div>
          </div>
          <ToastContainer />
        </div>
      </div>
    </div>
  )
}

export default OwnerRegister