import { saveSeekers, removeSeekers, saveRooms,  setRoomReviews, addRoomReview, deleteRoomReview, saveLoggedInUserId, saveOwner, removeOwner, saveLoggedInownerId, saveOwnerRooms } from "../Reducers/userSlice";
import axios from "../../config/axios";
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Cookies from "js-cookie";

{/* -------------------------------------------------------------Seekers------------------------------------------------------------ */}

export const asyncprofile = () => async (dispatch, getState) => {
    try {
        try {
            const { data } = await axios.get("/");
            dispatch(saveRooms(data.allRoom))
        } catch (error) {
        }
    } catch (error) {}
};


export const asynccurrentSeekers = () => async (dispatch) => {
    try {
        const { data } = await axios.post("/seekers");
       
        dispatch(saveSeekers(data.seekers));
        dispatch(saveLoggedInUserId(data.seekers._id));
        return data.seekers._id;
 
    } catch (error) {
    }
};



export const asyncseekersregister = (user) => async (dispatch,getState) => {
    try {
        console.log("user=",user);
        
        const response = await axios.post("/seekers/register", user, {
            withCredentials: true
        });

        console.log("response=",response);
        
        const data = response.data;
        console.log("data=",data);
        
        dispatch(saveSeekers(data.user));
        dispatch(saveLoggedInUserId(data.user._id));

    } catch (error) {
        if (error) {
            throw new Error(error.response.data.error);
        } else {
            throw new Error("An unknown error occurred.");
        }

    }
};



export const asyncseekerssignin = (user) => async (dispatch, getState) => {
    try {
      await axios.post("/seekers/signin", user);
      dispatch(asynccurrentSeekers());

    } catch (error) {
        if (error) {
            throw new Error(error.response.data.error);
        } else {
            throw new Error("An unknown error occurred.");
        }
    }
};


export const asyncremoveSeeker = () => async (dispatch, getState) => {
    try {
        await axios.get("/seekers/signout");
        dispatch(removeSeekers());
        
    } catch (error) {

    }
};

export const asyncResetPassword = (newPassword) => async (dispatch) => {
    try {
        const response = await axios.post('/seekers/reset-password', { password: newPassword });
        dispatch(saveSeekers(response.data));
        toast.success('Password reset successfully');
     
    } catch (error) {
        console.error('Failed to reset password:', error);
        toast.error('Failed to reset password');
    }
};



export const asyncFetchRoomReviews = (roomId) => async (dispatch) => {
    try {
        const response = await axios.get(`/seekers/profile/${roomId}/reviews`);

        dispatch(setRoomReviews(response.data.reviews)); 
    
    } catch (error) {
        console.error('Failed to fetch room reviews:', error);
        
    }
};



export const asyncAddRoomReview = (roomId, reviewData) => async (dispatch, getState) => {
    try {
        const authToken = Cookies.get("token");
        const response = await axios.post(`/seekers/profile/${roomId}/add-review`, reviewData, {
            headers: {
                Authorization: `Bearer ${authToken}`
            }
        });
        dispatch(addRoomReview(response.data.review, response.data.userId));
        localStorage.setItem("userId", response.data.review.userId)
        dispatch(asyncFetchRoomReviews(roomId));

     
    } catch (error) {
        console.error('Failed to add room review:', error);
      
    }
};



export const asyncDeleteRoomReview = (roomId, reviewId) => async (dispatch) => {
    try {
        const authToken = Cookies.get("token");
        const response = await axios.delete(`/seekers/profile/${roomId}/delete-review/${reviewId} `, {
            headers: {
                Authorization: `Bearer ${authToken}`,
            }
        });
        
        const deletedReviewId = response.data.reviewId; 
        dispatch(deleteRoomReview({ reviewId: deletedReviewId })); 
      
    } catch (error) {
        console.error('Failed to delete review:', error);
        return null; 
    }
};



{/* -------------------------------------------------------------Owner------------------------------------------------------------ */}


export const asynccurrentOwner = () => async (dispatch) => {
    try {
        const { data } = await axios.post("/owner/currentowner");
        dispatch(saveOwner(data.owner));
        dispatch(saveLoggedInownerId(data.owner._id));
        return data.owner._id;
    } catch (error) {
    }
};

