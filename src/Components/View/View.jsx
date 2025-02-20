import React, { useContext, useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../Firebase/config';
import './View.css';
import { PostContext } from '../../Store/PostContext';

function View() {
  const [userDetails, setUserDetails] = useState(null);
  const { postDetails } = useContext(PostContext);

  useEffect(() => {
    if (postDetails && postDetails.userId) {
      const fetchSellerDetails = async () => {
        const userDocRef = doc(db, "users", postDetails.userId);
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
          setUserDetails(userDocSnap.data());
        } else {
          console.log("Seller details not found");
        }
      };
      fetchSellerDetails();
    }
  }, [postDetails]);

  if (!postDetails) {
    return <p>Loading product details...</p>;
  }

  return (
    <div className="view-container">
      <div className="main-content">
        <div className="image-container">
          <img src={postDetails.imageUrl} alt={postDetails.name} />
        </div>
        
        <div className="details-section">
          <div className="price-section">
            <h1>₹ {postDetails.price}</h1>
            <div className="action-buttons">
              <button className="share-button">
                <i className="share-icon"></i>
              </button>
              <button className="favorite-button">
                <i className="heart-icon"></i>
              </button>
            </div>
          </div>
          
          <h2 className="product-title">{postDetails.name}</h2>
          <p className="location">{postDetails.category}</p>
          <p className="posted-date">{new Date(postDetails.createdAt).toLocaleString('default', { month: 'short' })} {new Date(postDetails.createdAt).getFullYear()}</p>
          
          <div className="seller-section">
            <div className="seller-info">
              
              <div className="seller-details">
                <h3>Seller Name: {userDetails ? userDetails.username : 'Loading...'}</h3>
              </div>
            </div>
            <button className="chat-button">Chat with seller</button>
            <div className="phone-section">
              <i className="phone-icon"></i>
              {userDetails ? (
                <span className="phone-number">Phone Number: +91 {userDetails.phone}</span>
              ) : (
                'Loading phone number...'
              )}
            </div>
          </div>
          
          <div className="posted-in">
            <h3>Posted in</h3>
            <p> Location not specified</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default View;