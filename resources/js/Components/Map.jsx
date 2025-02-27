import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const MapViewContainer = ({ user, vendor, courier }) => {

    // Custom blue icon for user
    const blueIcon = new L.Icon({
        iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png",
        shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });

    // Custom green icon for vendor
    const greenIcon = new L.Icon({
        iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
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

    return (
        <MapContainer
            center={[user.latitude, user.longitude]}
            zoom={20}
            style={{ height: "400px", width: "100%" }}
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {vendor.map((location) => (
                <Marker
                    key={location.id}
                    position={[location.latitude, location.longitude]}
                    icon={greenIcon} // Use custom icon based on location
                >
                    <Popup>{location.name}</Popup>
                </Marker>
            ))}

            <Marker
                key={user.id}
                position={[user.latitude, user.longitude]}
                icon={blueIcon} // Use custom icon based on location
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
