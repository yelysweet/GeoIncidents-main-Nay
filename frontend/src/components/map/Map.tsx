/// <reference types="vite/client" />

import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.heat';
import { Incident, Category, HeatmapPoint } from '../../types';
import { useMapStore } from '../../store';

// Fix icons Leaflet (necesario para Vercel)
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

const DefaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

interface MapProps {
  incidents: Incident[];
  categories: Category[];
  onIncidentClick?: (incident: Incident) => void;
  onMapClick?: (lat: number, lng: number) => void;
  heatmapData?: HeatmapPoint[];
  showHeatmap?: boolean;
}

// Eventos del mapa
const MapEvents: React.FC<{ onMapClick?: (lat: number, lng: number) => void }> = ({ onMapClick }) => {
  const { setBounds, setCenter, setZoom } = useMapStore();

  useMapEvents({
    click: (e) => {
      onMapClick?.(e.latlng.lat, e.latlng.lng);
    },
    moveend: (e) => {
      const map = e.target;
      const bounds = map.getBounds();
      setBounds({
        north: bounds.getNorth(),
        south: bounds.getSouth(),
        east: bounds.getEast(),
        west: bounds.getWest(),
      });
      setCenter([map.getCenter().lat, map.getCenter().lng]);
      setZoom(map.getZoom());
    },
  });

  return null;
};

// Heatmap
const HeatmapLayer: React.FC<{ points: HeatmapPoint[] }> = ({ points }) => {
  const map = useMap();

  useEffect(() => {
    if (!points || points.length === 0) return;

    const severityColors: Record<string, string> = {
      low: '#22c55e',
      medium: '#f97316',
      high: '#dc2626',
      critical: '#7f1d1d',
    };

    const circles: L.Circle[] = [];

    points.forEach(({ lat, lng, severity, intensity }) => {
      const color = severityColors[severity] || '#eab308';
      const circle = L.circle([lat, lng], {
        color,
        fillColor: color,
        fillOpacity: 0.5,
        radius: intensity * 150,
        weight: 2,
      });

      circle.addTo(map);
      circles.push(circle);
    });

    return () => {
      circles.forEach((circle) => map.removeLayer(circle));
    };
  }, [map, points]);

  return null;
};

// Icono por severidad
const createIncidentIcon = (severity: string, color: string) =>
  L.divIcon({
    className: 'custom-marker',
    html: `
      <div class="incident-marker incident-marker-${severity}" style="background-color: ${color};">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="white" stroke-width="2">
          <circle cx="12" cy="12" r="10"/>
          <line x1="12" y1="8" x2="12" y2="12"/>
          <line x1="12" y1="16" x2="12.01" y2="16"/>
        </svg>
      </div>
    `,
    iconSize: [36, 36],
    iconAnchor: [18, 18],
  });

export const Map: React.FC<MapProps> = ({
  incidents,
  categories,
  onIncidentClick,
  onMapClick,
  heatmapData = [],
  showHeatmap = false,
}) => {
  const { center, zoom } = useMapStore();

  const getCategoryColor = (categoryId: string) => {
    const category = categories.find((c) => c.id === categoryId);
    return category?.color || '#666666';
  };

  return (
    <MapContainer center={center} zoom={zoom} className="h-full w-full rounded-lg" zoomControl={true}>
      <TileLayer
        attribution='&copy; OpenStreetMap Contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <MapEvents onMapClick={onMapClick} />

      {showHeatmap && heatmapData.length > 0 && <HeatmapLayer points={heatmapData} />}

      {!showHeatmap &&
        incidents.map((incident) => (
          <Marker
            key={incident.id}
            position={[incident.latitude, incident.longitude]}
            icon={createIncidentIcon(incident.severity, getCategoryColor(incident.categoryId))}
            eventHandlers={{ click: () => onIncidentClick?.(incident) }}
          >
            <Popup>
              <div className="p-2">
                <h3 className="font-semibold">{incident.title}</h3>
                <p className="text-sm mt-1">{incident.description.substring(0, 100)}...</p>
                <p className="text-xs mt-2">
                  {new Date(incident.incidentDate).toLocaleDateString('es-PE', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </p>
              </div>
            </Popup>
          </Marker>
        ))}
    </MapContainer>
  );
};
