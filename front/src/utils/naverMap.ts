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
  url?: string,
  options?: {
    width: number;
    height: number;
    anchorX: number;
    anchorY: number;
  }
): void => {
  new naver.maps.Marker({
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
};
