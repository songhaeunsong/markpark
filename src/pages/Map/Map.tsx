import { useEffect, useRef } from "react";
import { useGeolocation } from "../../hooks/useGeolocation";
import Loading from "../../component/Loading";

const Map = () => {
  const mapRef = useRef(null);
  const { currentLocation, loading } = useGeolocation();

  useEffect(() => {
    if (mapRef.current) {
      const location = new naver.maps.LatLng(
        currentLocation.lat,
        currentLocation.lng
      );
      const map = new naver.maps.Map(mapRef.current, {
        center: location,
        zoom: 17,
      });
      new naver.maps.Marker({
        position: location,
        map,
      });
    }
  }, [currentLocation]);

  if (loading) return <Loading />;

  return !loading && <div ref={mapRef} className="w-screen h-screen"></div>;
};

export default Map;
