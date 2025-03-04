import { useEffect, useState, useMemo } from "react";
import { APIProvider, Map, useMap, useMapsLibrary } from "@vis.gl/react-google-maps";
import { useSelector } from "react-redux";
import useWebSocket from "../../../../../hook/useWebSocket";
import * as polyline from "@mapbox/polyline";
import CustomMarker from "../../map/Marker";

const MapRoute = ({ coordinates }) => {
  const map = useMap();
  const maps = useMapsLibrary("maps");

  useEffect(() => {
    if (!maps || !coordinates?.length) return;

    const basePath = new maps.Polyline({
      path: coordinates.map(coord => ({
        lat: coord.latitude || coord.lat,
        lng: coord.longitude || coord.lng
      })),
      geodesic: true,
      strokeColor: "#0044ff",
      strokeOpacity: 0.7,
      strokeWeight: 8,
      map: map,
    });

    return () => {
      basePath.setMap(null);
    };
  }, [map, maps, coordinates]);

  return null;
};

const Tracking = ({ userID, trackingData }) => {
  const { sendMessage } = useWebSocket(userID);
  const infoState = useSelector((state) => state.notify.infoState);
  const startAddress = useSelector((state) => state.address.startAddress);
  const [coordinates, setCoordinates] = useState([]);
  const [mapPoints, setMapPoints] = useState({ start: null, end: null });
  const [error, setError] = useState(null);

  // Decode polyline and map coordinates
  const { decodedCoordinates, routePoints } = useMemo(() => {
    if (!trackingData?.route?.route?.[0]?.geometry) {
      return { decodedCoordinates: [], routePoints: { start: null, end: null } };
    }

    try {
      const decoded = polyline.decode(trackingData.route.route[0].geometry);
      const mappedCoords = decoded.map(point => ({
        latitude: point[0],
        longitude: point[1]
      }));

      return {
        decodedCoordinates: mappedCoords,
        routePoints: {
          start: mappedCoords[0],
          end: mappedCoords[mappedCoords.length - 1]
        }
      };
    } catch (err) {
      setError("Failed to decode route data");
      return { decodedCoordinates: [], routePoints: { start: null, end: null } };
    }
  }, [trackingData]);

  // Update coordinates and map points
  useEffect(() => {
    if (decodedCoordinates.length > 0) {
      setCoordinates(decodedCoordinates);
      setMapPoints(routePoints);
    }
  }, [decodedCoordinates, routePoints]);

  const defaultCenter = useMemo(() => ({
    lat: startAddress?.coordinates?.[1] ?? 37.6156,
    lng: startAddress?.coordinates?.[0] ?? 55.7522,
  }), [startAddress]);

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <APIProvider apiKey={process.env.GOOGLE_MAPS_API_KEY}>
      <Map defaultCenter={defaultCenter} zoom={12} className="w-full h-full">
        <MapRoute coordinates={coordinates} />
        
        {mapPoints.start && (
          <CustomMarker 
            position={{
              lat: mapPoints.start.latitude,
              lng: mapPoints.start.longitude
            }}
          />
        )}
        
        {mapPoints.end && (
          <CustomMarker 
            position={{
              lat: mapPoints.end.latitude,
              lng: mapPoints.end.longitude
            }}
          />
        )}
      </Map>
    </APIProvider>
  );
};

export default Tracking;