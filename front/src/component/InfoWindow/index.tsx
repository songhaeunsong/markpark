import { FC } from "react";
import { ICloseParking } from "../../typings/db";

const InfoWindow: FC<{ parking: ICloseParking }> = ({ parking }) => {
  const processedDistance =
    parking.distance > 1000
      ? `${(parking.distance / 1000).toFixed(2)}km`
      : `${Math.round(parking.distance)}m`;

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
      <p className="mt-4 text-base">
        현재 위치에서 <span className="font-medium">{processedDistance}</span>{" "}
        만큼 떨어져 있어요!
      </p>
    </div>
  );
};

export default InfoWindow;
