import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const showMap = useCallback(() => {
    navigate("/map");
  }, [navigate]);
  return (
    <>
      <div className="flex">
        <div className="w-80">
          <img src="/icon.png" alt="markpark-image" />
        </div>
        <div className="flex flex-col">
          <div className="h-40 mt-20">
            <div className="w-80">
              <img src="/logo.png" alt="markpark-logo" />
            </div>
            <p className="text-white font-medium mt-4 text-center">
              주변에 있는 주차장을 바로 확인하세요 !
            </p>
          </div>
          <button onClick={showMap} className="py-2 px-5">
            내 주변 주차장 찾기
          </button>
        </div>
      </div>
    </>
  );
};
export default Home;
