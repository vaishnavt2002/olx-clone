import React, { useContext, useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../Firebase/config'; // Firestore instance
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
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img src={postDetails.imageUrl} alt={postDetails.name} />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {postDetails.price} </p>
          <span>{postDetails.name}</span>
          <p>{postDetails.category}</p>
          <span>{new Date(postDetails.createdAt).toDateString()}</span>
        </div>
        <div className="contactDetails">
          <p>Seller details</p>
          {userDetails ? (
            <>
              <p>Name:{userDetails.username}</p>
              <p>Phone Number:{userDetails.phone}</p>
            </>
          ) : (
            <p>Loading seller details...</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default View;
