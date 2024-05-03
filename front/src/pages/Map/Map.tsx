import { useEffect, useRef } from "react";
import { useGeolocation } from "../../hooks/useGeolocation";
import Loading from "../../component/Loading";
import { getCloseParkings } from "../../api/parkingApi";
import { useQuery } from "@tanstack/react-query";
import { addMarker, createMap } from "../../utils/naverMap";
import InfoWindow from "../../component/InfoWindow";
import { renderToString } from "react-dom/server";

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
    if (!mapRef.current || !closeParkingsData || !currentLocation) return;

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

      const marker = addMarker(map, position, "/marker.png", {
        width: 30,
        height: 41,
        anchorX: 15,
        anchorY: 41,
      });

      const contentString = renderToString(
        <InfoWindow parking={parking} userLocation={currentLocation} />
      );

      let infoWindow = new naver.maps.InfoWindow({
        content: contentString,
        pixelOffset: new naver.maps.Point(3, 3),
        borderColor: "none",
        disableAnchor: true,
      });

      naver.maps.Event.addListener(marker, "click", function () {
        if (infoWindow.getMap()) {
          infoWindow.close();
        } else {
          infoWindow.open(map, marker);
        }
      });
    });
  }, [currentLocation, closeParkingsData]);

  if (loading || closeParkingsLoading) return <Loading />;

  return !loading && <div ref={mapRef} className="w-screen h-screen"></div>;
};

export default Map;
