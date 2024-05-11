import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { asyncSubmitPgRoom } from '../../store/Actions/userActions';
import Styles from "./OwnerSubmitPg.module.css";
import { useNavigate } from "react-router-dom"; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const OwnerSubmitPg = () => {
 
  const dispatch = useDispatch();
  const navigate = useNavigate(); 

  const [roomData, setRoomData] = useState({
    description: '',
    ownerName: '',
    contact:'',
    city: '',
    furnished: '',
    location:'',
    pgName:"",
    vacantBeds:'',
    rent:'',
    occupancy:"",
    tenant:"",
    altercontact:"",
    bathroomType:"",
    balcony:"",
    securityDeposit:"",
    noticePeriod:"",
    meals:"",
    kitchen:"",
    availableFrom:"",
    girlsEntry:"",
    entryTiming:"",
    nonVeg:"",
    parking:"",
    boysEntry:""
  });

  const [isLoading, setIsLoading] = useState(false);
  const [imageFiles, setImageFiles] = useState([]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setRoomData({ ...roomData, [name]: value });
    };


    const handleImageChange = (e) => {
      const files = e.target.files;
      const newImages = Array.from(files);
      const totalImages = imageFiles.length + newImages.length;
  
      if (totalImages <= 5) {
        setImageFiles([...imageFiles, ...newImages]);
      } else {
        toast.error('You can only upload a maximum of five images');
      }
    };
  

    const handleRemoveImage = (index) => {
        const newImageFiles = [...imageFiles];
        newImageFiles.splice(index, 1);
        setImageFiles(newImageFiles);
    };

    

    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
        setIsLoading(true);
        const formData = new FormData();
        for (const key in roomData) {
          formData.append(key, roomData[key]);
        }
        imageFiles.forEach((file) => {
          formData.append('roompic', file);
        });
  
        const roomId = await dispatch(asyncSubmitPgRoom(formData));
  
        if (roomId) {
          toast.success('Room created Successfully');
          navigate(`/owner/profile`);
        } else {
          toast.error('Failed to create room');
        }
      } catch (error) {
        console.error('Error submitting room:', error);
        toast.error(error);
      }
    };

  return (
    <div className={Styles.main}>
      <h1>Add A Room</h1>
      <form  onSubmit={handleSubmit}>

        <div className={Styles.detail}>
          <div className={Styles.detailhead}>
            <h1>Owner Name * <i className="ri-question-fill"></i></h1>
            <input type="text" name='ownerName' value={roomData.ownerName} onChange={handleInputChange}  required />
          </div>
          <div className={Styles.detailhead}>
            <h1>Owners Contact Number * <i className="ri-question-fill"></i></h1>
            <input type="number" name='contact' value={roomData.contact} onChange={handleInputChange}  required />
          </div>
          <div className={Styles.detailhead}>
            <h1>Owners Alternative Contact Number * <i className="ri-question-fill"></i></h1>
            <input type="number" name='altercontact' value={roomData.altercontact} onChange={handleInputChange}  required />
          </div>
          <div className={Styles.detailhead}>
            <h1>Pg Room Name* <i className="ri-question-fill"></i></h1>
            <input type="text" name='pgName' value={roomData.pgName} onChange={handleInputChange}  required />
          </div>
          <div className={Styles.detailhead}>
            <h1>City Name * <i className="ri-question-fill"></i></h1>
            <input type="text" name='city' value={roomData.city} onChange={handleInputChange}   required />
          </div>
          <div className={Styles.detailhead}>
            <h1>Enter Full Location * <i className="ri-question-fill"></i></h1>
            <input type="text" name='location' value={roomData.location} onChange={handleInputChange} required />
          </div>
          <div className={Styles.detailhead}>
            <h1>Rent * <i className="ri-question-fill"></i></h1>
            <input type="number" name='rent' value={roomData.rent} onChange={handleInputChange}   required />
          </div>
          <div className={Styles.detailhead}>
            <h1>Accommodation For * <i className="ri-question-fill"></i></h1>
            <select name="tenant" value={roomData.tenant} onChange={handleInputChange}  required >
                <option value="">Select an Option</option>
                <option value="Boys">Boys</option>
                <option value="Girls">Girls</option>
                <option value="Both">Both</option>
            </select>
          </div>
          <div className={Styles.detailhead}>
            <h1>Occupancy * <i className="ri-question-fill"></i></h1>
            <select name="occupancy" value={roomData.occupancy} onChange={handleInputChange}  required >
                <option value="">Select an Option</option>
                <option value="Single">Single</option>
                <option value="Double">Double</option>
                <option value="Triple">Triple</option>
                <option value="Multiple">Multiple</option>
            </select>
          </div>
          <div className={Styles.detailhead}>
            <h1>No. Of Vacant Beds * <i className="ri-question-fill"></i></h1>
            <input type="number" name='vacantBeds' value={roomData.vacantBeds} onChange={handleInputChange}   required />
          </div>
          <div className={Styles.detailhead}>
            <h1>Furnishings of the Room * <i className="ri-question-fill"></i></h1>
            <select name="furnished" value={roomData.furnished} onChange={handleInputChange}  required >
                <option value="">Select an Option </option>
                <option value="Basic">Basic Furnished</option>
                <option value="Luxury">Luxury Furnished</option>
                <option value="Unfurnished">Unfurnished </option>
                <option value="Semi">Semi Furnished</option>
                <option value="Fully">Fully Furnished</option>
            </select>
          </div>
          <div className={Styles.detailhead}>
            <h1>Bathroom Type * <i className="ri-question-fill"></i></h1>
            <select name="bathroomType" value={roomData.bathroomType} onChange={handleInputChange}  required >
                <option value="">Select an Option </option>
                <option value="Shared">Shared Bathroom</option>
                <option value="Attached">Attached Bathroom</option>
            </select>
          </div>
          <div className={Styles.detailhead}>
            <h1>Balcony Type * <i className="ri-question-fill"></i></h1>
            <select name="balcony" value={roomData.balcony} onChange={handleInputChange}  required >
                <option value="">Select an Option </option>
                <option value="Shared">Shared Balcony</option>
                <option value="Attached">Attached Balcony</option>
                <option value="No">No Balcony</option>
            </select>
          </div>
          <div className={Styles.detailhead}>
            <h1> Kitchen Type * <i className="ri-question-fill"></i></h1>
            <select name="kitchen" value={roomData.kitchen} onChange={handleInputChange}  required >
                <option value="">Select an Option</option>
                <option value="Shared Kitchen">Shared Kitchen</option>
                <option value="Private Kitchen">Private Kitchen</option>
                <option value="No Kitchen Access">No Kitchen Access</option>
            </select>
          </div>
          <div className={Styles.detailhead}>
            <h1>Parking Facility * <i className="ri-question-fill"></i></h1>
            <select name="parking" value={roomData.parking} onChange={handleInputChange}  required >
                <option value="">Select an Option</option>
                <option value="Two Wheeler">Two Wheeler Parking Only</option>
                <option value="Four Wheeler">Four Wheeler Parking Only</option>
                <option value="Both">Both</option>
                <option value="None">None</option>
            </select>
          </div>
          <div className={Styles.detailhead}>
            <h1>Meal Specification * <i className="ri-question-fill"></i></h1>
            <select name="meals" value={roomData.meals} onChange={handleInputChange}  required >
                <option value="">Select an Option </option>
                <option value="Not Included in rent">Not Included in rent</option>
                <option value="Include in rent">Include in rent</option>
            </select>
          </div>
          <div className={Styles.detailhead}>
            <h1>Non-Veg * <i className="ri-question-fill"></i></h1>
            <select name="nonVeg" value={roomData.nonVeg} onChange={handleInputChange}  required >
                <option value="">Select an Option</option>
                <option value="Not allowed">Not Allowed</option>
                <option value="Allowed">Allowed</option>
            </select>
          </div>
          <div className={Styles.detailhead}>
            <h1>Security Deposit Amount * <i className="ri-question-fill"></i></h1>
            <input type="number" name='securityDeposit' value={roomData.securityDeposit} onChange={handleInputChange}   required />
          </div>
          <div className={Styles.detailhead}>
            <h1>Notice Period in Days * <i className="ri-question-fill"></i></h1>
            <input type="number" name='noticePeriod' value={roomData.noticePeriod} onChange={handleInputChange}   required />
          </div>
          <div className={Styles.detailhead}>
            <h1>Room is Available From * <i className="ri-question-fill"></i></h1>
            <input type="date" name='availableFrom' value={roomData.availableFrom} onChange={handleInputChange}   required />
          </div>
          <div className={Styles.detailhead}>
            <h1>Specify the Entry Time * <i className="ri-question-fill"></i></h1>
            <input type="time" name='entryTiming' value={roomData.entryTiming} onChange={handleInputChange}  required />
          </div>
          <div className={Styles.detailhead1}>
            <h1>Girls Entry * <i className="ri-question-fill"></i></h1>
            <select name="girlsEntry" value={roomData.girlsEntry} onChange={handleInputChange} required >
                <option value="">Select an Option</option>
                <option value="Not Allowed">Not Allowed</option>
                <option value="Allowed">Allowed</option>
            </select>
          </div>
          <div className={Styles.detailhead1}>
            <h1>Boys Entry * <i className="ri-question-fill"></i></h1>
            <select name="boysEntry" value={roomData.boysEntry} onChange={handleInputChange} required >
                <option value="">Select an Option</option>
                <option value="Not Allowed">Not Allowed</option>
                <option value="Allowed">Allowed</option>
            </select>
          </div>
          <div className={Styles.image}>
            <div className={Styles.detailimage}>
              <h1>Images (Maximum Limit - 5) * <i className="ri-question-fill"></i></h1>
              <input type="file" id='images' name="roompic" accept="image/*" multiple onChange={handleImageChange}  required />
            </div>
              
              {imageFiles.length > 0 && (
                    <div className={Styles.imagePreview}>
                        {imageFiles.map((file, index) => (
                            <div key={index} className={Styles.imageItem}>
                                <img src={URL.createObjectURL(file)} alt={`Room Image ${index + 1}`} />
                                <button type="button" onClick={() => handleRemoveImage(index)}>
                                    Remove
                                </button>
                            </div>
                        ))}
                    </div>
                )}
          </div>
        </div>
        <div className={Styles.detailtext}>
          <h1>Add additional details (Optional) <i className="ri-question-fill"></i></h1>
          <textarea name="description" value={roomData.description} onChange={handleInputChange} />
        </div>
            <br />
            {isLoading && <div className={Styles.loadingSpinner}>Loading...</div>}

        <button className={Styles.submit} >Submit</button>
        <ToastContainer />

      </form>
    </div>
  )
}

export default OwnerSubmitPg

