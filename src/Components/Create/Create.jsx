import React, { Fragment, useState, useContext } from 'react';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { db } from '../../Firebase/config.js';
import { AuthContext } from '../../Store/FirebaseContext.jsx';
import './Create.css';
import Header from '../Header/Header';
import { useNavigate } from 'react-router-dom';

const Create = () => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  const [error, setError] = useState('');
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const date = new Date();

  const validateForm = () => {
    const nameRegex = /^[a-zA-Z0-9 ]+$/;
    const allowedFileTypes = ['image/jpeg', 'image/png', 'image/jpg'];

    if (!name || !category || !price || !image) {
      setError("Please fill all fields and select an image.");
      return false;
    }
    if (name.length < 4 || category.length < 4) {
      setError("Name and Category must be at least 4 characters long.");
      return false;
    }
    if (!nameRegex.test(name)) {
      setError("Name must contain only letters and numbers.");
      return false;
    }
    
    if (!allowedFileTypes.includes(image.type)) {
      setError("Image must be in JPEG, PNG, or JPG format.");
      return false;
    }
    setError('');
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    
    const storage = getStorage();
    const storageRef = ref(storage, `images/${image.name}`);
    
    try {
      const snapshot = await uploadBytes(storageRef, image);
      const imageUrl = await getDownloadURL(snapshot.ref);
      await addDoc(collection(db, "products"), {
        name,
        category,
        price,
        imageUrl,
        userId: user ? user.uid : "unknown",
        createdAt: date.toDateString()
      });

      setName('');
      setCategory('');
      setPrice('');
      setImage(null);
      navigate('/');
    } catch (error) {
      console.error("Error adding product:", error);
      setError("Failed to upload product.");
    }
  };

  return (
    <Fragment>
      <Header />
      <div className="create-container">
        <div className="centerDiv">
          {error && <p className="error-message">{error}</p>}
          <label htmlFor="fname">Name</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <br />
          <label htmlFor="category">Category</label>
          <br />
          <input
            className="input"
            type="text"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
          <br />
          <label htmlFor="price">Price</label>
          <br />
          <input
            className="input"
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <br />
          <br />
          {image && <img alt="Preview" width="200px" height="200px" src={URL.createObjectURL(image)} />}
          <br />
          <input type="file" accept="image/jpeg, image/png, image/jpg" onChange={(e) => setImage(e.target.files[0])} />
          <br />
          <button onClick={handleSubmit} className="uploadBtn">Upload and Submit</button>
        </div>
      </div>
    </Fragment>
  );
};

export default Create;
