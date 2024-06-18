import { MdOutlineSettingsBackupRestore } from "react-icons/md";
import { FaLocationCrosshairs } from "react-icons/fa6";
import { FC } from "react";

interface TProps {
  setLocationSelectable: React.Dispatch<React.SetStateAction<boolean>>;
  handleLocationSelect: () => void;
  locationSelectable: boolean;
}

const LocationSetting: FC<TProps> = ({
  setLocationSelectable,
  handleLocationSelect,
  locationSelectable,
}) => {
  const reload = () => {
    window.location.reload();
  };

  const selectableMode = () => {
    setLocationSelectable(!locationSelectable);
  };
  const findNewLocation = () => {
    handleLocationSelect();
    setLocationSelectable(!locationSelectable);
  };

  return (
    <div>
      <div className="flex items-center w-44 group">
        <div className="flex items-center justify-center bg-white rounded-lg shadow-md w-9 h-9">
          <MdOutlineSettingsBackupRestore size="30" onClick={reload} />
        </div>
        <span className="p-1 ml-1 text-xs text-white transition-opacity duration-300 ease-in-out bg-gray-500 rounded shadow-md opacity-0 group-hover:opacity-100">
          현재 위치 찾기
        </span>
      </div>

      {locationSelectable ? (
        <div className="flex items-center mt-4 w-44 group">
          <button
            className="text-center bg-white rounded-lg shadow-md w-9 h-9"
            onClick={findNewLocation}
          >
            찾기
          </button>
        </div>
      ) : (
        <div className="flex items-center mt-4 w-44 group">
          <div
            className="flex items-center justify-center bg-white rounded-lg shadow-md w-9 h-9"
            onClick={selectableMode}
          >
            <FaLocationCrosshairs size="25" />
          </div>
          <span className="p-1 ml-1 text-xs text-white transition-opacity duration-300 ease-in-out bg-gray-500 rounded shadow-md opacity-0 group-hover:opacity-100">
            위치 직접 설정
          </span>
        </div>
      )}
    </div>
  );
};
export default LocationSetting;
