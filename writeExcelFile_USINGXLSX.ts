import XLSX from "xlsx";
export const writeExcelFile = async (fileName: any) => {
  // Requiring module
  // const reader = require("xlsx");
  let workbook = XLSX.readFile("timetable.xlsx");

  // Reading our test file
  const file = XLSX.readFile("./timetable.xlsx");

  // Convert the XLSX to JSON
  let worksheets = {};
  for (const sheetName of workbook.SheetNames) {
    // Some helper functions in XLSX.utils generate different views of the sheets:
    //     XLSX.utils.sheet_to_csv generates CSV
    //     XLSX.utils.sheet_to_txt generates UTF16 Formatted Text
    //     XLSX.utils.sheet_to_html generates HTML
    //     XLSX.utils.sheet_to_json generates an array of objects
    //     XLSX.utils.sheet_to_formulae generates a list of formulae
    worksheets[sheetName] = XLSX.utils.sheet_to_json(
      workbook.Sheets[sheetName]
    );
  }

  // Sample data set
  let student_data = [
    {
      Student: "Nikhil",
      Age: 22,
      Branch: "ISE",
      Marks: 70,
    },
    {
      Student: "Amitha",
      Age: 21,
      Branch: "EC",
      Marks: 80,
    },
  ];
  let sheet_name_list = workbook.SheetNames;

  console.log(sheet_name_list["Sheet1"]);
  // const ws = XLSX.utils.json_to_sheet(student_data);

  // XLSX.utils.book_append_sheet(file, ws, "Sheet3", true);

  // // Writing to our file
  // XLSX.writeFile(file, "./timetable.xlsx", "Sheet3");

  // Modify the XLSX
  // worksheets.Sheet1.push({
  //   "First Name": "Bob",
  //   "Last Name": "Bob",
  //   Gender: "Male",
  //   Country: "United States",
  //   Age: 35,
  //   Date: "22/09/2020",
  //   Id: 1600,
  //   "New Column": "test",
  // });

  // // Update the XLSX file
  // XLSX.utils.sheet_add_json(workbook.Sheets["Sheet1"], worksheets.Sheet1)
  // XLSX.writeFile(workbook, "file-example.xlsx");

  // Create a new XLSX file
  // const newBook = XLSX.utils.book_new();
  // const newSheet = XLSX.utils.json_to_sheet(worksheets.Sheet1);
  // XLSX.utils.book_append_sheet(newBook, newSheet, "Sheet1");
  // XLSX.writeFile(newBook, "new-book.xlsx");
};

writeExcelFile("");
