import axios from "axios";
import { ICloseParking, ICloseParkingsParams } from "../typings/db";

// 내 주변 주차장 정보 검색 API

export const getCloseParkings = (
  params: ICloseParkingsParams
): Promise<ICloseParking[]> => {
  return axios
    .get(`${import.meta.env.VITE_API}/parking`, { params })
    .then((response) => response.data)
    .catch((error) => {
      console.error("주변 주차장 정보 검색 중 에러 발생:", error);
      throw error;
    });
};
