import XLSX from "xlsx";
export const readExcelFile = async (fileName: any) => {
  let workbook = XLSX.readFile("timetable.xlsx");
  let sheet_name_list = workbook.SheetNames;
  console.log(sheet_name_list);
  let xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
  return {
    sheetLists: sheet_name_list,
    worksheetDataInJSON: xlData,
  };
};
