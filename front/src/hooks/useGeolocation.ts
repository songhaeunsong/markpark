import { useState, useEffect } from "react";
import { CurrentLocation } from "../types/types";

export const useGeolocation = () => {
  const [currentLocation, setCurrentLocation] = useState<CurrentLocation>({
    lat: 37.5664056,
    lng: 126.9778222,
  });
  const [loading, setLoading] = useState(false);

  const getPosition = () => {
    setLoading(true);

    const success = (location: {
      coords: { latitude: number; longitude: number };
    }) => {
      setCurrentLocation({
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      });
      setLoading(false);
    };

    const error = () => {
      setLoading(false);
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error);
    }
  };

  useEffect(() => {
    getPosition();
  }, []);

  return { currentLocation, loading };
};
