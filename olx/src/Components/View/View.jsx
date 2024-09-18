import React, { useContext, useEffect, useState } from 'react';
import { collection,query,where,getDocs } from 'firebase/firestore';
import './View.css';
import { PostContext } from '../../store/PostContext';
import { FirebaseContext } from '../../store/FirebaseContext';
function View() {
const [userDetails,setUserDetails] = useState(null)
const {postDetails} = useContext(PostContext)
const {db} = useContext(FirebaseContext)

useEffect(() => {
  const fetchData = async () => {
    if (postDetails && postDetails.userId) {  // Ensure postDetails and userId exist
      const { userId } = postDetails;
      try {
        // Correct field name based on your user collection data
        const userQuery = query(collection(db, 'users'), where('uid', '==', userId));
        console.log('User Query:', userQuery);

        const querySnapshot = await getDocs(userQuery);
        console.log('Query Snapshot:', querySnapshot);

        if (querySnapshot.empty) {
          console.log('No matching user found.');
        } else {
          querySnapshot.forEach((doc) => {
            console.log('Document ID:', doc.id);
            console.log('Document Data:', doc.data());
            setUserDetails(doc.data());
          });
        }
      } catch (err) {
        console.error('Error fetching user details:', err);
      }
    }
  };

  fetchData();
}, [postDetails, db]);




  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img
          src={postDetails?.imageUrl}
          alt=""
        />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; 250000 </p>
          <span>YAMAHA R15V3</span>
          <p>Two Wheeler</p>
          <span>Tue May 04 2021</span>
        </div>
        <div className="contactDetails">
          <p>Seller details</p>
          <p>{userDetails?.email}</p>
          <p>1234567890</p>
        </div>
      </div>
    </div>
  );
}
export default View;
