import React, { useEffect, useState, useMemo } from "react";
import { connect } from "react-redux";
import { setRouteData, buildRouteFailure } from "../../../../store/actions/setAdreses";
import { BULIT_ROUTE_API } from "../../../../helpers/constants";
import { APIProvider, Map, useMap, useMapsLibrary } from "@vis.gl/react-google-maps";
import * as polyline from "@mapbox/polyline";
import axios from "axios";
import CustomMarker from "./Marker";

const MapRoute = ({ coordinates }) => {
  const map = useMap();
  const maps = useMapsLibrary("maps");

  useEffect(() => {
    if (!maps || !coordinates?.length) return;

    // Create base polyline for the route
    const basePath = new maps.Polyline({
      path: coordinates,
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

const MapRouteDisplay = ({ startAddress, endAddress, setRouteData, routeData }) => {
  const [routePath, setRoutePath] = useState([]);
  const [error, setError] = useState(null);
  const [mapPoints, setMapPoints] = useState({ start: null, end: null });

  const buildRoute = async (start, end) => {
    try {
      const requestData = {
        start_location: {
          lat: start.coordinates[1],
          lon: start.coordinates[0],
        },
        end_location: {
          lat: end.coordinates[1],
          lon: end.coordinates[0],
        },
      };

      const response = await axios.post(BULIT_ROUTE_API, requestData);

      if (response.status === 200) {
        setRouteData(response.data);
      }
    } catch (error) {
      console.error("Error building route:", error);
      buildRouteFailure(error);
    }
  };

  useEffect(() => {
    if (startAddress && endAddress) {
      buildRoute(startAddress, endAddress);
    }
  }, [startAddress, endAddress]);

  const decodedPolyline = useMemo(() => {
    if (routeData?.coordinates?.[0]?.geometry) {
      return polyline.decode(routeData.coordinates[0].geometry);
    }
    return null;
  }, [routeData]);

  const mappedCoordinates = useMemo(() => {
    if (!decodedPolyline?.length) return null;
    return decodedPolyline.map((point) => ({ lat: point[0], lng: point[1] }));
  }, [decodedPolyline]);

  useEffect(() => {
    if (mappedCoordinates?.length) {
      setRoutePath(mappedCoordinates);
      setMapPoints({
        start: mappedCoordinates[0],
        end: mappedCoordinates[mappedCoordinates.length - 1],
      });
    }
  }, [mappedCoordinates]);

  if (error) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="text-xl text-red-500">{error}</div>
      </div>
    );
  }

  if (!process.env.GOOGLE_MAPS_API_KEY) {
    console.error("Google Maps API key is missing");
    return <div>Missing API key configuration</div>;
  }

  const defaultCenter = {
    lat: startAddress?.coordinates?.[1] || 37.6156,
    lng: startAddress?.coordinates?.[0] || 55.7522,
  };

  return (
    <APIProvider apiKey={process.env.GOOGLE_MAPS_API_KEY}>
      <Map
        defaultCenter={defaultCenter}
        defaultZoom={12}
        gestureHandling="greedy"
        style={{ width: "100%", height: "100vh" }}
        disableDefaultUI={true}
      >
        {routePath.length > 0 && (
          <>
            <MapRoute coordinates={routePath} />
            {mapPoints.start && <CustomMarker position={mapPoints.start} />}
            {mapPoints.end && <CustomMarker position={mapPoints.end} />}
          </>
        )}
      </Map>
    </APIProvider>
  );
};

const mapStateToProps = (state) => ({
  startAddress: state.address.startAddress,
  endAddress: state.address.endAddress,
  routeData: state.address.routeData,
});

const mapDispatchToProps = {
  setRouteData,
};

export default connect(mapStateToProps, mapDispatchToProps)(MapRouteDisplay);
