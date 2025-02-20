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
  const { user } = useContext(AuthContext); // Get the authenticated user
  const navigate = useNavigate()
  const date = new Date()
  const handleSubmit = async () => {
    if (!name || !category || !price || !image) {
      alert("Please fill all fields and select an image.");
      return;
    }

    const storage = getStorage();
    const storageRef = ref(storage, `images/${image.name}`);
    
    try {
      const snapshot = await uploadBytes(storageRef, image);
      console.log("Image uploaded!");
      const imageUrl = await getDownloadURL(snapshot.ref);
      console.log("Image URL:", imageUrl);
      const docRef = await addDoc(collection(db, "products"), {
        name,
        category,
        price,
        imageUrl,
        userId: user ? user.uid : "unknown",
        createdAt:date.toDateString()

      });


      setName('');
      setCategory('');
      setPrice('');
      setImage(null);
      navigate('/')
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Failed to upload product.");
    }
  };

  return (
    <Fragment>
      <Header />
      <div>
        <div className="centerDiv">
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
          <input type="file" onChange={(e) => setImage(e.target.files[0])} />
          <br />
          <button onClick={handleSubmit} className="uploadBtn">Upload and Submit</button>
        </div>
      </div>
    </Fragment>
  );
};

export default Create;
