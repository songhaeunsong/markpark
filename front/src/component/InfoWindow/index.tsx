import { FC } from "react";
import { ICloseParking, ILocation } from "../../typings/db";
import coordinateConverter from "../../utils/coordinateConverter";

interface TProps {
  parking: ICloseParking;
  userLocation: ILocation;
}

const InfoWindow: FC<TProps> = ({ parking, userLocation }) => {
  const processedDistance =
    parking.distance > 1000
      ? `${(parking.distance / 1000).toFixed(2)}km`
      : `${Math.round(parking.distance)}m`;

  const [parkingMercatorX, parkingMmercatorY] = coordinateConverter(
    +parking.latitude,
    +parking.longitude
  );
  const [userMercatorX, userMercatorY] = coordinateConverter(
    userLocation.lat,
    userLocation.lng
  );

  const naverMapUrl = `${
    import.meta.env.VITE_NAVER_MAP_URL
  }/${userMercatorX},${userMercatorY},,ADDRESS_POI/${parkingMercatorX},${parkingMmercatorY},${
    parking.parkingName
  },,PLACE_POI/-/car`;

  return (
    <div className="p-6 rounded shadow-lg shadow-black/10">
      <h3 className="mb-2 font-semibold text-base">
        {parking.parkingName} ({parking.parkingType}, {parking.feeInfo})
      </h3>
      {parking.address && (
        <p className="text-xs">지번 주소: {parking.address}</p>
      )}
      {parking.roadAddress && (
        <p className="text-xs">도로명 주소: {parking.roadAddress}</p>
      )}
      <p className="my-4 text-base">
        현재 위치에서 <span className="font-medium">{processedDistance}</span>{" "}
        만큼 떨어져 있어요!
      </p>
      <div className="w-full flex justify-center">
        <a href={naverMapUrl} target="blank">
          <button className="px-4 py-1 shadow-custom-gray transition-all hover:shadow-hover-gray hover:text-hover-color">
            길찾기
          </button>
        </a>
      </div>
    </div>
  );
};

export default InfoWindow;
