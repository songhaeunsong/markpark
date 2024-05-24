import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const showMap = useCallback(() => {
    navigate("/map");
  }, [navigate]);
  return (
    <>
      <div className="flex flex-col items-center justify-center md:flex-row">
        <div className="w-60 md:w-80">
          <img src="/icon.png" alt="markpark-image" />
        </div>
        <div className="flex flex-col px-12 md:px-0">
          <div className="h-40 mt-10 md:mt-0">
            <div className="w-full md:w-80">
              <img src="/logo.png" alt="markpark-logo" />
            </div>
            <p className="mt-4 font-medium text-center text-white">
              주변에 있는 주차장을 바로 확인하세요 !
            </p>
          </div>
          <button
            onClick={showMap}
            className="px-5 py-2 transition-all shadow-custom-purple hover:shadow-hover-purple hover:text-hover-color"
          >
            내 주변 주차장 찾기
          </button>
        </div>
      </div>
    </>
  );
};
export default Home;
