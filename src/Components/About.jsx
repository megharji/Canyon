import React from 'react'
import Styles from './About.module.css';

const About = () => {
  return (
    
          <div className={Styles.about1}>
            <div className={Styles.aboutpic}>
              <div  className={Styles.aboutpic1}></div>
              <img   src="/images/image11.png" alt="" />
              <div  className={Styles.aboutpic2}></div>
            </div>  
            <p className={Styles.aboutp} >
              Welcome to our platform dedicated to helping individuals find the perfect PG accommodations! 
              At Canyon, we understand the importance of finding comfortable and convenient living spaces, especially when it comes to PG rooms. 
              Our mission is to simplify the process of finding compatible and convenient living spaces, especially when it comes to PG rooms. 
              Our platform is designed to streamline the process of finding PG accommodations by providing a user-friendly platform where seekers 
              can explore a wide range of options tailored to their preferences. Whether you're a student, working professional, or anyone in need of PG 
              accommodation, we've got you covered. What sets us apart is our commitment to offering comprehensive listings with detailed information 
              about each property, including amenities, location, pricing, and more. Moreover, we empower our users to make informed decisions by 
              providing a wide range of options tailored to their specific needs. With our intuitive interface and extensive database of properties, 
              finding the perfect PG accommodation has never been easier.</p>
          </div>
  )
}

export default About