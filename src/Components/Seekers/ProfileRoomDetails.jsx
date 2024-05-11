import React, { useEffect, useState } from 'react';
import {useParams } from 'react-router-dom';
import Styles from './ProfileRoomDetails.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { asyncFetchRoomReviews, asyncAddRoomReview, asyncDeleteRoomReview } from '../../store/Actions/userActions';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import  CommonRoomDetails from '../CommonRoomDetail';


const ProfileRoomDetails = () => {
    const { rooms } = useSelector((state) => state.user);
    const {roomId} = useParams()
    const selectedRoom = rooms.find(room => room._id === roomId);
    const dispatch = useDispatch();
    const userId = useSelector(state => state.user.userId);

    const reviews = useSelector(state => state.user.reviews);
    const [userReview, setUserReview] = useState(null);
    const [reviewText, setReviewText] = useState('');

    useEffect(() => {
        dispatch(asyncFetchRoomReviews(roomId));
    }, [dispatch, roomId]); 

    useEffect(() => {
        const userReview = reviews.find(review => review?.createdBy === userId);
       
        setUserReview(userReview || null);
    }, [reviews, userId]);

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

    const handleAddReview = async () => {

        try {
            await dispatch(asyncAddRoomReview(selectedRoom._id, { text: reviewText }));
            setReviewText('');
            toast.success("Review added successfully");
        } catch (error) {
            console.error('Failed to add review:', error);
            toast.error("Failed to add review");
        }
    };


    const handleDeleteReview = async (review_id) => {
        try {
            await dispatch(asyncDeleteRoomReview(selectedRoom._id, review_id));
            
           
            setUserReview(null); 
            dispatch(asyncFetchRoomReviews(roomId));


            toast.success("Review deleted successfully");
        } catch (error) {
            console.error('Failed to delete review:', error);
            toast.error("Failed to delete review");
        }
    };

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
                {selectedRoom.roompic.length > 1 && (
                    <>
                        <button onClick={prevImage} className={Styles.prevButton}>&#10094;</button>
                    </>
                )}
                <img src={selectedRoom.roompic[currentImageIndex].url} alt="" />
                {selectedRoom.roompic.length > 1 && (
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
                        <CommonRoomDetails/>

                        <div className={Styles.roomdetail12}>
                            <h1> Owner's Contact Number: <br /> {selectedRoom.contact} <br /> {selectedRoom.altercontact}</h1>
                        </div>
                    </div>
                    <div className={Styles.review}>
                        {userReview ? (
                           <p className={Styles.reviewpara}>
                           You have already submitted a review for this room, and therefore cannot add another one.</p>
                        ) : (
                            <form>
                                <textarea
                                    value={reviewText}
                                    onChange={(e) => setReviewText(e.target.value)}
                                    placeholder="Write your review..."
                                />
                                <button type="button" onClick={handleAddReview}>Submit Review</button>
                            </form>
                        )}
                        <br />
                        <div className={Styles.reviews}>
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
                        
                                        {userReview && userReview.createdBy === review.createdBy && (
                                            <div className={Styles.deleteReviewBtn}>
                                                <button onClick={() => handleDeleteReview(userReview?._id)}>Delete Review</button>
                                            </div>
                                        )}
                                        
                                        
                                    </div>
                                ))}
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default ProfileRoomDetails;

