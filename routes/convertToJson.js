const xlsx = require("xlsx");
const fs = require("fs");

function convertToJson() {
    const file = xlsx.readFile("./dummydata.xlsx");
    const sheets = file.SheetNames;
    const data = [];
    sheets.forEach((sheet) => {
        const sheetData = xlsx.utils.sheet_to_json(file.Sheets[sheet]);
        data.push({ [sheet]: sheetData });
    });
    fs.writeFileSync("./data.json", JSON.stringify(data));
    return data;
}

module.exports = convertToJson;