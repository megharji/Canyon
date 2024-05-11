import React, { useEffect, useState } from 'react';
import {useParams } from 'react-router-dom';
import Styles from './RoomDetails.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { asyncFetchRoomReviews } from '../store/Actions/userActions';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'remixicon/fonts/remixicon.css'


const RoomDetails = () => {
    const { rooms } = useSelector((state) => state.user);
    const {roomId} = useParams()
    
    const selectedRoom = rooms.find(room => room._id === roomId);
    

    
    return (
       

    <div>
        <h1 className={Styles.room11h1}>Details</h1>
        <div className={Styles.roomdetail11}>

            <div className={Styles.room111detail}>
                <h1>City:</h1>
                <h2><i className="ri-building-fill"></i> {selectedRoom.city}</h2>
                <h1>Rent:</h1>
                <h2><i className="ri-money-rupee-circle-fill"></i> {selectedRoom.rent}/-</h2>
                <h1>No. of vacant Beds:</h1>
                <h2><i className="ri-hotel-bed-fill"></i> {selectedRoom.vacantBeds}</h2>
            </div>
            <div className={Styles.room111detail}>
                <h1>Address:</h1>
                <h2><i className="ri-map-pin-2-fill"></i> {selectedRoom.location}</h2>
                <h1>Tenant:</h1>
                {(() => {
                    switch (selectedRoom.tenant) {
                        case 'Both':
                            return <h2><img src="/images/image16.png" alt="" /> {selectedRoom.tenant}</h2>;
                        case 'Girls':
                            return <h2><img src="/images/image17.png" alt="" /> {selectedRoom.tenant}</h2>;
                        case 'Boys':
                            return <h2><img src="/images/image18.png" alt="" /> {selectedRoom.tenant}</h2>;
                        default:
                            return null; 
                    }
                })()}
            </div>

        </div>
        <hr />

        <div className={Styles.roomdetail11}>

            <div className={Styles.room111detail}>
                <h1>Bathroom Type:</h1>
                <h2><img src="/images/image1.png" alt=""/> {selectedRoom.bathroomType} Bathroom</h2>
                
            </div>
            <div className={Styles.room111detail}>
                <h1>Parking:</h1>
                {(() => {
                    switch (selectedRoom.parking) {
                        case 'Both':
                            return <h2><img src="/images/image10.png" alt="" /> {selectedRoom.parking}</h2>;
                        case 'None':
                            return <h2><img src="/images/image14.png" alt="" /> {selectedRoom.parking}</h2>;
                        case 'Four Wheeler':
                            return <h2><img src="/images/image9.png" alt="" /> {selectedRoom.parking}</h2>;
                        case 'Two Wheeler':
                            return <h2><img src="/images/image8.png" alt="" /> {selectedRoom.parking}</h2>;
                        default:
                            return null; 
                    }
                })()}
                
            </div>
            
        </div>
        <hr />
        <div className={Styles.roomdetail11}>
            <div className={Styles.room111detail}>
                <h1>Balcony:</h1>
                <h2><img src="/images/image2.png" alt=""/> {selectedRoom.balcony} Balcony</h2>
            </div>
            <div className={Styles.room111detail}>
                <h1>Kitchen:</h1>
                <h2><img src="/images/image7.png" alt="" /> {selectedRoom.kitchen}</h2>                             
            </div>
        </div>
        <hr />
        <div className={Styles.roomdetail11}>
            <div className={Styles.room111detail}>
                <h1>Occupancy:</h1>
                <h2><i className="ri-team-fill"></i> {selectedRoom.occupancy} Occupancy</h2>
            </div>
            <div className={Styles.room111detail}>
                <h1>Furnished Type:</h1>
                <h2> <img src="/images/image15.png" alt="" /> {selectedRoom.furnished} Furnished</h2>
                
            </div>
        </div>
        <hr />
        <div className={Styles.roomdetail11}>

            <div className={Styles.room111detail}>
                <h1>Security Deposit:</h1>
                <h2><img src="/images/image3.png" alt="" /> {selectedRoom.securityDeposit}</h2>
                <h1>Notice Period:</h1>
                <h2><img src="/images/image4.png" alt="" /> {selectedRoom.noticePeriod} Days</h2>
            </div>
            <div className={Styles.room111detail}>
                <h1>Meals/Food:</h1>
                <h2><img src="/images/image5.png" alt="" /> {selectedRoom.meals}</h2>
                <h1>Available From:</h1>
                <h2><img src="/images/image6.png" alt="" /> {selectedRoom.availableFrom}</h2> 
            </div>

        </div>
        <h1 className={Styles.room11h1}>Rules</h1>
        <div className={Styles.roomdetail11}>

            <div className={Styles.room111detail}>
                <h1>Entry Timing:</h1>
                <h2><i className="ri-time-fill"></i> {selectedRoom.entryTiming}</h2>
                <h1>Girls Entry:</h1>
                <h2><img src="/images/image17.png" alt="" /> {selectedRoom.girlsEntry}</h2>
            </div>
            <div className={Styles.room111detail}>
                <h1>Non Veg:</h1>
                <h2><img src="/images/image19.png" alt="" /> {selectedRoom.nonVeg}</h2>
                <h1>Boys Entry:</h1>
                <h2><img src="/images/image18.png" alt="" /> {selectedRoom.boysEntry}</h2>                         
            </div>

        </div>
        <h1 className={Styles.room11h1}>Description</h1>
        <div className={Styles.roomdetail11}>

            <div className={Styles.room111des}>
                <h3>
                    <img src="/images/image20.png" alt="" />
                    {selectedRoom.description ? selectedRoom.description : "No description for this room"}
                </h3>
            </div>
        </div>


                       
    </div>
    );
};

export default RoomDetails;

