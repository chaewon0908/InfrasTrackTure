"use client";

import { useEffect, useState, useCallback } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from "react-leaflet";
import { LatLngExpression, Icon } from "leaflet";
import { Navigation, Loader2 } from "lucide-react";
import Button from "@/components/ui/Button";

// Custom marker icon
const customIcon = new Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// San Mateo, Rizal center coordinates
const SAN_MATEO_CENTER: LatLngExpression = [14.6978, 121.1203];

interface LocationPickerProps {
  onLocationSelect: (lat: number, lng: number, address?: string) => void;
  initialLocation?: { lat: number; lng: number };
}

function LocationMarker({
  position,
  setPosition,
}: {
  position: LatLngExpression | null;
  setPosition: (pos: LatLngExpression) => void;
}) {
  useMapEvents({
    click(e) {
      setPosition([e.latlng.lat, e.latlng.lng]);
    },
  });

  return position ? <Marker position={position} icon={customIcon} /> : null;
}

function MapController({ center }: { center: LatLngExpression }) {
  const map = useMap();

  useEffect(() => {
    map.flyTo(center, 17, { duration: 1.5 });
  }, [map, center]);

  return null;
}

export default function LocationPicker({
  onLocationSelect,
  initialLocation,
}: LocationPickerProps) {
  const [position, setPosition] = useState<LatLngExpression | null>(
    initialLocation ? [initialLocation.lat, initialLocation.lng] : null
  );
  const [isLocating, setIsLocating] = useState(false);
  const [mapCenter, setMapCenter] = useState<LatLngExpression>(SAN_MATEO_CENTER);

  const handlePositionChange = useCallback(
    (pos: LatLngExpression) => {
      setPosition(pos);
      const [lat, lng] = pos as [number, number];
      onLocationSelect(lat, lng);
    },
    [onLocationSelect]
  );

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }

    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const newPos: LatLngExpression = [latitude, longitude];
        setPosition(newPos);
        setMapCenter(newPos);
        onLocationSelect(latitude, longitude);
        setIsLocating(false);
      },
      (error) => {
        console.error("Error getting location:", error);
        alert("Unable to get your location. Please select manually on the map.");
        setIsLocating(false);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-[#64748b]">
          Click on the map to select the issue location, or use GPS
        </p>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={getCurrentLocation}
          disabled={isLocating}
        >
          {isLocating ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Locating...
            </>
          ) : (
            <>
              <Navigation className="w-4 h-4" />
              Use My Location
            </>
          )}
        </Button>
      </div>

      <div className="h-[300px] rounded-xl overflow-hidden border-2 border-[#e2e8f0] shadow-lg">
        <MapContainer
          center={mapCenter}
          zoom={14}
          style={{ height: "100%", width: "100%" }}
          className="z-0"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <LocationMarker position={position} setPosition={handlePositionChange} />
          <MapController center={mapCenter} />
        </MapContainer>
      </div>

      {position && (
        <div className="flex items-center gap-2 text-sm text-[#0d9488] bg-[#f0fdfa] px-4 py-2 rounded-lg">
          <Navigation className="w-4 h-4" />
          <span>
            Location selected: {(position as [number, number])[0].toFixed(6)},{" "}
            {(position as [number, number])[1].toFixed(6)}
          </span>
        </div>
      )}
    </div>
  );
}
