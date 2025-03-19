import axios from "axios";
const instance = axios.create({
    // baseURL: "https://canyon-backend.onrender.com" || "http://localhost:7070/", 
    baseURL: "http://localhost:7070/", 

    withCredentials: true,
});

export default instance;