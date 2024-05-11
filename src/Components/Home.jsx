import React, { useEffect, useState  } from 'react'
import Styles from './Home.module.css';
import { asyncprofile } from '../store/Actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Footer from './Footer';



const Home = () => {


  const dispatch = useDispatch();
    const navigate = useNavigate();
    const { rooms } = useSelector((state) => state.user);
  const [filterOptions, setFilterOptions] = useState({
    furnished: '',
    tenant: '',
    occupancy: '',
    city: '',
    minRent: '',
    maxRent: '',
    location: ''
});
const [filteredRooms, setFilteredRooms] = useState([]);
const [searchClicked, setSearchClicked] = useState(false);

useEffect(() => {
    dispatch(asyncprofile());
}, []);

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
  


  
  return (
    <div className={Styles.main}>
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
            <div className={Styles.roomList} >
              {rooms.length === 0 ? (
                  <p>Rooms have not been created yet</p>
              ) : (
              (searchClicked && filteredRooms.length === 0) ? (
                <p>No Rooms Found for this filter</p>
                  ) : (
                    searchClicked ? (
                        filteredRooms.map((room,index) => (
                          <Link to={`/roomdetails/${room._id}`} className={Styles.room} state={{ room }} key={index}>
                            {room.roompic.length > 0 && <img src={room.roompic[0].url} alt={`Room Image ${index + 1}`} />}
                            <h3>{room.pgName}</h3>
                            <p>₹{room.rent}/-</p>
                            <p>{room.city}</p>
                          </Link>
                        ))
                    ) : (
                        rooms.map((room,index) => (
                          <Link to={`/roomdetails/${room._id}`} className={Styles.room} state={{ room }} key={index}>
                            {room.roompic.length > 0 && <img src={room.roompic[0].url} alt={`Room Image ${index + 1}`} />}
                            <h3>{room.pgName}</h3>
                            <h4>₹{room.rent}/-</h4>
                            <p>{room.city}</p>
                          </Link>
                            
                        ))
                    )
                  )
                )}
            </div>
            <Footer/>
            
    </div>
  )
}

export default Home