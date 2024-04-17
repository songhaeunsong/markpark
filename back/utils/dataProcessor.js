const fs = require("fs");
let rawData = fs.readFileSync("../data/rawData.json");
let jsonData = JSON.parse(rawData);

let processedData = jsonData.records.map((record) => {
  return {
    parkingName: record.주차장명,
    parkingType: record.주차장구분,
    roadAddress: record.소재지도로명주소,
    address: record.소재지지번주소,
    feeInfo: record.요금정보,
    latitude: record.위도,
    longitude: record.경도,
  };
});

fs.writeFileSync(
  "../data/processedData.json",
  JSON.stringify(processedData, null, 2)
);
