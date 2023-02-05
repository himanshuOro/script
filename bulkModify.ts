import Excel from "exceljs";
import { get_IPFSURL_OF_REMOTE_IMAGE } from "./getIPFSURL_From_Remote_Image";
import { modifyExcelFile } from "./modifyfile_Using_ExcelJS";
var workbook = new Excel.Workbook();

// var oldExcelFile = "500_daps_original.xlsx";
var newExcelFile = "500_updated.xlsx";

// function isValidURL(string: any) {
//   var res = String.match(
//     /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
//   );
//   return res !== null;
// }
function isValidURL(string: any) {
  let givenURL;
  try {
    givenURL = new URL(string);
  } catch (error) {
    // console.log("error is", error);
    return false;
  }
  return true;
}

// export const modifyExcelFile = async (
//   rowNumber: any,
//   columnNumber: any,
//   value: any
// ) => {};

async function runScriptOnce(from: any, to: any, fromROW: any, toROW: any) {
  await workbook.xlsx.readFile(newExcelFile);
  //  .then(function () {
  var worksheet = workbook.getWorksheet(1);

  for (let i = fromROW; i <= toROW; i++) {
    try {
      // STEP 1 (STARTED): Read CELL AND VALIDATING IF THAT IS A VALID URL

      var cellValue = worksheet.getCell(i, from).value;
      if (worksheet.getCell(i, from).isHyperlink) {
        cellValue = worksheet.getCell(i, from).hyperlink;
      }
      if (!isValidURL(cellValue)) {
        cellValue = null;
        console.log(cellValue, i, "NOT VALID");
      }

      // STEP 1 (COMPLETED) : Read CELL AND VALIDATING IF THAT IS A VALID URL
      // STEP 2 (STARTED) : GETTING IPFS URL OF THE IMAGE IN CASE WE HAVE VALID IMAGE URL
      let CID = "";
      if (cellValue !== null) {
        CID = await get_IPFSURL_OF_REMOTE_IMAGE(cellValue);
      }
      // STEP 2 (COMPLETED) : GETTING IPFS URL OF THE IMAGE
      // STEP 3 : WRITE DATA NOW on EXCEL SHEET
      await modifyExcelFile(i, to, CID);
      console.log(i, to, CID);
      // STEP 3 : WRITE DATA NOW on EXCEL SHEET
    } catch (err) {
      console.log(i, err);
      continue;
    }
  }
  //   });

  // STEP 2 : if read successfully getIPFS URL
}



// runScriptOnce(fromcolumn,toColumn,fromRow,toROW)
runScriptOnce(11, 27, 1, 5);
