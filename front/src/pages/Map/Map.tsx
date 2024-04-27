import { useEffect, useRef } from "react";
import { Provider, useSelector } from "react-redux";
import store, { RootState } from "../../store";
import { useQuery } from "@tanstack/react-query";
import { renderToString } from "react-dom/server";
import { useGeolocation } from "../../hooks/useGeolocation";
import Loading from "../../component/Loading";
import { getCloseParkings } from "../../api/parkingApi";
import { addMarker, createMap } from "../../utils/naverMap";
import InfoWindow from "../../component/InfoWindow";

const Map = () => {
  const mapRef = useRef(null);

  useGeolocation();
  const currentLocation = useSelector(
    (state: RootState) => state.location.currentLocation
  );
  const isLoading = useSelector((state: RootState) => state.location.loading);

  const { data: closeParkingsData, isLoading: closeParkingsLoading } = useQuery(
    {
      queryKey: ["closeParkings", currentLocation],
      queryFn: () =>
        getCloseParkings({
          latitude: currentLocation.lat,
          longitude: currentLocation.lng,
          radius: 2000,
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
  }, [currentLocation, closeParkingsData, mapRef]);

  if (isLoading || closeParkingsLoading) return <Loading />;

  return !isLoading && <div ref={mapRef} className="w-screen h-screen"></div>;
};

export default Map;
