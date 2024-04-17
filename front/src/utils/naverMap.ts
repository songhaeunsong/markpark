export const createMap = (
  location: naver.maps.LatLng,
  ref: React.RefObject<HTMLDivElement>
): naver.maps.Map => {
  return new naver.maps.Map(ref.current!, {
    center: location,
    zoom: 17,
  });
};

export const addMarker = (
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
