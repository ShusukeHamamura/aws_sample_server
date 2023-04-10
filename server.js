const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

const port = 3001;

const AWS = require("aws-sdk");
AWS.config.loadFromPath("./config.json");
const dynamoDB = new AWS.DynamoDB();
const documentClient = new AWS.DynamoDB.DocumentClient();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("test");
});

app.post("/api/test", (req, res) => {
  res.send([
    {
      car_type: "Car",
      device_id: "jetson_orin_1",
      date: "2023-04-07T15:58:13",
      car_id: 0,
      direction: 0,
    },
    {
      car_type: "Car",
      device_id: "jetson_orin_1",
      date: "2023-04-07T15:58:18",
      car_id: 1,
      direction: 0,
    },
    {
      car_type: "Bike",
      device_id: "jetson_orin_1",
      date: "2023-04-07T15:58:23",
      car_id: 2,
      direction: 0,
    },
    {
      car_type: "Car",
      device_id: "jetson_orin_1",
      date: "2023-04-07T15:58:28",
      car_id: 3,
      direction: 1,
    },
    {
      car_type: "Bike",
      device_id: "jetson_orin_1",
      date: "2023-04-07T15:58:33",
      car_id: 4,
      direction: 1,
    },
    {
      car_type: "Bike",
      device_id: "jetson_orin_1",
      date: "2023-04-07T15:58:33",
      car_id: 5,
      direction: 1,
    },
  ]);
});

app.post("/api", (req, res) => {
  const date = req.body.date;
  const date1 = `${date}T00:00:00`;
  const date2 = `${date}T23:59:59`;
  console.log(date1);
  console.log(date2);
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
      ":sk_prm1": date1,
      ":sk_prm2": date2,
    },
  };
  documentClient.query(params, (err, data) => {
    if (err) console.log("error", JSON.stringify(err, null, 2));
    else {
      console.log(data.Items);
      res.send(data.Items);
    }
  });
});

app.listen(port, () => {
  console.log(`port ${port} でサーバー起動中`);
});
