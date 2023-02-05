import { downloadFile } from "./downloadImageFileFromRemote";
import { saveIPFSFile } from "./UploadIPFSFIle";

import path from "path";

async function download_Remote_File(filePath: any) {
  // STEP 1 : Downloading Image
  let f1 = await downloadFile(filePath, async function (filename: any) {
    // let getIPFSURL = await upoadFileToIpfsFunctionAndGetURL(filename);
    console.log("##>" + filename + " is Uploaded Successfully!");
  });

  // Step 2 : Getting FileName Of Image
  const filename = path.basename(filePath);
  let fileExtension = path.extname(filePath);
  fileExtension = fileExtension === "" ? ".png" : "";
  const fullFileName = "images/" + filename + fileExtension;

  return filename + fileExtension;
}

async function upload_Local_File_To_IPFS(filename: any) {
  let getUploadDetails = await saveIPFSFile(filename);
  // console.log("UploadPath", getUploadDetails.path);
  let IPFSFILECID = getUploadDetails.path;
  // console.log("IPFSFILEURL", IPFSFILEURL);
  return IPFSFILECID;
}

// downloadFileFunction(
//   "https://dashboard-assets.dappradar.com/document/7069/biswap-dapp-defi-bsc-image1_10a7fb06483c855647a7900296ed2631.png"
// );

export const get_IPFSURL_OF_REMOTE_IMAGE = async (remoteFilePath: any) => {
  // DOWNLOADING IMAGE ....
  let localfileName = await download_Remote_File(remoteFilePath);
  console.log("DOWNLOADING COMPLETED", localfileName);

  await new Promise((resolve) => setTimeout(resolve, 5000)); // 10 sec

  // UPLOADING IMAGE ....
  let getCID = await upload_Local_File_To_IPFS(localfileName);
  // let ipfsfileName = await upload_Local_File_To_IPFS("biswap-dapp-defi-bsc-image1_10a7fb06483c855647a7900296ed2631.png");
  // console.log("UPLOADING COMPLETED");
  // console.log("getIPFSURL", getCID);
  return getCID;
};

// get_IPFSURL_OF_REMOTE_IMAGE(
//   "https://dashboard-assets.dappradar.com/document/14720/rubicon-dapp-defi-optimism-logo-50x50_3ad5f0208c988b67b40cff631a83372b.png"
// );
