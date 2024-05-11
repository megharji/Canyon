import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { asyncUpdatePgRoom, asyncDeleteRoomPic } from '../../store/Actions/userActions'; 
import Styles from "./OwnerSubmitPg.module.css";
import { useNavigate, useParams } from "react-router-dom"; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const OwnerRoomUpdate = () => {
  const dispatch = useDispatch();
    const navigate = useNavigate();
    const { roomId } = useParams();
    const { rooms } = useSelector((state) => state.user);
    const selectedRoom = rooms.find((room) => room._id === roomId);

    const [roomData, setRoomData] = useState(selectedRoom || {});
    const [imageFiles, setImageFiles] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
      window.scrollTo({top: 0})
    }, [])

    useEffect(() => {
      setRoomData(selectedRoom||{});
      setImageFiles(selectedRoom?.images || []);

    }, [selectedRoom]);
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setRoomData({ ...roomData, [name]: value });
    };

      const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        const totalImages = roomData.roompic.length + imageFiles.length + files.length;
        
        if (totalImages > 5) {
          toast.error('Maximum limit of 5 images reached');
          return;
        }
      
        setImageFiles(prevFiles => [...prevFiles, ...files]); 
      };
      
    
    

    const handleRemoveImage = (index) => {
      const updatedFiles = [...imageFiles];
      updatedFiles.splice(index, 1);
      setImageFiles(updatedFiles);
    };

    const handleRemoveImageBefore = async (file) => {
      try {
        const { fileId } = file; 
        const updatedFiles = roomData.roompic.filter(image => image.fileId !== fileId);
        setRoomData(prevRoomData => ({
          ...prevRoomData,
          roompic: updatedFiles
        }));    
     
        const updatedRoom = await dispatch(asyncDeleteRoomPic(roomId, fileId));
      
        if (updatedRoom) {
          navigate(`/owner/profile/update/${roomData._id }`)
          toast.success('Room picture deleted successfully');
          
          
        } else {
          toast.error('Failed to delete room picture');
        }
      } catch (error) {
        console.error('Error deleting room picture:', error);
        toast.error('Failed to delete room picture');
      }
    };
    
    


const handleSubmit = async (e) => {
  e.preventDefault();

  try {
      setIsLoading(true);
      const updatedRoomData = {
          ...roomData,
          roompic: [...roomData.roompic, ...imageFiles]
      };

      const updatedRoom = await dispatch(asyncUpdatePgRoom(updatedRoomData, roomId));

      if (updatedRoom) {
          toast.success('Room updated successfully');


          navigate(`/owner/profile`);
      } else {
          toast.error('Failed to update room');
      }
  } catch (error) {
      console.error('Error updating room:', error);
      toast.error('Failed to update room');
  }
};



  return (
    <div className={Styles.main}>
      <h1>Update The Room</h1>
      <form onSubmit={handleSubmit}>

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

          <img src={roomData.roompic} alt="" />
            <div className={Styles.detailimage}>
              <h1>Images (Maximum Limit - 5) * <i className="ri-question-fill"></i></h1>
              <input type="file" id='images' name="roompic" accept="image/*" multiple onChange={handleImageChange} />
            </div>
            <h1 className={Styles.oldimage}>Old Images</h1>
            {roomData.roompic && roomData.roompic.length > 0 && (
              <div className={Styles.imagePreview}>
                {roomData.roompic.map((image, index) => (
                  <div key={index} className={Styles.imageItem}>
                    <img src={image.url} alt={`Room Image ${index + 1}`} />
                    <button type="button" onClick={() => handleRemoveImageBefore(image)}>
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}
            <br />
            <h1 className={Styles.newimage}>New Images</h1>

            {imageFiles.length > 0 ? (
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
            ) : (
                <p className={Styles.newimages}>No new images selected</p>
            )}
          </div>
        </div>
        <div className={Styles.detailtext}>
          <h1>Add additional details (Optional) <i className="ri-question-fill"></i></h1>
          <textarea name="description" value={roomData.description}  onChange={handleInputChange}/>
        </div>
            <br />
          {isLoading && <div className={Styles.loadingSpinner}>Loading...</div>}
        <button className={Styles.submit}>Submit</button>
        <ToastContainer />

      </form>
    </div>
  )
}

export default OwnerRoomUpdate


