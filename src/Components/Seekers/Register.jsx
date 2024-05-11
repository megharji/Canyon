import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncseekersregister, asynccurrentSeekers } from "../../store/Actions/userActions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Styles from "./Signin.module.css";
import { useNavigate } from "react-router-dom"; 

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); 
  const { isAuth } = useSelector((state) => state.user);
  const [showpassword, setshowpassword] = useState(false);
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
      await dispatch(asyncseekersregister(formData));
      dispatch(asynccurrentSeekers());
      navigate("/seekers/profile");
      toast.success("Registration successful");

    } catch (error) {
      toast.error(error.message)
      setFormData({ ...formData, email: "", password: "", fullname: '' });
    }
  };
  
  


  const togglePasswordVisibility = () => {
    setshowpassword(!showpassword);
  };

  return (
    <div className={Styles.main}>
      <div className={Styles.main1}>
        <div className={Styles.pg1}>
          <p>
            𝐑𝐞𝐚𝐝𝐲 𝐭𝐨 𝐟𝐢𝐧𝐝 𝐲𝐨𝐮𝐫 𝐢𝐝𝐞𝐚𝐥 𝐥𝐢𝐯𝐢𝐧𝐠 𝐬𝐩𝐚𝐜𝐞?
            𝐑𝐞𝐠𝐢𝐬𝐭𝐞𝐫 𝐧𝐨𝐰 𝐭𝐨 𝐮𝐧𝐥𝐨𝐜𝐤 𝐞𝐱𝐜𝐥𝐮𝐬𝐢𝐯𝐞 𝐚𝐜𝐜𝐞𝐬𝐬
            𝐭𝐨 𝐨𝐮𝐫 𝐞𝐱𝐭𝐞𝐧𝐬𝐢𝐯𝐞 𝐝𝐚𝐭𝐚𝐛𝐚𝐬𝐞 𝐨𝐟 𝐏𝐆
            𝐚𝐜𝐜𝐨𝐦𝐦𝐨𝐝𝐚𝐭𝐢𝐨𝐧𝐬. 𝐖𝐡𝐞𝐭𝐡𝐞𝐫 𝐲𝐨𝐮'𝐫𝐞 𝐚 𝐬𝐭𝐮𝐝𝐞𝐧𝐭, 𝐚
            𝐰𝐨𝐫𝐤𝐢𝐧𝐠 𝐩𝐫𝐨𝐟𝐞𝐬𝐬𝐢𝐨𝐧𝐚𝐥, 𝐨𝐫 𝐚𝐧𝐲𝐨𝐧𝐞 𝐢𝐧 𝐬𝐞𝐚𝐫𝐜 𝐨𝐟
            𝐚 𝐜𝐨𝐦𝐟𝐨𝐫𝐭𝐚𝐛𝐥𝐞 𝐥𝐢𝐯𝐢𝐧𝐠 𝐞𝐧𝐯𝐢𝐫𝐨𝐧𝐦𝐞𝐧𝐭, 𝐰𝐞'𝐫𝐞 𝐡𝐞𝐫𝐞
            𝐭𝐨 𝐡𝐞𝐥𝐩 𝐲𝐨𝐮 𝐟𝐢𝐧𝐝 𝐭𝐡𝐞 𝐩𝐞𝐫𝐟𝐞𝐜𝐭 𝐦𝐚𝐭𝐜𝐡. 𝐃𝐨𝐧'𝐭 𝐦𝐢𝐬𝐬
            𝐨𝐮𝐭 – 𝐫𝐞𝐠𝐢𝐬𝐭𝐞𝐫 𝐭𝐨𝐝𝐚𝐲 𝐚𝐧𝐝 𝐭𝐚𝐤𝐞 𝐭𝐡𝐞 𝐟𝐢𝐫𝐬𝐭 𝐬𝐭𝐞𝐩
            𝐭𝐨𝐰𝐚𝐫𝐝𝐬 𝐬𝐞𝐜𝐮𝐫𝐢𝐧𝐠 𝐲𝐨𝐮𝐫 𝐝𝐫𝐞𝐚𝐦 𝐏𝐆
            𝐚𝐜𝐜𝐨𝐦𝐦𝐨𝐝𝐚𝐭𝐢𝐨𝐧!
          </p>
        </div>

        <div className={Styles.container}>
          <div className={Styles.form}>
            <div className={Styles.form_front}>
              <div className={Styles.form_details}>Seeker Register</div>
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
                  type={showpassword ? "text" : "password"}
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
            </div>
          </div>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
};

export default Register;
