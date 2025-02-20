import React, { useContext, useEffect, useState } from "react";
import { db } from '../../Firebase/config';
import { collection, getDocs } from "firebase/firestore";
import Heart from "../../assets/Heart";
import "./Post.css";
import { PostContext } from "../../Store/PostContext";
import { useNavigate } from "react-router-dom";

function Posts() {
  const [products, setProducts] = useState([]);
  const [visibleCount, setVisibleCount] = useState(4); 
  const { setPostDetails } = useContext(PostContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      const querySnapshot = await getDocs(collection(db, "products"));
      const productArray = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setProducts(productArray);
    };

    fetchProducts();
  }, []);

  return (
    <div className="postParentDiv">
      <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        <div className="cards">
          {products.slice(0, visibleCount).map((product) => (
            <div className="card" key={product.id} onClick={()=>{
              setPostDetails(product);
              navigate('/view')
            }} >
               {<div className="favorite">
                <Heart />
              </div>} 
              <div className="image">
                <img src={product.imageUrl} alt={product.name} />
              </div>
              <div className="content">
                <p className="rate">&#x20B9; {product.price}</p>
                <p className="name">{product.name}</p>
                <span className="category">{product.category}</span>
              </div>
              <div className="date">
                <span>{new Date(product.createdAt).toDateString()}</span>
              </div>
            </div>
          ))}
        </div>
        {visibleCount < products.length && (
        <button className="loadmore" onClick={() => setVisibleCount(prev => prev + 4)}>
          Load More
        </button>
      )}
      </div>
      
     
    </div>
  );
}

export default Posts;
