import React, { useContext, useState, useEffect } from "react";
import "./Header.css";
import OlxLogo from "../../assets/OlxLogo";
import Search from "../../assets/Search";
import Arrow from "../../assets/Arrow";
import SellButton from "../../assets/SellButton";
import SellButtonPlus from "../../assets/SellButtonPlus";
import { AuthContext, FirebaseContext } from "../../Store/FirebaseContext";
import { signOut } from "firebase/auth";
import Heart from "../../assets/Heart";
import Chat from "../../assets/Chat";
import NotificationLogo from "../../assets/NotificationLogo";
import { Link } from "react-router-dom";

function Header() {
  const { user } = useContext(AuthContext);
  const { auth } = useContext(FirebaseContext);
  const placeholders = ["Find car...", "Find bike...", "Find job..."];
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prevIndex) => (prevIndex + 1) % placeholders.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName">
          <OlxLogo />
        </div>
        <div className="placeSearch">
          <Search />
          <input type="text" />
          <Arrow />
        </div>
        <div className="productSearch">
          <div className="input">
            <input type="text" placeholder={placeholders[placeholderIndex]} />
          </div>
          <div className="searchAction">
            <Search color="#ffffff" />
          </div>
        </div>
        <div className="language">
          <span> ENGLISH </span>
          <Arrow />
        </div>
        <div>
          <Heart/>
        </div>
        <div>
          <Chat/>
        </div>
        <div>
          <NotificationLogo/>
        </div>
        <div className="loginPage">
          <span>{user ? `Welcome, ${user.displayName}` : <Link to={'/login'}>Login</Link>}</span>
          <hr />
        </div>
        {user && <span style={{marginRight:10}} onClick={() => signOut(auth)}>Logout</span>}
        <Link to={'/create'}>
        <div className="sellMenu">
          <SellButton />
          <div className="sellMenuContent">
            <SellButtonPlus />
            <span>SELL</span>
          </div>
        </div>
        </Link>
      </div>
    </div>
  );
}

export default Header;
