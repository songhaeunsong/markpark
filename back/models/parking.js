const { DataTypes } = require("sequelize");
const sequelize = require("../config/config");

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("Table 생성");
  })
  .catch((error) => {
    console.error("Error creating tables:", error);
  });

const Parking = sequelize.define(
  "Parking",
  {
    parkingName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    parkingType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    roadAddress: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    feeInfo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    latitude: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    longitude: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "parkings",
    timestamps: false,
  }
);

module.exports = Parking;
