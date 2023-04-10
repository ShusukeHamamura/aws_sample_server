const express = require("express");
const app = express();
const cors = require("cors");

const port = 3001;

const AWS = require("aws-sdk");
AWS.config.loadFromPath("./config.json");
const dynamoDB = new AWS.DynamoDB();
const documentClient = new AWS.DynamoDB.DocumentClient();

app.use(cors());

app.get("/", (req, res) => {
  res.send("test");
});

app.get("/api2", (req, res) => {
  res.send([
    {
      car_type: "Car",
      device_id: "jetson_orin_1",
      date: "2023-04-05 20:22:24",
      car_id: 0,
      direction: 0,
    },
    {
      car_type: "Bike",
      device_id: "jetson_orin_1",
      date: "2023-04-05 20:22:29",
      car_id: 1,
      direction: 0,
    },
    {
      car_type: "Car",
      device_id: "jetson_orin_1",
      date: "2023-04-05 20:22:34",
      car_id: 2,
      direction: 0,
    },
    {
      car_type: "Bike",
      device_id: "jetson_orin_1",
      date: "2023-04-05 20:22:39",
      car_id: 3,
      direction: 0,
    },
    {
      car_type: "Car",
      device_id: "jetson_orin_1",
      date: "2023-04-05 20:22:44",
      car_id: 4,
      direction: 0,
    },
    {
      car_type: "Car",
      device_id: "jetson_orin_1",
      date: "2023-04-07 20:22:24",
      car_id: 10,
      direction: 0,
    },
  ]);
});

app.get("/api", (req, res) => {
  const params = {
    TableName: "car_table",
    KeyConditionExpression:
      "#pk_name = :pk_prm AND #sk_name BETWEEN :sk_prm1 AND :sk_prm2",
    ExpressionAttributeNames: {
      "#pk_name": "device_id",
      "#sk_name": "date",
    },
    ExpressionAttributeValues: {
      ":pk_prm": "jetson_orin_1",
      ":sk_prm1": "2023-04-07T15:51:09",
      ":sk_prm2": "2023-04-07T16:00:14",
    },
  };
  documentClient.query(params, (err, data) => {
    if (err) console.log("error", JSON.stringify(err, null, 2));
    else {
      console.log("success!!");
      res.send(data.Items);
    }
  });
});

app.listen(port, () => {
  console.log(`port ${port} でサーバー起動中`);
});
