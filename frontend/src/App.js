import { useState } from "react";
import ReactMapGL from "react-map-gl";

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
      </ReactMapGL>
    </div>
  );
}

export default App;
