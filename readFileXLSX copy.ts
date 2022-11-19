const express = require("express");
const app = express();
const port = process.env.port || 3000;
const bodyParser = require("body-parser");
const fs = require("fs");
const cors = require("cors");
const reader = require("xlsx");
const { resourceLimits } = require("worker_threads");
const { contract } = require("./constant");
const { ethers } = require("ethers");
const Web3 = require("web3");

app.use("./publicfiles", express.static(__dirname + "/publicfiles"));

app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 2 })
);

let params;
app.get("/readexcelfile", (req, res) => {
  // let fileName = req.query.filename;
  let fileName = "timetable";
  // Reading our test file

  let data = [];
  try {
    const file = reader.readFile("publicfiles/" + fileName + ".xlsx");
    const sheets = file.SheetNames;

    for (let i = 0; i < sheets.length; i++) {
      const temp = reader.utils.sheet_to_json(file.Sheets[file.SheetNames[i]]);
      temp.forEach((res) => {
        data.push(res);
      });
    }
    res.send(data);
    // console.log(data)
    params = data.map((item) => {
      // console.log(item.Category)
      // console.log(item.App_name,item.App_admin)
      let name = item.App_name;
      let admin = item.App_admin;
      let icon = item.App_icon;
      let desc = item.Short_description;
      let long_desc = item.Long_Description;
      let ss = [];
      ss.push(item.SS);
      let cat = [];
      cat.push(item.Category);
      let tag = [];
      tag.push(item.Tags);
      return { name, admin, icon, desc, long_desc, ss, cat, tag };
    });
    console.log(params);
    console.log(params.length);

    const caller = async function () {
      let response = await sendFaucet(params);
    };
  } catch (err) {
    res.send(err);
  }
});

app.listen(port, function () {
  const datetime = new Date();
  const message =
    "Server running on Port:- " + port + " Started at :- " + datetime;
  console.log(message);
});


