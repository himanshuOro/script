import https from "https";
import fs from "fs";
import path from "path";

export const downloadFile = async (url: any, successCall: any) => {
  // Getting The FileName with Extension
  const filename = path.basename(url);
  let fileExtension = path.extname(url);
  fileExtension = fileExtension === "" ? ".png" : "";
  const fullFileName = "images/" + filename + fileExtension;

  // Downloading The Image File
  const req =  https.get(url, async function (res) {
    const fileStream =   fs.createWriteStream(fullFileName);
    res.pipe(fileStream);

    // On Error Handle Accordingly
    fileStream.on("error", function (err) {
      console.log("Error writing to the stream.");
      console.log(err);
    });

    // On Close Handle Accordingly
    fileStream.on("close", function () {
      successCall(filename + fileExtension);
    });

    // On Finish Handle Accordingly
    fileStream.on("finish", function () {
      fileStream.close();
    });
  });

  req.on("error", function (err) {
    console.log(err);
  });
};

// ## REFERENCE :: https://www.youtube.com/watch?v=ogF_WMzUqok
