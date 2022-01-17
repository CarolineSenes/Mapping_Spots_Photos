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
  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "100vh",
    latitude: 48,
    longitude: 7,
    zoom: 8,
  });

  useEffect(() => {
    const getPins = async ()=>{
      try{
        const res = await axios.get("/pins");
        setPins(res.data);
      }catch(err){
        console.log(err)
      }
    }
    getPins()
  }, [])

  const handleMarkerClick = (id)=>{
    setCurrentPlaceId(id)
  };

  return (
    <div className="App">
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={REACT_APP_MAPBOX_ACCESS_TOKEN}
        onViewportChange={(nextViewport) => setViewport(nextViewport)}
        mapStyle="mapbox://styles/mapbox/outdoors-v11"
      >
        {" "}
        {pins.map((p)=>(
        <>
        <Marker
          latitude={p.lat}
          longitude={p.long}
          offsetLeft={-20}
          offsetTop={-10}
        >
          <MyLocation style={{ color: p.username === currentUser ? "tomato" : "slateblue", cursor:"pointer" }} 
            onClick={()=>handleMarkerClick(p._id)}
          />
        </Marker>
        {p._id === currentPlaceId && (
        <Popup
          latitude={p.lat}
          longitude={p.long}
          closeButton={true}
          closeOnClick={false}
          anchor="left"
          onClose={()=>setCurrentPlaceId(null)}
        >
          <div className="card">
            <label>Lieu</label>
            <h4 className="place">{p.title}</h4>
            <label>Review</label>
            <p className="desc">{p.desc}</p>
            <label>Note</label>
            <div className="stars">
              <Star className="star" />
              <Star className="star" />
              <Star className="star" />
              <Star className="star" />
              <Star className="star" />
            </div>
            <label>Information</label>
            <span className="username">
              Créé par <b>{p.username}</b>
            </span>
            <span className="date">{format(p.createdAt)}</span>
          </div>
        </Popup>)}
        </>
        ))}

      </ReactMapGL>
    </div>
  );
}

export default App;
