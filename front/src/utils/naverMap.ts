export const createMap = (
  latlng: naver.maps.LatLng,
  ref: React.RefObject<HTMLDivElement>
): naver.maps.Map => {
  return new naver.maps.Map(ref.current!, {
    center: latlng,
    zoom: 17,
  });
};

export const addMarker = (
  map: naver.maps.Map,
  position: naver.maps.LatLng,
  url?: string,
  options?: {
    width: number;
    height: number;
    anchorX: number;
    anchorY: number;
  }
): naver.maps.Marker => {
  const marker = new naver.maps.Marker({
    position,
    map,
    icon:
      url && options
        ? {
            url,
            scaledSize: new naver.maps.Size(options.width, options.height),
            origin: new naver.maps.Point(0, 0),
            anchor: new naver.maps.Point(options.anchorX, options.anchorY),
          }
        : "",
  });
  return marker;
};
