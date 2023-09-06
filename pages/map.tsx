import {
  GoogleMap,
  useLoadScript,
  TrafficLayer,
  TransitLayer,
  BicyclingLayer,
} from "@react-google-maps/api";
import { useMemo } from "react";

export default function map() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_REACT_APP_GOOGLE_API_KEY,
  });

  const center = useMemo(() => ({ lat: 53.5769104, lng: -6.1222584 }), []);

  return (
    <div className="localMap">
      {!isLoaded ? (
        <h2>Loading...</h2>
      ) : (
        <GoogleMap
          mapContainerClassName="map-container"
          center={center}
          zoom={14}
        >
          <TrafficLayer />
          <TransitLayer />
        </GoogleMap>
      )}
    </div>
  );
}
