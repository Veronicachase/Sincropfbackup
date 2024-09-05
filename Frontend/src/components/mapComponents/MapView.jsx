/* eslint-disable react/prop-types */
import { useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

const center = { lat: 36.579395, lng: -4.597678 };

function LocationMarker({ setFieldValue }) {
  const [position, setPosition] = useState(center); 
  const map = useMapEvents({
    click(e) {
      const newPos = e.latlng;
      setPosition(newPos);
      map.flyTo(newPos, map.getZoom());
      setFieldValue(
        "map",
        `${newPos.lat.toFixed(5)}, ${newPos.lng.toFixed(5)}`
      );
    },
  });

  return (
    <Marker position={position}>
      <Popup>
        Ubicación actual: {position.lat.toFixed(5)}, {position.lng.toFixed(5)}
      </Popup>
    </Marker>
  );
}

export default function MapView({ setFieldValue }) {
  return (
    <MapContainer
      center={center}
      zoom={13}
      style={{ height: "400px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <LocationMarker setFieldValue={setFieldValue} />
    </MapContainer>
  );
}
