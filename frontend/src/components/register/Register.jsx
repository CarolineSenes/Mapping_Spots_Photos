import { MyLocation, Cancel } from "@mui/icons-material";
import axios from "axios";
import { useState, useRef } from "react";
import "./register.css";

export default function Register({setShowRegister}) {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const handelSubmit = async (e) => {
    e.preventDefault();
    const newUser = {
      username: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    try{
        await axios.post("/users/register", newUser);
        setError(false);
        setSuccess(true);
    }catch(err){
        setError(true);
    }
  };

  return (
    <div className="registerContainer">
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
        <input ref={emailRef} id="email" type="email" placeholder="email" />
        <input
          ref={passwordRef}
          id="password"
          type="password"
          placeholder="mot de passe"
        />
        <button className="registerBtn">S'enregistrer</button>
        {success && (
          <span className="success">
            BRAVO! Vous pouvez vous connecter maintenant!
          </span>
        )}
        {error && (
          <span className="failure">Quelque chose n'a pas fonctionné!</span>
        )}
      </form>
      <Cancel className="registerCancel" onClick={()=>setShowRegister(false)}/>
    </div>
  );
}
