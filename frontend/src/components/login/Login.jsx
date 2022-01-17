import { MyLocation, Cancel } from "@mui/icons-material";
import axios from "axios";
import { useState, useRef } from "react";
import "./login.css";

export default function Login({setShowLogin, myStorage, setCurrentUsername}) {
  const [error, setError] = useState(false);
  const usernameRef = useRef();
  const passwordRef = useRef();

  const handelSubmit = async (e) => {
    e.preventDefault();
    const user = {
      username: usernameRef.current.value,
      password: passwordRef.current.value,
    };

    try{
        const res = await axios.post("/users/login", user);
        myStorage.setItem("user", res.data.username)
        setCurrentUsername(res.data.username)
        setShowLogin(false);
    }catch(err){
        setError(true);
    }
  };

  return (
    <div className="loginContainer">
      <div className="logo">
        <MyLocation />
        <span>Spots Photos App</span>
      </div>
      <form onSubmit={handelSubmit}> 
        <input
          ref={usernameRef}
          type="text"
          placeholder="nom d'utilisateur"
          autoFocus
        />
        <input
          ref={passwordRef}
          type="password"
          placeholder="mot de passe"
          min="6"
        />
        <button className="loginBtn" type="submit">Se connecter</button>
        {error && (
          <span className="failure">Quelque chose n'a pas fonctionné!</span>
        )}
      </form>
      <Cancel className="loginCancel" onClick={()=>setShowLogin(false)}/>
    </div>
  );
}
