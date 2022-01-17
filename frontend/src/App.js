import { useState } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import { MyLocation, Star } from "@mui/icons-material";
import "./app.css";

const REACT_APP_MAPBOX_ACCESS_TOKEN =
  "pk.eyJ1IjoiY2Fyb2xpbmVzZW5lcyIsImEiOiJja3lnNTNlbXIxcGEwMnZwYnd1dmNwZG9vIn0.qstETxxcAmij4x9d9bN1ew";

function App() {
  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "100vh",
    latitude: 48,
    longitude: 7,
    zoom: 8,
  });
  return (
    <div className="App">
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={REACT_APP_MAPBOX_ACCESS_TOKEN}
        onViewportChange={(nextViewport) => setViewport(nextViewport)}
        mapStyle="mapbox://styles/mapbox/satellite-v9"
      >
        {" "}
        <Marker
          latitude={48.5734053}
          longitude={7.7521113}
          offsetLeft={-20}
          offsetTop={-10}
        >
          <MyLocation style={{ color: "red" }} />
        </Marker>
        <Popup
          latitude={48.5734053}
          longitude={7.7521113}
          closeButton={true}
          closeOnClick={false}
          anchor="left"
        >
          <div className="card">
            <label>Lieu</label>
            <h4 className="place">Cathédrale de Strasbourg</h4>
            <label>Review</label>
            <p className="desc">Lieu magnifique!</p>
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
              Créé par <b>Caro</b>
            </span>
            <span className="date">il y a 1h</span>
          </div>
        </Popup>
      </ReactMapGL>
    </div>
  );
}

export default App;
