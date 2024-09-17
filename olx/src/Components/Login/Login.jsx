import React, { useState,useContext} from 'react';
import { FirebaseContext } from '../../store/FirebaseContext';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../firebase/config';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {

  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate
  const { db } = useContext(FirebaseContext)
  const handleLogin=(e)=>{
    e.preventDefault()  
    signInWithEmailAndPassword(auth, email, password).then((usercredentials)=>{
      alert("ur succsfully logged")
      navigate('/')
    }).catch((error)=>alert(error))
  }

  return (
    <div>
      <div className="loginParentDiv">
        {/* <img width="200px" height="200px" src={Logo}></img> */}
        <form onSubmit={handleLogin}>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="fname"
            value={email}
            onChange={(e)=>setemail(e.target.value)}
            name="email"
            defaultValue="John"
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="lname"
            value={password}
            onChange={(e)=>setpassword(e.target.value)}
            name="password"
            defaultValue="Doe"
          />
          <br />
          <br />
          <button>Login</button>
        </form>
        <a>Signup</a>
      </div>
    </div>
  );
}

export default Login;