export const asyncownerregister = (owner) => async (dispatch, getState) => {
    try {
        const response = await axios.post("/owner/register", owner, {
            withCredentials: true
        });
        const data = response.data;
        dispatch(saveOwner(data.owner));
        dispatch(saveLoggedInownerId(data.owner._id));
    } catch (error) {
        if (error) {
            throw new Error(error.response.data.error);
        } else {
            throw new Error("An unknown error occurred.");
        }
    }
};




export const asyncownersignin = (owner) => async (dispatch, getState) => {
    try {
        await axios.post("/owner/signin", owner,{
            withCredentials: true
        });
        dispatch(asynccurrentOwner());
    } catch (error) {
        if (error) {
            throw new Error(error.response.data.error);
        } else {
            throw new Error("An unknown error occurred.");
        }
    }
};

export const asyncremoveOwner = () => async (dispatch, getState) => {
    try {
        await axios.get("/owner/signout");
        dispatch(removeOwner());
        
    } catch (error) {
       
    }
};


export const asyncOwnerResetPassword = (newPassword) => async (dispatch) => {
    try {
        const response = await axios.post('/owner/reset-password', { password: newPassword });
        dispatch(saveOwner(response.data));
        toast.success('Password reset successfully');
     
    } catch (error) {
        console.error('Failed to reset password:', error);
        toast.error('Failed to reset password');
    }
};


export const asyncFetchOwnerRooms = () => async (dispatch) => {
    try {
        const { data } = await axios.post("/owner/pgroom/read");
        dispatch(saveOwnerRooms(data.pgroom));
    } catch (error) {
        console.error('Failed to fetch owner rooms:', error);
    }
};


export const asyncSubmitPgRoom = (formData) => async (dispatch) => {
    try {

        const authToken = Cookies.get("Ownertoken");

        const response = await axios.post("/owner/pgroom/create", formData, {
            headers: {
                Authorization: `Bearer ${authToken}`,
                'Content-Type': 'multipart/form-data',
            }
        });


        if (response.data.success) {
            const roomId = response.data.room._id;
            const roomImages = response.data.room.roompic;
            return roomId;
        } else {
            throw new Error('Failed to submit room');
        }
    } catch (error) {
        toast.error('Failed to submit room');
        console.error('Failed to submit room:', error);
    }
};




export const asyncDeletePgRoom = (roomId) => async (dispatch) => {
    try {
        const response = await axios.delete(`/owner/pgroom/delete/${roomId}`);
        return response.data; 
    } catch (error) {
        console.error('Failed to delete room:', error);
        throw error;
    }
};

export const asyncUpdatePgRoom = (formData, roomId) => {
    return async (dispatch) => {
      try {
  
        const formDataToSend = new FormData();
  
        // Append non-file data to formDataToSend
        for (const key in formData) {
          if (key !== 'roompic') {
            formDataToSend.append(key, formData[key]);
          }
        }
  
        // Append files to formDataToSend
        for (const file of formData.roompic) {
          formDataToSend.append('roompic', file);
        }
  
        const res = await axios.post(`/owner/pgroom/update/${roomId}`, formDataToSend, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
  
  
        if (res.data.success) {
  
          dispatch(updateRoomInStore(res.data.room));
          return res.data;
        } else {
          throw new Error('Failed to update room');
        }
      } catch (error) {
        throw new Error(error.message);
      }
    };
  };
  
  const updateRoomInStore = (roomData) => ({
    type: 'UPDATE_ROOM',
    payload: roomData
  });
  

export const asyncDeleteRoomPic = (roomId, fileId) => async (dispatch) => {
    try {
        const response = await axios.get(`/owner/pgroom/${roomId}/update/delete/${fileId}`);

        if (response.status === 200) {
            dispatch(deleteRoomPicSuccess(response.data));
            return response.data; 
        } else {
         
            throw new Error(response.data.message || 'Failed to delete room picture');
        }
    } catch (error) {
        
        dispatch(deleteRoomPicFailure(error.message));
        throw error; 
    }
};

// Action creator for successful room picture deletion
const deleteRoomPicSuccess = (updatedRoom) => ({
    type: 'DELETE_ROOM_PIC_SUCCESS',
    payload: updatedRoom
});

// Action creator for room picture deletion failure
const deleteRoomPicFailure = (error) => ({
    type: 'DELETE_ROOM_PIC_FAILURE',
    payload: error
});


  
