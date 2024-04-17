import { useEffect, useRef } from "react";
import { useGeolocation } from "../../hooks/useGeolocation";
import Loading from "../../component/Loading";
import { getCloseParkings } from "../../api/parkingApi";
import { useQuery } from "@tanstack/react-query";

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

  const createMap = (location: naver.maps.LatLng): naver.maps.Map => {
    return new naver.maps.Map(mapRef.current!, {
      center: location,
      zoom: 17,
    });
  };

  const addMarker = (
    map: naver.maps.Map,
    position: naver.maps.LatLng,
    url?: string
  ): void => {
    new naver.maps.Marker({
      position,
      map,
      icon: url
        ? {
            url,
            size: new naver.maps.Size(35, 48),
            origin: new naver.maps.Point(0, 0),
            anchor: new naver.maps.Point(17, 48),
          }
        : "",
    });
  };

  useEffect(() => {
    if (!mapRef.current || !closeParkingsData) return;

    const location = new naver.maps.LatLng(
      currentLocation.lat,
      currentLocation.lng
    );
    const map = createMap(location);
    addMarker(map, location);

    closeParkingsData.forEach((parking) => {
      const position = new naver.maps.LatLng(
        +parking.latitude,
        +parking.longitude
      );
      addMarker(map, position, "/marker.png");
    });
  }, [currentLocation, closeParkingsData]);

  if (loading || closeParkingsLoading) return <Loading />;

  return !loading && <div ref={mapRef} className="w-screen h-screen"></div>;
};

export default Map;
