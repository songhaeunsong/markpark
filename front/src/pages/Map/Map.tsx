import { RefObject, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useQuery } from "@tanstack/react-query";
import { renderToString } from "react-dom/server";
import { useGeolocation } from "../../hooks/useGeolocation";
import Loading from "../../component/Loading";
import { getCloseParkings } from "../../api/parkingApi";
import { addMarker, createMap } from "../../utils/naverMap";
import InfoWindow from "../../component/InfoWindow";
import LocationSetting from "../../component/LocationSetting";
import { LuMousePointerClick } from "react-icons/lu";
import { useDispatch } from "react-redux";
import { setUserLocation } from "../../features/location/locationSlice";
const Map = () => {
  const [locationSelectable, setLocationSelectable] = useState(false);
  const mapContainerRef = useRef(null);
  const mapRef = useRef<naver.maps.Map | null>(null);
  const dispatch = useDispatch();
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
          radius: 1000,
        }),
      enabled: !!currentLocation,
    }
  );

  const handleLocationSelect = () => {
    if (!mapRef.current) return;

    const map = mapRef.current;
    const mapCenter = map.getCenter();
    dispatch(setUserLocation({ lat: mapCenter.y, lng: mapCenter.x }));
  };

  useEffect(() => {
    if (!mapContainerRef.current || !closeParkingsData || !currentLocation)
      return;

    const userLocation = new naver.maps.LatLng(
      currentLocation.lat,
      currentLocation.lng
    );
    const map = createMap(userLocation, mapContainerRef);
    mapRef.current = map;

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
  }, [currentLocation, closeParkingsData, mapRef, dispatch]);

  if (isLoading || closeParkingsLoading) return <Loading />;

  return (
    !isLoading && (
      <div ref={mapContainerRef} className="w-screen h-screen">
        {locationSelectable && (
          <div className="absolute z-50 transform top-49% left-48.8%">
            <LuMousePointerClick size={27} />
          </div>
        )}
        <div className="fixed z-10 m-7">
          <LocationSetting
            setLocationSelectable={setLocationSelectable}
            locationSelectable={locationSelectable}
            handleLocationSelect={handleLocationSelect}
          />
        </div>
      </div>
    )
  );
};

export default Map;
