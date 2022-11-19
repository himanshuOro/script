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
app.use(
  cors({
    origin: "*",
  })
);
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

const sendFaucet = async (params) => {
  console.log(params.length, "bwjdkwe");
  const web3 = new Web3("https://rpc.ankr.com/polygon");
  const contractInstance = new web3.eth.Contract(
    contract.abi,
    contract.address
  );

  console.log("------------------------CHECK1");

  let myAddress = "0x828954676f2634D404251f05e4F619FF83f7EceB";
  // let count = await web3.eth.getTransactionCount(myAddress); // for deploying issue
  var privateKey =
    "4c512e62c0a18968ceee638f8100ee842664567561aa60a676433a9e163c5e6e";

  // let amount = web3.utils.toHex(web3.utils.toWei("2")); //1 DEMO Token
  for (i = 0; i < params.length; i++) {
    const gasLimit = await contractInstance.methods
      .addNewDapp(
        params[i].name,
        params[i].admin,
        params[i].icon,
        params[i].desc,
        params[i].long_desc,
        params[i].ss,
        params[i].cat,
        params[i].tag
      )
      .estimateGas({ from: myAddress });

    const bufferedGasLimit = Math.round(
      Number(gasLimit) + Number(gasLimit) * Number(0.2)
    );

    const gasPrice = await web3.eth.getGasPrice();

    console.log("------------------------CHECK2", i);
    const tx = {
      from: myAddress,
      gasPrice: gasPrice,
      gasLimit: bufferedGasLimit,
      to: contract.address,
      value: "0x0",
      data: contractInstance.methods
        .addNewDapp(
          params[i].name,
          params[i].admin,
          params[i].icon,
          params[i].desc,
          params[i].long_desc,
          params[i].ss,
          params[i].cat,
          params[i].tag
        )
        .encodeABI(),
      //    nonce: web3.eth.getTransactionCount(contract.address)
    };
    const signedTx = await web3.eth.accounts.signTransaction(tx, privateKey);
    console.log(signedTx.transactionHash);
    let x = signedTx.rawTransaction || "";
    const transaction = await web3.eth.sendSignedTransaction(x);
    console.log(transaction);
    await new Promise((resolve) => setTimeout(resolve, 5000)); // 10 sec
    console.log("------------------------CHECK", i);
  }
};
