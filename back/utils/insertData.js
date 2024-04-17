const fs = require("fs");
const Parking = require("../models/parking");

fs.readFile("../data/processedData.json", "utf8", async (err, data) => {
  if (err) {
    console.error("파일 읽기 실패:", err);
    return;
  }
  const parkings = JSON.parse(data);

  try {
    await Parking.bulkCreate(parkings);
    console.log("db 삽입 완료");
  } catch (error) {
    console.error("데이터 삽입 실패:", error);
  }
});
