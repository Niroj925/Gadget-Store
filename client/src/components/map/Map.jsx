import React, { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import { Box, Button, Flex, Group, Tooltip } from "@mantine/core";
import { TbCurrentLocation } from "react-icons/tb";


const MapCenter = ({ markerPosition, zoomLevel}) => {
  const map = useMap();

  useEffect(() => {
    if (markerPosition) {
      map.flyTo(markerPosition, zoomLevel);
    }
  }, [markerPosition, zoomLevel, map]);

  return null;
};

const Map = ({ onMarkerPositionChange }) => {
  const [markerPosition, setMarkerPosition] = useState([27.6969, 85.3638]);


  // Custom marker icon
  const customMarkerIcon = new L.Icon({
    iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
    iconSize: [30, 45],
    iconAnchor: [17, 46],
    popupAnchor: [0, -46],
  });

  // Handle map clicks
  const MapClickHandler = () => {
    useMapEvents({
      click: (e) => {
        const { lat, lng } = e.latlng;
        setMarkerPosition([lat, lng]);
        onMarkerPositionChange([lat, lng]);
      },
    });
    return null;
  };

  // Get current location
  const handleGetLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setMarkerPosition([latitude, longitude]);
        onMarkerPositionChange([latitude, longitude]);
      },
      (error) => {
        console.error("Error getting location:", error);
      }
    );
  };

  useEffect(()=>{
    handleGetLocation();
  },[]);

  return (
    <Flex direction={"column"} gap={10}>
      <MapContainer
        center={markerPosition}
        zoom={11}
        style={{ width: "100%", height: "auto", minHeight: "70vh" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <MapClickHandler />
        <MapCenter markerPosition={markerPosition} zoomLevel={17} /> 
       
        {markerPosition && (
          <Marker position={markerPosition} icon={customMarkerIcon}>
            <Popup>Your location or mark location</Popup>
          </Marker>
        )}
      </MapContainer>
      <Group justify="center" mb={10}>
        <Tooltip label="Current Location" color="grey" position="right-end" offset={5}>
          <Button onClick={handleGetLocation} variant="transparent">
            <TbCurrentLocation size={35} color="#414B80" />
          </Button>
        </Tooltip>
      </Group>
      {
        console.log(markerPosition)
      }
    </Flex>
  );
};

export default Map;
