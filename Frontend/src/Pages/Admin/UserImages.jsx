import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { FaArrowRight } from 'react-icons/fa';
import '../../Styles/Images.css';
import { useDispatch, useSelector } from 'react-redux';

function UserImages() {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const { userId } = useParams();
  const [images, setImages] = useState([]);
  const [userImage, setUserImage] = useState('');
  const admin = useSelector((state) => state.admin.admin);

  

  useEffect(() => {
    if (!admin) {
      navigate('/admin');
    }
  }, [admin, navigate]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/admin/getimages/${userId}`);
        setImages(response.data.images);
        setUserImage(response.data.userImage);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchImages();
  }, [userId]);

  const handleButton = () => {
    navigate('/admin/dashboard');
  };

  return (
    <div className="user-images p-8 bg-gray-100 min-h-screen">
      <div className="text-center mb-8">
        {userImage && <img src={userImage} alt="User" className="w-24 h-24 rounded-full mx-auto mb-4" />}
        <h1 className="text-3xl font-bold text-gray-800">User Images</h1>
      </div>
      <div className="images-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {images.length > 0 ? (
          images.map((image) => (
            <div key={image._id} className="image-item p-1 bg-white shadow rounded">
              <img src={image.url} alt={`Image ${image._id}`} className="w-full h-48 object-cover rounded" />
            </div>
          ))
        ) : (
          <p className="text-gray-500 col-span-full text-center">No images found.</p>
        )}
      </div>
      <div className="flex justify-center mt-8">
        <button 
          onClick={handleButton} 
          className="submit-button bg-blue-500 text-white py-2 px-4 rounded flex items-center gap-2 hover:bg-blue-600 transition"
        >
          DASHBOARD <FaArrowRight />
        </button>
      </div>
    </div>
  );
}

export default UserImages;
