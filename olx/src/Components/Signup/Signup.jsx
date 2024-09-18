import React, { useState ,useContext} from 'react';
import './Signup.css';
import OlxSignup from '../../assets/OlxSignup.png'
import { FirebaseContext } from '../../store/FirebaseContext';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../firebase/config';
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';

export default function Signup() {

  const [username, setusername] = useState('');
  const [email, setemail] = useState('');
  const [phone, setphone] = useState('');
  const [password, setpassword] = useState('');
  const { db } = useContext(FirebaseContext)
  const navigate = useNavigate(); 

  const handleSubmit=async (e)=>{
    e.preventDefault() 
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log('User signed up:', user);

      await addDoc(collection(db, 'users'), {
        uid: user.uid,
        username,
        email,
        phone,
      });

      console.log('User data added to Firestore');
      navigate('/login')

    } catch (error) {
      console.error('Error signing up:', error.message);
    }
  }

  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="180px" src={OlxSignup}></img>
        <form onSubmit={handleSubmit}>
          <label className='labels' htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            value={username}
            onChange={(e)=>setusername(e.target.value)}
            id="fname"
            name="name"
            defaultValue="John"
          />
          <br />
          <label className='labels' htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e)=>setemail(e.target.value)}
            id="fname"
            name="email"
            defaultValue="John"
          />
          <br />
          <label className='labels' htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            value={phone}
            onChange={(e)=>setphone(e.target.value)}
            id="lname"
            name="phone"
            defaultValue="Doe"
          />
          <br />
          <label className='labels' htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e)=>setpassword(e.target.value)}
            id="lname"
            name="password"
          />
          <br />
          <br />
          <button>Signup</button>
        </form>
        <a>Login</a>
      </div>
    </div>
  );
}
