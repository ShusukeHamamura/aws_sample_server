const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");

const port = 3001;

const AWS = require("aws-sdk");
const csv = require("csv");
AWS.config.loadFromPath("../config.json");
const dynamoDB = new AWS.DynamoDB();
const documentClient = new AWS.DynamoDB.DocumentClient();

const s3 = new AWS.S3({});

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, "../aws_sample_client/build")));

// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "../aws_sample_client/build/index.html"));
// });

app.post("/api/test", (req, res) => {
  console.log("test");
  let dt;
  const data = [
    {
      car_type: "Car",
      device_id: "jetson_orin",
      date_hour: 7,
      date: "2023-04-25T07:00:03",
      direction: 1,
    },
    {
      car_type: "B-Truck",
      device_id: "jetson_orin",
      date_hour: 7,
      date: "2023-04-25T07:00:05",
      direction: 1,
    },
    {
      car_type: "Car",
      device_id: "jetson_orin",
      date_hour: 7,
      date: "2023-04-25T07:00:07",
      direction: 1,
    },
    {
      car_type: "Car",
      device_id: "jetson_orin",
      date_hour: 8,
      date: "2023-04-25T08:00:09",
      direction: 1,
    },
    {
      car_type: "B-Truck",
      device_id: "jetson_orin",
      date_hour: 8,
      date: "2023-04-25T08:00:10",
      direction: 2,
    },
    {
      car_type: "M-Truck",
      device_id: "jetson_orin",
      date_hour: 8,
      date: "2023-04-25T08:00:11",
      direction: 2,
    },
    {
      car_type: "Car",
      device_id: "jetson_orin",
      date_hour: 8,
      date: "2023-04-25T08:00:12",
      direction: 1,
    },
    {
      car_type: "B-Truck",
      device_id: "jetson_orin",
      date_hour: 8,
      date: "2023-04-25T08:00:16",
      direction: 1,
    },
    {
      car_type: "Car",
      device_id: "jetson_orin",
      date_hour: 8,
      date: "2023-04-25T08:00:20",
      direction: 1,
    },
    {
      car_type: "B-Truck",
      device_id: "jetson_orin",
      date_hour: 8,
      date: "2023-04-25T08:00:22",
      direction: 1,
    },
    {
      car_type: "Car",
      device_id: "jetson_orin",
      date_hour: 8,
      date: "2023-04-25T08:00:26",
      direction: 1,
    },
    {
      car_type: "M-Bus",
      device_id: "jetson_orin",
      date_hour: 8,
      date: "2023-04-25T08:00:30",
      direction: 1,
    },
    {
      car_type: "Car",
      device_id: "jetson_orin",
      date_hour: 8,
      date: "2023-04-25T08:00:31",
      direction: 1,
    },
    {
      car_type: "Car",
      device_id: "jetson_orin",
      date_hour: 8,
      date: "2023-04-25T08:00:34",
      direction: 1,
    },
    {
      car_type: "Car",
      device_id: "jetson_orin",
      date_hour: 8,
      date: "2023-04-25T08:00:37",
      direction: 2,
    },
    {
      car_type: "Car",
      device_id: "jetson_orin",
      date_hour: 8,
      date: "2023-04-25T08:00:38",
      direction: 2,
    },
    {
      car_type: "B-Truck",
      device_id: "jetson_orin",
      date_hour: 8,
      date: "2023-04-25T08:00:39",
      direction: 1,
    },
    {
      car_type: "Car",
      device_id: "jetson_orin",
      date_hour: 8,
      date: "2023-04-25T08:00:41",
      direction: 1,
    },
    {
      car_type: "Car",
      device_id: "jetson_orin",
      date_hour: 8,
      date: "2023-04-25T08:00:45",
      direction: 1,
    },
    {
      car_type: "Car",
      device_id: "jetson_orin",
      date_hour: 8,
      date: "2023-04-25T08:00:47",
      direction: 1,
    },
    {
      car_type: "M-Truck",
      device_id: "jetson_orin",
      date_hour: 8,
      date: "2023-04-25T08:00:49",
      direction: 1,
    },
    {
      car_type: "B-Truck",
      device_id: "jetson_orin",
      date_hour: 8,
      date: "2023-04-25T08:00:53",
      direction: 1,
    },
    {
      car_type: "Car",
      device_id: "jetson_orin",
      date_hour: 8,
      date: "2023-04-25T08:00:55",
      direction: 1,
    },
    {
      car_type: "Car",
      device_id: "jetson_orin",
      date_hour: 8,
      date: "2023-04-25T08:00:57",
      direction: 1,
    },
    {
      car_type: "B-Truck",
      device_id: "jetson_orin",
      date_hour: 8,
      date: "2023-04-25T08:00:58",
      direction: 2,
    },
    {
      car_type: "B-Truck",
      device_id: "jetson_orin",
      date_hour: 8,
      date: "2023-04-25T08:01:00",
      direction: 2,
    },
    {
      car_type: "Car",
      device_id: "jetson_orin",
      date_hour: 8,
      date: "2023-04-25T08:01:01",
      direction: 2,
    },
    {
      car_type: "Car",
      device_id: "jetson_orin",
      date_hour: 8,
      date: "2023-04-25T08:01:02",
      direction: 2,
    },
    {
      car_type: "B-Truck",
      device_id: "jetson_orin",
      date_hour: 8,
      date: "2023-04-25T08:01:03",
      direction: 1,
    },
    {
      car_type: "B-Truck",
      device_id: "jetson_orin",
      date_hour: 8,
      date: "2023-04-25T08:01:06",
      direction: 2,
    },
    {
      car_type: "Car",
      device_id: "jetson_orin",
      date_hour: 9,
      date: "2023-04-25T09:01:08",
      direction: 2,
    },
    {
      car_type: "Car",
      device_id: "jetson_orin",
      date_hour: 9,
      date: "2023-04-25T09:01:09",
      direction: 1,
    },
    {
      car_type: "Car",
      device_id: "jetson_orin",
      date_hour: 10,
      date: "2023-04-25T010:01:11",
      direction: 1,
    },
    {
      car_type: "B-Truck",
      device_id: "jetson_orin",
      date_hour: 10,
      date: "2023-04-25T010:01:12",
      direction: 2,
    },
  ];
  dt_1 = new Date(data[0].date);
  dt_2 = new Date(data[data.length - 1].date);
  res.send(data);
});

app.post("/api", (req, res) => {
  const date = req.body.date;
  const device_id = req.body.device_id;
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
      ":pk_prm": device_id,
      ":sk_prm1": date1,
      ":sk_prm2": date2,
    },
  };
  documentClient.query(params, (err, data) => {
    if (err) console.log("error", JSON.stringify(err, null, 2));
    else {
      console.log(data.Items.length);
      console.log(data.Items);
      res.send(data.Items);
    }
  });
});

app.get("/api", (req, res) => {
  s3.getObject(
    {
      Bucket: "orinplan",
      Key: "sample07_formated.csv",
    },
    function (err, data) {
      if (err) {
        console.log(err, err.stack);
      } else {
        // console.log(data.Body.toString());

        const csv_res = csv.parse(
          data.Body.toString(),
          { columns: true },
          (err, data) => {
            if (err) {
              console.log(err);
            } else {
              const res_data = JSON.stringify(data);
              // console.log(data);
              res.send(data);
            }
          }
        );
      }
    }
  );
});

app.listen(port, () => {
  console.log(`port ${port} でサーバー起動中`);
});
