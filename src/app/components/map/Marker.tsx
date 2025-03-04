import React from "react";
import { Marker } from "@vis.gl/react-google-maps";

const CustomMarker = ({ position }) => {
  // Define the custom marker icon
  const markerIcon = {
    path: google.maps.SymbolPath.CIRCLE,
    fillColor: "#000", // Black circle
    fillOpacity: 1,
    strokeColor: "#fff", // White border
    strokeWeight: 4,
    scale: 10, // Adjust size
  };

  return (
    <Marker
      position={position}
      icon={markerIcon}
      zIndex={1000} // Ensure the marker is on top
    />
  );
};

export default CustomMarker;
