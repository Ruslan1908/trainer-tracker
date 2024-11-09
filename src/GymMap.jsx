import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const mapStyles = {
  height: "400px",
  width: "100%"
};

const defaultCenter = {
  lat: 40.730610, lng: -73.935242 // Примерные координаты
};

const GymMap = () => {
  return (
    <LoadScript googleMapsApiKey='ТВОЙ_API_КЛЮЧ'>
      <GoogleMap
        mapContainerStyle={mapStyles}
        zoom={13}
        center={defaultCenter}
      >
        <Marker position={defaultCenter} />
      </GoogleMap>
    </LoadScript>
  );
};

export { GymMap };

