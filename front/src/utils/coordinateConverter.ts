import proj4 from "proj4";

const coordinateConverter = (lat: number, lng: number) => {
  const converter = proj4("EPSG:4326", "EPSG:3857");

  const [x, y] = converter.forward([lng, lat]);

  return [x.toFixed(2), y.toFixed(2)];
};

export default coordinateConverter;
