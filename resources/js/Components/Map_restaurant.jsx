import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet"; // Import Leaflet library
import "leaflet/dist/leaflet.css";

// Custom green icon
const greenIcon = new L.Icon({
    iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

const blueIcon = new L.Icon({
    iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png",
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

// Custom yellow icon for vendor
const yellowIcon = new L.Icon({
    iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-yellow.png",
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

const MapViewContainer = ({ vendor, user, courier }) => {
    // Set static location data
    const locations = [
        {
            id: 1,
            name: vendor.name,
            latitude: vendor.latitude,
            longitude: vendor.longitude
        },
    ];

    return (
        <MapContainer
            center={[vendor.latitude, vendor.longitude]}
            zoom={30}
            style={{ height: "400px", width: "100%" }}
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {locations.map((location) => (
                <Marker
                    key={location.id}
                    position={[location.latitude, location.longitude]}
                    icon={greenIcon} // Set custom icon
                >
                    <Popup>{location.name}</Popup>
                </Marker>
            ))}

            <Marker
                key={user.id}
                position={[user.latitude, user.longitude]}
                icon={blueIcon} // Set custom icon
            >
                <Popup>{user.name}</Popup>
            </Marker>

            {courier && (
                <Marker
                    key={courier.id}
                    position={[courier.latitude, courier.longitude]}
                    icon={yellowIcon} // Use custom icon based on location
                >
                    <Popup>{courier.name}</Popup>
                </Marker>
            )}

        </MapContainer>
    );
};

export default MapViewContainer;
