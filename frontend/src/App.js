import { useState } from "react";
import ReactMapGL, { Marker } from "react-map-gl";
import { MyLocation } from '@mui/icons-material';

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
      >
        {" "}
        <Marker
          latitude={48.5734053}
          longitude={7.7521113}
          offsetLeft={-20}
          offsetTop={-10}
        >
          <MyLocation style={{ color:"slateblue" }}/>
        </Marker>
      </ReactMapGL>
    </div>
  );
}

export default App;
