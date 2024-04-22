require("dotenv").config({ path: "../.env" });
const fs = require("fs");
const axios = require("axios");
let rawData = fs.readFileSync("../data/rawData.json");
let jsonData = JSON.parse(rawData);

const config = {
  method: "get",
  url: "https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode",
  headers: {
    "X-NCP-APIGW-API-KEY-ID": process.env.NAVER_API_CLIENT_ID,
    "X-NCP-APIGW-API-KEY": process.env.NAVER_API_CLIENT_SECRET,
  },
  params: {
    query: "",
  },
};

async function geocodeAddress(address) {
  config.params.query = address;
  try {
    const response = await axios(config);
    const lat = response.data.addresses[0].y;
    const lng = response.data.addresses[0].x;
    return { latitude: lat, longitude: lng };
  } catch (error) {
    return { latitude: "", longitude: "" };
  }
}

async function processData(records) {
  const processedData = [];
  for (const record of records) {
    let coords = { latitude: record.위도, longitude: record.경도 };
    if (
      !coords.latitude &&
      (record.소재지지번주소 || record.소재지도로명주소)
    ) {
      coords = await geocodeAddress(
        record.소재지지번주소 || record.소재지도로명주소
      );
    }
    processedData.push({
      parkingName: record.주차장명,
      parkingType: record.주차장구분,
      roadAddress: record.소재지도로명주소,
      address: record.소재지지번주소,
      feeInfo: record.요금정보,
      ...coords,
    });
  }
  fs.writeFileSync(
    "../data/processedData.json",
    JSON.stringify(processedData, null, 2)
  );
}

processData(jsonData.records);
