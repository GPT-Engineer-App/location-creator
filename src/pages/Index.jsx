import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import { Box } from '@chakra-ui/react';
import LocationForm from '../components/LocationForm';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icon issue with Webpack
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const Index = () => {
  const [locations, setLocations] = useState([]);
  const [selectedPosition, setSelectedPosition] = useState(null);

  const MapClickHandler = () => {
    useMapEvents({
      click(e) {
        setSelectedPosition(e.latlng);
      },
    });
    return null;
  };

  const handleAddLocation = (name) => {
    setLocations([...locations, { name, position: selectedPosition }]);
    setSelectedPosition(null);
  };

  return (
    <Box height="100vh" width="100vw">
      <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <MapClickHandler />
        {locations.map((location, index) => (
          <Marker key={index} position={location.position} draggable={true}>
            <Popup>{location.name}</Popup>
          </Marker>
        ))}
      </MapContainer>
      {selectedPosition && <LocationForm onSubmit={handleAddLocation} />}
    </Box>
  );
};

export default Index;