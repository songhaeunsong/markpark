const sequelize = require("../config/config");

exports.getParkings = async (req, res) => {
  const { latitude, longitude, radius } = req.query;
  if (!latitude || !longitude || !radius) {
    return res.status(400).send("파라미터 입력 오류");
  }
  const query = `
    SELECT *, ST_Distance_Sphere(
      point(longitude, latitude),
      point(:longitude, :latitude)) AS distance
    FROM parkings
    WHERE ST_Distance_Sphere(
      point(longitude, latitude),
      point(:longitude, :latitude)) <= :radius
    ORDER BY distance;
  `;

  try {
    const parkingSpots = await sequelize.query(query, {
      replacements: {
        longitude,
        latitude,
        radius,
      },
      type: sequelize.QueryTypes.SELECT,
    });
    res.json(parkingSpots);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
