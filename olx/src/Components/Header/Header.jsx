import React,{useContext} from 'react';

import './Header.css';
import { AuthContext } from '../../store/FirebaseContext';
import { auth } from '../../firebase/config';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
// import OlxLogo from '../../assets/OlxLogo';
// import Search from '../../assets/Search';
// import Arrow from '../../assets/Arrow';
// import SellButton from '../../assets/SellButton';
// import SellButtonPlus from '../../assets/SellButtonPlus';

function Header() {
  const {user} = useContext(AuthContext)
  const navigate = useNavigate();
  console.log(user);
  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log('User signed out successfully');
      navigate('/login'); // Redirect to login page after logout
    } catch (error) {
      console.error('Error signing out:', error.message);
    }
  };


  function sell(){
    navigate('/create')
  }
  
  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName">
          {/* <OlxLogo></OlxLogo> */}
        </div>
        <div className="placeSearch">
          {/* <Search></Search> */}
          <input type="text" />
          {/* <Arrow></Arrow> */}
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car,mobile phone and more..."
            />
          </div>
          <div className="searchAction">
            {/* <Search color="#ffffff"></Search> */}
          </div>
        </div>
        <div className="language">
          <span> ENGLISH </span>
          {/* <Arrow></Arrow> */}
        </div>
        <div className="loginPage">
          <span>{user ? user.email : 'Login'}</span>
          <hr />
        </div>
        <button onClick={handleLogout} >Logout</button>
        <div className="sellMenu">
          {/* <SellButton></SellButton> */}
          <div className="sellMenuContent">
            {/* <SellButtonPlus></SellButtonPlus> */}
           <div onClick={sell}>Sell</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
