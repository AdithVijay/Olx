import React, { Fragment, useContext, useState } from 'react';
import './Create.css';
import Header from '../Header/Header';
import { FirebaseContext,AuthContext} from '../../store/FirebaseContext';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"; // Import storage functions
import { addDoc, collection } from "firebase/firestore"; // Import Firestore functions
import { storage,db } from '../../firebase/config';
import { useNavigate } from 'react-router-dom';

const Create = () => {

const {auth} = useContext(FirebaseContext)
const {user} = useContext(AuthContext)
const [name, setName] = useState('');
const [category, setCategory] = useState('');
const [price, setPrice ]= useState('')
const [image,setImage] = useState('');
const [loading, setLoading] = useState(false);
const navigate = useNavigate();
const handleSubmit = async () => {
  setLoading(true);
  try {
    if (image) {
      // Create a reference for the image in Firebase Storage
      const imageRef = ref(storage, `images/${image.name}`);
      
      // Upload the image to Firebase Storage
      await uploadBytes(imageRef, image);
      
      // Get the image's download URL from Firebase Storage
      const url = await getDownloadURL(imageRef);
      console.log('Image uploaded successfully:', url);

      // Store product details (name, category, price, image URL) in Firestore
      await addDoc(collection(db, 'products'), {
        name,
        category,
        price,
        imageUrl: url,
        userId: user.uid, // Save the user ID as well
        createdAt: new Date(),
      });
      alert("product added")
      navigate('/');
      console.log('Product added successfully');
      setLoading(false);
      // Optionally reset form fields here or navigate to another page
    } else {
      console.error("Please select an image to upload");
      setLoading(false);
    }
  } catch (error) {
    console.error('Error uploading image and saving product:', error);
    setLoading(false);
  }
};

  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">

            <label htmlFor="fname">Name</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              value={name}
              onChange={(e)=>setName(e.target.value)}
              name="Name"
              defaultValue="John"
            />
            <br />
            <label htmlFor="fname">Category</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              value={category}
              onChange={(e)=>setCategory(e.target.value)}
              name="category"
              defaultValue="John"
            />
            <br />
            <label htmlFor="fname">Price</label>
            <br />
            <input className="input" 
            type="number"
            id="fname"
            value={price}
            onChange={(e)=>setPrice(e.target.value)}
            name="Price" />
            <br />

          <br />
          <img alt="Posts" width="200px" height="200px" src={image ? URL.createObjectURL(image):""}></img>

            <br />
            <input type="file" onChange={(e)=>setImage(e.target.files[0])} />
            <br />
            <button onClick={handleSubmit} className="uploadBtn">upload and Submit</button>

        </div>
      </card>
    </Fragment>
  );
};

export default Create;
