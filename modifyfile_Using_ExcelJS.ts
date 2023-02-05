import Excel from "exceljs";
var workbook = new Excel.Workbook();

var oldExcelFile = "500_updated1.xlsx";
var newExcelFile = "500_updated1.xlsx";

export const modifyExcelFile = async (
  rowNumber: any,
  columnNumber: any,
  value: any
) => {
  workbook.xlsx.readFile(oldExcelFile).then(async function () {
    var worksheet = workbook.getWorksheet(1);
    var row = worksheet.getRow(rowNumber);
    // const v1 = worksheet.getCell(1, 1).value;
    // console.log(v1);
    row.getCell(columnNumber).value = value; // A5's value set to 5
    row.commit();
    return await workbook.xlsx.writeFile(newExcelFile);
  });
};

// async function testNow() {
//   modifyExcelFile(2, 16, "himanshu");
// }
// testNow();
