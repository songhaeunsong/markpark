import { useState, useEffect } from "react";
import { ILocation } from "../typings/db";

export const useGeolocation = () => {
  const [currentLocation, setCurrentLocation] = useState<ILocation>({
    lat: 0,
    lng: 0,
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
      setCurrentLocation({
        lat: 37.5664056,
        lng: 126.9778222,
      });
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
