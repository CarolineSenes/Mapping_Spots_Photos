import { useState, useEffect } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import { MyLocation, Star } from "@mui/icons-material";
import "./app.css";
import axios from "axios";
import { format } from "timeago.js";

const REACT_APP_MAPBOX_ACCESS_TOKEN =
  "pk.eyJ1IjoiY2Fyb2xpbmVzZW5lcyIsImEiOiJja3lnNTNlbXIxcGEwMnZwYnd1dmNwZG9vIn0.qstETxxcAmij4x9d9bN1ew";

function App() {
  const currentUser = "Caro";
  const [pins, setPins] = useState([]);
  const [currentPlaceId, setCurrentPlaceId] = useState(null);
  const [newPlace, setNewPlace] = useState(null);
  const [title, setTitle] = useState(null);
  const [desc, setDesc] = useState(null);
  const [rating, setRating] = useState(0);
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

  const handleSubmit = async (e) =>{
    e.preventDefault();
    const newPin = {
      username:currentUser,
      title,
      desc,
      rating,
      lat:newPlace.lat,
      long:newPlace.long
    }

    try{
      const res = await axios.post("/pins", newPin);
      setPins([...pins,res.data]);
      setNewPlace(null);
    }catch(err){
      console.log(err)
    }
  };

  return (
    <div className="App">
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={REACT_APP_MAPBOX_ACCESS_TOKEN}
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
                  color: p.username === currentUser ? "tomato" : "slateblue",
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
                  <label for="place">Lieu</label>
                  <h4 id="place" className="place">
                    {p.title}
                  </h4>
                  <label for="description">Description</label>
                  <p id="description" className="desc">
                    {p.desc}
                  </p>
                  <label for="rating">Note</label>
                  <div id="rating" className="stars">
                    {Array(p.rating).fill(<Star className="star" />)}
                  </div>
                  <label for="username">Information</label>
                  <span id="username" className="username">
                    Créé par <b>{p.username}</b>
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
                <label for="place">Lieu</label>
                <input
                  type="text"
                  name="place"
                  id="place"
                  placeholder="Entrer un nom du lieu"
                  onChange={(e)=>setTitle(e.target.value)}
                />
                <label for="description">Description</label>
                <textarea
                  name="description"
                  id="description"
                  placeholder="Entrer une description"
                  onChange={(e)=>setDesc(e.target.value)}
                />
                <label for="rating">Note</label>
                <select id="rating" onChange={(e)=>setRating(e.target.value)}>
                  <option selected="selected" value="1">1</option>
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
      </ReactMapGL>
    </div>
  );
}

export default App;
