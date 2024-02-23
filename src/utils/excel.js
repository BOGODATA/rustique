const ExcelJS = require('exceljs');
async function importDataToUsers(filePath) {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(filePath);

  const worksheet = workbook.getWorksheet(1); // Utilisez la première feuille par défaut

  const data = [];
  worksheet.eachRow({ includeEmpty: false }, (row) => {
    const [nom, prenom, email, lienTicket] = row.values;
    data.push({ nom, prenom, email, lienTicket });
  });

  return data;
}

module.exports = { importDataToUsers };
