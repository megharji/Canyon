import React, { useState } from 'react'
import { useEffect } from 'react';
import Styles from "./OwnerProfile.module.css";
import { useDispatch, useSelector } from 'react-redux';
import { asyncFetchOwnerRooms, asyncDeletePgRoom } from '../../store/Actions/userActions';
import { NavLink,Link, useNavigate, useParams  } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from '../Footer.jsx';

const OwnerProfile = () => {
  const {roomId} = useParams()

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const rooms = useSelector((state) => state.user.rooms);
  useEffect(() => {
    dispatch(asyncFetchOwnerRooms());
}, []);

const [filterOptions, setFilterOptions] = useState({
    furnished: '',
    tenant: '',
    occupancy: '',
    city: '',
    minRent: '',
    maxRent: '',
    location: ''
});

useEffect(() => {
    window.scrollTo({top: 0})
}, [])

const [filteredRooms, setFilteredRooms] = useState([]);
const [searchClicked, setSearchClicked] = useState(false);

const handleFilterChange = (event) => {
  const { name, value } = event.target;
  setFilterOptions(prevOptions => ({
      ...prevOptions,
      [name]: value
  }));
};
const handleSearch = () => {
  const filtered = rooms.filter(room => {
      return (
          (!filterOptions.furnished || room.furnished === filterOptions.furnished) &&
          (!filterOptions.tenant || room.tenant === filterOptions.tenant) &&
          (!filterOptions.occupancy || room.occupancy === filterOptions.occupancy) &&
          (!filterOptions.city || room.city === filterOptions.city) &&
          (!filterOptions.minRent || room.rent >= filterOptions.minRent) &&
          (!filterOptions.maxRent || room.rent <= filterOptions.maxRent) &&
          (!filterOptions.location || room.location.toLowerCase().includes(filterOptions.location.toLowerCase()))
      );
  });
  setFilteredRooms(filtered);
  setSearchClicked(true);
};

const handleClearFilters = () => {
  setFilterOptions({
      furnished: '',
      tenant: '',
      occupancy: '',
      city: '',
      minRent: '',
      maxRent: '',
      location: ''
  });
  setFilteredRooms([]);
  setSearchClicked(false);
};


const handleDelete = async (roomId) => {
  try {
      await dispatch(asyncDeletePgRoom(roomId));
      
      navigate('/owner/profile'); 
      dispatch(asyncFetchOwnerRooms());

      toast.success('Room deleted Successfully');

  } catch (error) {
      console.error('Error deleting room:', error);
      toast.error('Failed to delete room');
  }
};

  return (
    <div className={Styles.main}>
        <h1>Profile</h1>

         <div className={Styles.filterOptions}>
          <h1>Search</h1>
            <div className={Styles.content}>
                <select name="furnished" value={filterOptions.furnished} onChange={handleFilterChange}>
                    <option value="">Select Furnished</option>
                    <option value="Fully">Fully Furnished</option>
                    <option value="Semi">Semi Furnished</option>
                    <option value="Unfurnished">Unfurnished</option>
                    <option value="Luxury">Luxury Furnished</option>
                    <option value="Basic">Basic Furnished</option>
                </select>
                <select name="tenant" value={filterOptions.tenant} onChange={handleFilterChange}>
                    <option value="">Select Tenant</option>
                    <option value="Boys">Boys Only</option>
                    <option value="Girls">Girls Only</option>
                    <option value="Both">Both</option>
                </select>
                <select name="occupancy" value={filterOptions.occupancy} onChange={handleFilterChange}>
                    <option value="">Select Occupancy</option>
                    <option value="Single">Single Occupancy</option>
                    <option value="Double">Double Occupancy</option>
                    <option value="Triple">Triple Occupancy</option>
                    <option value="Multiple">Multiple Occupancy</option>
                </select>
                <input type="text" name="city" value={filterOptions.city} onChange={handleFilterChange} placeholder="Enter City" />
                <input type="number" name="minRent" value={filterOptions.minRent} onChange={handleFilterChange} placeholder="Min. Rent" />
                <input type="number" name="maxRent" value={filterOptions.maxRent} onChange={handleFilterChange} placeholder="Max. Rent" />
                <input type="text" name="location" value={filterOptions.location} onChange={handleFilterChange} placeholder="Enter Location" />
            </div>
            <div className={Styles.button}>
              <button onClick={handleSearch}>Search Rooms</button>
              <button onClick={handleClearFilters}>Clear Filters</button>
            </div>
        </div>
        <h1 className={Styles.roomhead1}>Rooms</h1>
        <div className={Styles.roomList}>
            {rooms.length === 0 ? (
                <p>Rooms have not been created yet</p>
            ) : (
        (searchClicked && filteredRooms.length === 0) ? (
            <p>No Rooms Found for this filter</p>
        ) : (
            searchClicked ? (
                filteredRooms.map((room, index) => (
                    <div className={Styles.roomdetail} key={index}>
                        <Link to={`/owner/profile/${room._id}`} className={Styles.room} state={{ room }} key={index}>
                            {room.roompic.length > 0 && <img src={room.roompic[0].url} alt={`Room Image ${index + 1}`} />}
                            <h3>{room.pgName}</h3>
                            <p>₹{room.rent}/-</p>
                            <p>{room.city}</p>
                        </Link>
                        <div className={Styles.roomupdate}>
                            <button className={Styles.button} onClick={() => handleDelete(room._id)}>Delete Room</button>
                            <Link className={Styles.button} to={`/owner/profile/update/${room._id}`}>Update Room</Link>
                        </div>
                    </div>
                ))
            ) : (
                rooms.map((room, index) => (
                    <div className={Styles.roomdetail} key={index}>
                        <Link to={`/owner/profile/${room._id}`} className={Styles.room} state={{ room }} key={index}>
                            {room.roompic.length > 0 && <img src={room.roompic[0].url} alt={`Room Image ${index + 1}`} />}
                            <h3>{room.pgName}</h3>
                            <p>₹{room.rent}/-</p>
                            <p> {room.city}</p>
                        </Link>
                        <div className={Styles.roomupdate}>
                            <button className={Styles.button} onClick={() => handleDelete(room._id)}>Delete Room</button>
                            <Link className={Styles.button} to={`/owner/profile/update/${room._id}`}>Update Room</Link>
                        </div>
                    </div>
                ))
            )
        )
    )}
</div>




<Footer/>

          
    </div>  
    )
}

export default OwnerProfile


