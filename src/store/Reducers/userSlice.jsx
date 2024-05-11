import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    isAuth: false,
    rooms: [],
    reviews: [], 
    userId: null,
    owner: false,
    ownerId: null,
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {

//  -------------------------------------------------------------Seekers------------------------------------------------------------ 

        saveSeekers: (state, action) => {
            state.user =  action.payload;
            state.isAuth = true;
            state.owner = false
        },
        removeSeekers: (state, action) => {
            state.user = null;
            state.isAuth = false;
        },
        saveRooms: (state, action) => {
            state.rooms = action.payload; 
        },
        setRoomReviews: (state, action) => {
            state.reviews = action.payload; 
        },
        addRoomReview: (state, action) => {
            state.reviews.push(action.payload);
        },
        deleteRoomReview: (state, action) => {
            state.reviews = state.reviews.filter(review => review.id !== action.payload.reviewId); 
        },
        saveLoggedInUserId: (state, action) => {
            state.userId = action.payload;
        },

// -------------------------------------------------------------Owner------------------------------------------------------------ 


        saveOwner: (state, action) => {
            state.user =  action.payload;
            state.isAuth = true;
            state.owner = true

        },
        removeOwner: (state, action) => {
            state.user = null;
            state.isAuth = false;
            state.owner = false
        },
        saveLoggedInownerId: (state, action) => {
            state.ownerId = action.payload;
        },
        saveOwnerRooms: (state, action) => {
            state.rooms = action.payload;
        }
    },
});

export const { saveSeekers, removeSeekers, saveRooms, setRoomReviews, addRoomReview, deleteRoomReview, saveLoggedInUserId, saveOwner, removeOwner, saveLoggedInownerId, saveOwnerRooms } = userSlice.actions;

export default userSlice.reducer;
