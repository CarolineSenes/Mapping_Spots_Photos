import { MyLocation, Cancel } from "@mui/icons-material";
import axios from "axios";
import { useState, useRef } from "react";
import "./login.css";

export default function Login({setShowLogin}) {
  const [error, setError] = useState(false);
  const nameRef = useRef();
  const passwordRef = useRef();

  const handelSubmit = async (e) => {
    e.preventDefault();
    const user = {
      username: nameRef.current.value,
      password: passwordRef.current.value,
    };

    try{
        await axios.post("/users/login", user);
        setError(false);
    }catch(err){
        setError(true);
    }
  };

  return (
    <div className="loginContainer">
      <div className="logo">
        <MyLocation />
        Spots Photos App
      </div>
      <form onSubmit={handelSubmit}> 
        <input
          ref={nameRef}
          id="username"
          type="text"
          placeholder="nom d'utilisateur"
        />
        <input
          ref={passwordRef}
          id="password"
          type="password"
          placeholder="mot de passe"
        />
        <button className="loginBtn">Se connecter</button>
        {error && (
          <span className="failure">Quelque chose n'a pas fonctionné!</span>
        )}
      </form>
      <Cancel className="loginCancel" onClick={()=>setShowLogin(false)}/>
    </div>
  );
}
