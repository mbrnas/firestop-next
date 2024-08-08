"use client";
import { Box, Heading } from "@chakra-ui/react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import axios from "axios";

import iconUrl from "leaflet/dist/images/marker-icon.png";
import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";

const icon = L.icon({
  iconRetinaUrl: iconRetinaUrl.src,
  iconUrl: iconUrl.src,
  shadowUrl: shadowUrl.src,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

interface Incident {
  id: string;
  location: string;
  severity: string;
  description: string;
  reportedAt: string;
  reporterName: string;
  reporterContact: string;
  latitude: number;
  longitude: number;
}

const MapComponent: React.FC = () => {
  const [incidents, setIncidents] = useState<Incident[]>([]);

  useEffect(() => {
    const fetchIncidents = async () => {
      try {
        const response = await axios.get<Incident[]>(
          "http://localhost:8080/api/incidents"
        );
        console.log("Fetched incidents: ", response.data);
        if (response.data) {
          setIncidents(response.data);
        } else {
          console.error("No data in response");
        }
      } catch (error) {
        console.error("Error fetching incidents:", error);
      }
    };

    fetchIncidents();
  }, []);

  return (
    <Box p={4} borderWidth={1} borderRadius="md" boxShadow="lg" width="150%">
      <Heading size="md" mb={4}>
        Wildfire Incidents in Croatia
      </Heading>
      <Box width="100%" height="500px" overflow="auto">
        <MapContainer
          center={[45.1, 16.0]}
          zoom={6.4}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          {incidents.length > 0 ? (
            incidents.map((incident) => (
              <Marker
                key={incident.id}
                position={[incident.latitude, incident.longitude]}
                icon={icon}
              >
                <Popup>
                  <strong>{incident.location}</strong>
                  <br />
                  Severity: {incident.severity}
                  <br />
                  Description: {incident.description}
                  <br />
                  Reported by: {incident.reporterName}
                  <br />
                  Contact: {incident.reporterContact}
                  <br />
                  Reported at: {new Date(incident.reportedAt).toLocaleString()}
                </Popup>
              </Marker>
            ))
          ) : (
            <div>No incidents to display</div>
          )}
        </MapContainer>
      </Box>
    </Box>
  );
};

export default MapComponent;
