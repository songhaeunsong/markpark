import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  setUserLocation,
  startLoading,
} from "../features/location/locationSlice";

export const useGeolocation = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(startLoading());
    const success = (position: {
      coords: { latitude: number; longitude: number };
    }) => {
      dispatch(
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        })
      );
    };
    const error = () => {
      dispatch(
        setUserLocation({
          lat: 37.5664056,
          lng: 126.9778222,
        })
      );
    };

    navigator.geolocation.getCurrentPosition(success, error);
  }, [dispatch]);
};
