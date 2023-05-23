const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const data = require("./SampleData.json");

const port = 3001;

const AWS = require("aws-sdk");
AWS.config.loadFromPath("../config.json");
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
  console.log(data);
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
      // console.log(data.Items);
      res.send(data.Items);
    }
  });
});

app.post("/api2", (req, res) => {
  const date = req.body.date;
  console.log("DownloadCSV");
  params = { Bucket: "orinplan", Key: `${date}_natural_data.csv` };
  try {
    s3.getSignedUrl("getObject", params, (err, url) => {
      if (err) console.log(err);
      else res.send(url);
    });
  } catch (error) {
    if (error.code === "NotFound") console.log("NoTFound");
    return;
  }
});
app.post("/api3", (req, res) => {
  const date = req.body.date;
  console.log("DownloadCSV");
  params = { Bucket: "orinplan", Key: `${date}_format_data.csv` };
  try {
    s3.getSignedUrl("getObject", params, (err, url) => {
      if (err) console.log(err);
      else res.send(url);
    });
  } catch (error) {
    if (error.code === "NotFound") console.log("NoTFound");
    return;
  }
});

app.listen(port, () => {
  console.log(`port ${port} でサーバー起動中`);
});
