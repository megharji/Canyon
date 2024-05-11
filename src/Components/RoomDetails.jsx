import React, { useEffect, useState } from 'react';
import {useParams, useNavigate } from 'react-router-dom';
import Styles from './RoomDetails.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { asyncFetchRoomReviews } from '../store/Actions/userActions';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'remixicon/fonts/remixicon.css'
import  CommonRoomDetails from './CommonRoomDetail.jsx';
const RoomDetails = () => {
    const navigate = useNavigate();
    
    const { rooms } = useSelector((state) => state.user);
    const {roomId} = useParams()
    const selectedRoom = rooms.find(room => room._id === roomId);
    const dispatch = useDispatch();
    const reviews = useSelector(state => state.user.reviews);

    useEffect(() => {
        dispatch(asyncFetchRoomReviews(roomId));
    }, [dispatch, roomId]);


      
    const formatDate = (createdAt) => {
        const date = new Date(createdAt);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    useEffect(() => {
        window.scrollTo({top: 0})
      }, [])

      if (!selectedRoom) {
        return   navigate('/');

    }
    
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const nextImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % selectedRoom.roompic.length);
    };

    const prevImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex - 1 + selectedRoom.roompic.length) % selectedRoom.roompic.length);
    };
    return (
        <div className={Styles.roomDetails}>
            <div className={Styles.imageContainer}>
                {selectedRoom?.roompic.length > 1 && (
                    <>
                        <button onClick={prevImage} className={Styles.prevButton} >&#10094;</button>
                    </>
                )}
                <img src={selectedRoom?.roompic[currentImageIndex].url} alt="" />
                {selectedRoom?.roompic.length > 1 && (
                    <>
                        <button onClick={nextImage} className={Styles.nextButton}>&#10095;</button>
                    </>
                )}
            </div>            
            <div className={Styles.room}>
                <div className={Styles.room112}>
                    <h1>{selectedRoom.pgName}</h1>
                    <h3>By</h3>
                    <h2>{selectedRoom.ownerName}</h2>
                </div>
                <br />
                <div className={Styles.room1}>
                    <div className={Styles.room11}>
                        <CommonRoomDetails  />


                        <div className={Styles.roomdetail12}>
                            <h1>Sign up now to access exclusive owner details and unlock valuable information.</h1>
                        </div>
                        
                    </div>
                    
                        <div className={Styles.reviews}>
                            <h3>Sigup to add a review</h3>
                            <br />
                            <h1>𝑹𝒆𝒗𝒊𝒆𝒘𝒔:</h1>
                            {reviews.length === 0 ? (
                                <p>No reviews yet. Be the first one to add a review.</p>
                            ) : (
                                <>
                                {[...reviews].reverse().map((review, index) => (
                                    <div key={index} className={Styles.reviewsdetails}>
                                        <div className={Styles.reviewsdetails1}>
                                            <h1>{review.fullname}</h1>
                                            <h2>{formatDate(review.createdAt)}</h2>
                                        </div>
                                        <h2>{review.text}</h2>
                                    </div>
                                ))}
                                </>
                            )}
                       
                    </div> 
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default RoomDetails;

