import { create } from "ipfs-http-client";
import fs from "fs";
import path from "path";

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

export const saveIPFSFile = async (localfile: any) => {
  let ipfs = await ipfsClient();
  let data = fs.readFileSync(path.join(__dirname, "images", localfile));
  let options = {
    warpWithDirectory: false,
    progress: (prog: any) => console.log(`Saved :${prog}`),
  };
  console.log("Before IPFS");
//   let result = await ipfs.add(data, options);
  let result = await ipfs.add("Hello");
  console.log("After IPFS",result);
  return result;
};


async function saveText() {
  let ipfs = await ipfsClient();
    // console.log(ipfs);
  let result = await ipfs.add(`welcome ${new Date()}`);
  //   let result = await ipfs.add("Hello");
  console.log(result);
}
// saveText();

saveIPFSFile("3.png");
