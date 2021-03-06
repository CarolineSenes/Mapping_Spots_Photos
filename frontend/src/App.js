import { useState, useEffect } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import { MyLocation, Star } from "@mui/icons-material";
import "./app.css";
import axios from "axios";
import { format } from "timeago.js";
import Register from "./components/register/Register";
import Login from "./components/login/Login";

function App() {
  const myStorage = window.localStorage;
  const [currentUsername, setCurrentUsername] = useState(myStorage.getItem("user"));
  const [pins, setPins] = useState([]);
  const [currentPlaceId, setCurrentPlaceId] = useState(null);
  const [newPlace, setNewPlace] = useState(null);
  const [title, setTitle] = useState(null);
  const [desc, setDesc] = useState(null);
  const [rating, setRating] = useState(0);
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "100vh",
    latitude: 48,
    longitude: 7,
    zoom: 8,
  });

  useEffect(() => {
    const getPins = async () => {
      try {
        const res = await axios.get("/pins");
        setPins(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getPins();
  }, []);

  const handleMarkerClick = (id) => {
    setCurrentPlaceId(id);
  };

  const handleAddClick = (e) => {
    const [long, lat] = e.lngLat;
    setNewPlace({
      lat,
      long,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPin = {
      username: currentUsername,
      title,
      desc,
      rating,
      lat: newPlace.lat,
      long: newPlace.long,
    };

    try {
      const res = await axios.post("/pins", newPin);
      setPins([...pins, res.data]);
      setNewPlace(null);
    } catch (err) {
      console.log(err);
    }
  };

  const handleLogout = ()=>{
    myStorage.removeItem("user");
    setCurrentUsername(null);
  }

  return (
    <div className="App">
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
        onViewportChange={(nextViewport) => setViewport(nextViewport)}
        mapStyle="mapbox://styles/mapbox/outdoors-v11"
        onDblClick={handleAddClick}
      >
        {" "}
        {pins.map((p) => (
          <>
            <Marker
              latitude={p.lat}
              longitude={p.long}
              offsetLeft={-20}
              offsetTop={-10}
            >
              <MyLocation
                style={{
                  color:
                    p.username === currentUsername ? "tomato" : "slateblue",
                  cursor: "pointer",
                }}
                onClick={() => handleMarkerClick(p._id)}
              />
            </Marker>
            {p._id === currentPlaceId && (
              <Popup
                latitude={p.lat}
                longitude={p.long}
                closeButton={true}
                closeOnClick={false}
                anchor="left"
                onClose={() => setCurrentPlaceId(null)}
              >
                <div className="card">
                  <label>Lieu</label>
                  <h4 className="place">{p.title}</h4>
                  <label>Description</label>
                  <p className="desc">{p.desc}</p>
                  <label>Note</label>
                  <div className="stars">
                    {Array(p.rating).fill(<Star className="star" />)}
                  </div>
                  <label>Information</label>
                  <span className="username">
                    Cr???? par <b>{p.username}</b>
                  </span>
                  <span className="date">{format(p.createdAt)}</span>
                </div>
              </Popup>
            )}
          </>
        ))}
        {newPlace && (
          <Popup
            latitude={newPlace.lat}
            longitude={newPlace.long}
            closeButton={true}
            closeOnClick={false}
            anchor="left"
            onClose={() => setNewPlace(null)}
          >
            <div>
              <form onSubmit={handleSubmit}>
                <label>Lieu</label>
                <input
                  type="text"
                  name="place"
                  placeholder="Entrer un nom du lieu"
                  autoFocus
                  onChange={(e) => setTitle(e.target.value)}
                />
                <label>Description</label>
                <textarea
                  name="description"
                  placeholder="Entrer une description"
                  onChange={(e) => setDesc(e.target.value)}
                />
                <label>Note</label>
                <select onChange={(e) => setRating(e.target.value)}>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
                <button className="submitButton" type="submit">
                  Ajouter le lieu
                </button>
              </form>
            </div>
          </Popup>
        )}
        {currentUsername ? (
          <button className="button logout" onClick={handleLogout}>D??connexion</button>
        ) : (
          <div className="buttons">
            <button className="button login" onClick={() => setShowLogin(true)}>
              Connexion
            </button>
            <button
              className="button register"
              onClick={() => setShowRegister(true)}
            >
              S'enregistrer
            </button>
          </div>
        )}
        {showRegister && <Register setShowRegister={setShowRegister} />}
        {showLogin && (
          <Login
            setShowLogin={setShowLogin}
            myStorage={myStorage}
            setCurrentUsername={setCurrentUsername}
          />
        )}
      </ReactMapGL>
    </div>
  );
}

export default App;
