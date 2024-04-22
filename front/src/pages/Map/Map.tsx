import { useEffect, useRef } from "react";
import { useGeolocation } from "../../hooks/useGeolocation";
import Loading from "../../component/Loading";
import { getCloseParkings } from "../../api/parkingApi";
import { useQuery } from "@tanstack/react-query";
import { addMarker, createMap } from "../../utils/naverMap";

const Map = () => {
  const mapRef = useRef(null);
  const { currentLocation, loading } = useGeolocation();

  const { data: closeParkingsData, isLoading: closeParkingsLoading } = useQuery(
    {
      queryKey: ["closeParkings", currentLocation],
      queryFn: () =>
        getCloseParkings({
          latitude: currentLocation.lat,
          longitude: currentLocation.lng,
          radius: 500,
        }),
      enabled: !!currentLocation,
    }
  );

  useEffect(() => {
    if (!mapRef.current || !closeParkingsData) return;
    const userLocation = new naver.maps.LatLng(
      currentLocation.lat,
      currentLocation.lng
    );
    const map = createMap(userLocation, mapRef);
    addMarker(map, userLocation, "/user-marker.png", {
      width: 20,
      height: 20,
      anchorX: 10,
      anchorY: 10,
    });

    closeParkingsData.forEach((parking) => {
      const position = new naver.maps.LatLng(
        +parking.latitude,
        +parking.longitude
      );

      addMarker(map, position, "/marker.png", {
        width: 30,
        height: 41,
        anchorX: 15,
        anchorY: 41,
      });
    });
  }, [currentLocation, closeParkingsData]);

  if (loading || closeParkingsLoading) return <Loading />;

  return !loading && <div ref={mapRef} className="w-screen h-screen"></div>;
};

export default Map;
