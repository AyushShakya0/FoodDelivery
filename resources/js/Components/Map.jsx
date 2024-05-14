import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const MapViewContainer = ({ user, vendor }) => {
    // Set static location data
    const locations = [
        {
            id: 1,
            name: "My Location",
            latitude: user.latitude,
            longitude: user.longitude
        },
        // {
        //     id: 2,
        //     name: vendor.name,
        //     latitude: vendor.latitude,
        //     longitude: vendor.longitude
        // }
    ];

    console.log(user.longitude);
    console.log(user.latitude);

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
            {locations.map((location) => (
                <Marker
                    key={location.id}
                    position={[location.latitude, location.longitude]}
                >
                    <Popup>{location.name}</Popup>
                </Marker>
            ))}
        </MapContainer>
    );
};

export default MapViewContainer;
