import React, { useEffect, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import Styles from './Nav.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { asyncremoveSeeker, asynccurrentSeekers, asynccurrentOwner, asyncremoveOwner } from "../store/Actions/userActions";
import { motion } from "framer-motion";

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuth, user, owner } = useSelector((state) => state.user);
  useEffect(() => {
    if (!isAuth) {
      dispatch(asynccurrentSeekers());
      dispatch(asynccurrentOwner());
    }
  }, [isAuth, dispatch]);

  const handleSeekersSignOut = () => {
    dispatch(asyncremoveSeeker());
    navigate('/');
  };

  const handleOwnerSignOut = () => {
    dispatch(asyncremoveOwner());
    navigate('/');
  };

  return (
    <div className={Styles.main}>
      <div className={Styles.navbar}>
        <NavLink className={Styles.logo} to={isAuth ? (owner ? "/owner/profile" : "/seekers/profile") : "/"}>
          <img className={Styles.home1} src="/images/image12.png" alt="" />
          <h1 className={Styles.home}>Canyon</h1>
        </NavLink>
        <div className={Styles.container}>
          <NavLink className={Styles.container1} style={(e) => ({ borderBottom: e.isActive ? "5px dotted black" : "" })} to="/choose">Why Choose Us</NavLink>
          <NavLink className={Styles.container1} style={(e) => ({ borderBottom: e.isActive ? "5px dotted black" : "" })} to="/about">About Us</NavLink>
        </div>
        <motion.div className={Styles.container2} onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <i className="ri-user-fill"></i>
          <i className="ri-menu-2-line"></i>
        </motion.div>
      </div>
      {isMenuOpen && (
        <motion.aside
          initial={{ x: "100%" }}
          animate={{ x: isMenuOpen ? "0" : "100%" }}
          transition={{ ease: [0.76, 0, 0.24, 1], duration: 1 }}
          className={Styles.nav}
        >
          <motion.button onClick={() => setIsMenuOpen(false)} className={Styles.navbutton}>
            <i className="ri-close-line"></i>
          </motion.button>
          {isAuth ? (
            <>
              {isAuth && owner ? (
                <>
                  <h1 className={Styles.container10}>👋Hello👋</h1>
                  <h1 className={Styles.container10}>{user?.fullname}</h1>
                  <hr />
                  <NavLink className={Styles.container10} style={(e) => ({ borderBottom: e.isActive ? "5px dotted white" : "" })} to="/owner/submitPg">Add Pg Room</NavLink>
                  <NavLink className={Styles.container10} style={(e) => ({ borderBottom: e.isActive ? "5px dotted white" : "" })} to="/owner/resetpassword">Reset password</NavLink>
                  <button className={Styles.container10} onClick={handleOwnerSignOut}>Sign Out</button>
                </>
              ) : (
                <>
                  <h1 className={Styles.container10}>👋Hello👋</h1>
                  <h1 className={Styles.container10}>{user?.fullname}</h1>
                  <hr />

                  <NavLink className={Styles.container10} style={(e) => ({ borderBottom: e.isActive ? "5px dotted white" : "" })} to="/seekers/resetpassword">Reset password</NavLink>
                  <button className={Styles.container10} onClick={handleSeekersSignOut}>Sign Out</button>
                </>
              )}
            </>
          ) : (
            <>
              <NavLink className={Styles.container11} style={(e) => ({ borderBottom: e.isActive ? "5px dotted white" : "" })} to="/seekers/signin">SignIn</NavLink>
              <NavLink className={Styles.container11} style={(e) => ({ borderBottom: e.isActive ? "5px dotted white" : "" })} to="/seekers/register">Register</NavLink>
              <NavLink className={Styles.container11} style={(e) => ({ borderBottom: e.isActive ? "5px dotted white" : "" })} to="/owner/signin">Add Pg Room</NavLink>
            </>
          )}
        </motion.aside>
      )}
    </div>
  );
};

export default Nav;
