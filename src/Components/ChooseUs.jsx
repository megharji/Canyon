import React from 'react'
import Styles from './ChooseUs.module.css';
import 'remixicon/fonts/remixicon.css'

const ChooseUs = () => {
  return (
         <div className={Styles.pg2}>
            <div className={Styles.pg2content}>
                <div className={Styles.pg2content1} >
                    <i className="ri-image-fill"></i>
                    <h1>Vivid Room Pictures</h1>
                    <p>We understand the importance of visuals. That's why each listing comes with high-quality room pictures, allowing you to visualize your potential living space before making a decision. The vibrant and detailed pictures offer you a comprehensive glimpse into the room's layout, decor, and amenities, allowing you to envision your ideal living environment with clarity and confidence</p>
                </div>
                <div className={Styles.pg2content1} >
                    <i className="ri-file-list-fill"></i>
                    <h1>Room Descriptions</h1>
                    <p>Gain insight into each room's features, amenities, and layout through detailed descriptions, ensuring you have all the information necessary to make an informed choice.  Whether you're seeking a cozy single room or a spacious shared accommodation, our descriptions delve into the unique features and highlights of each space, allowing you to visualize yourself in your future home.</p>
                </div>
                <div className={Styles.pg2content1} >
                    <i className="ri-contacts-fill"></i>
                    <h1>Contact Your Owner</h1>
                    <p>Engage in direct communication with room owners effortlessly through our platform. Connect with owners to discuss specific requirements, negotiate terms, and seek clarification on any inquiries you may have regarding the room or rental agreement. This direct channel fosters transparency and facilitates open dialogue, allowing you to establish a rapport with the owner. </p>
                </div>
                <div className={Styles.pg2content1} >
                    <i className="ri-file-list-3-fill"></i>
                    <h1>Room Reviews</h1>
                    <p>Benefit from authentic room reviews shared by previous occupants, offering valuable insights into the living experience, neighborhood ambiance, and overall satisfaction levels. These firsthand accounts provide you with a deeper understanding of the room's conditions, helping you make informed decisions tailored to your preferences and lifestyle.</p>
                </div>
            </div>
        </div>
  )
}

export default ChooseUs