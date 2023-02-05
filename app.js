const { create } = require("ipfs-http-client");
const fs = require("fs");
const projectId = "2Hj6AycloAMPmsmSoVHjwEczmWP"; // <---------- your Infura Project ID
const projectSecret = "3440253ba81037785515cbb53cd9b661"; // <---------- your Infura Secret
const auth =
  "Basic " + Buffer.from(projectId + ":" + projectSecret).toString("base64");
async function ipfsClient() {
  const ipfs = await create({
    host: "ipfs.infura.io",
    port: 5001,
    protocol: "https",
    headers: {
      authorization: auth,
    },
  });
  return ipfs;
}

async function saveText() {
  let ipfs = await ipfsClient();
  //   console.log(ipfs);
  let result = await ipfs.add(`welcome ${new Date()}`);
  //   let result = await ipfs.add("Hello");
  console.log(result);
}
// saveText();

async function saveFile() {
  let ipfs = await ipfsClient();

  let data = fs.readFileSync("./package.json");
  let options = {
    warpWithDirectory: false,
    progress: (prog) => console.log(`Saved :${prog}`),
  };
  let result = await ipfs.add(data, options);
  console.log(result);
}
saveFile()

async function getData(hash) {
  let ipfs = await ipfsClient();

  let asyncitr = ipfs.cat(hash);

  for await (const itr of asyncitr) {
    let data = Buffer.from(itr).toString();
    console.log(data);
  }
}

// getData("QmQbA7BrBNkh1bbSgtUYdUJYsHRfvRN6k5vocxHgjadUjr")
