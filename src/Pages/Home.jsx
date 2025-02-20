import React, { useState } from 'react';

import Header from '../Components/Header/Header';
import Banner from '../Components/Banner/Banner';

import Posts from '../Components/Posts/Posts';
import Footer from '../Components/Footer/Footer';

function Home(props) {
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <div className="homeParentDiv">
      <Header setSearchTerm={setSearchTerm} /> 
      <Banner />
      <Posts searchTerm={searchTerm} /> 
      <Footer />
    </div>
  );
}

export default Home;
 
