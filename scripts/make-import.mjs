import ExcelJS from "exceljs";

const wb = new ExcelJS.Workbook();
const ws = wb.addWorksheet("Properties");
const teal = "0F766E";
const yellow = "FFF9C4";

ws.mergeCells("A1:F1");
ws.getCell("A1").value = "project.rock — Property Import Sheet";
ws.getCell("A1").font = { name: "Arial", bold: true, size: 13, color: { argb: "FF" + teal } };
ws.getCell("A1").alignment = { horizontal: "center" };

ws.mergeCells("A2:F2");
ws.getCell("A2").value = "Fill in name + w3w for each property. Open what3words app → search address → tap Coordinates for lat/lng. Yellow cells = required.";
ws.getCell("A2").font = { name: "Arial", size: 10, color: { argb: "FF555555" } };
ws.getRow(2).height = 20;

const notes = [
  "Property name (required)",
  "Street address (optional)",
  "what3words e.g. filled.count.soap",
  "Latitude from w3w app (required)",
  "Longitude from w3w app (required)",
  "Notes (optional)",
];
notes.forEach((n, i) => {
  const c = ws.getCell(3, i + 1);
  c.value = n;
  c.font = { name: "Arial", italic: true, size: 9, color: { argb: "FF888888" } };
});

const headers = ["name", "address", "w3w", "lat", "lng", "notes"];
const widths = [30, 40, 25, 12, 12, 30];
headers.forEach((h, i) => {
  const c = ws.getCell(4, i + 1);
  c.value = h;
  c.font = { name: "Arial", bold: true, size: 11, color: { argb: "FFFFFFFF" } };
  c.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FF" + teal } };
  c.alignment = { horizontal: "center" };
  c.border = { top: { style: "thin" }, bottom: { style: "thin" }, left: { style: "thin" }, right: { style: "thin" } };
  ws.getColumn(i + 1).width = widths[i];
});
ws.getRow(4).height = 22;

for (let r = 5; r <= 54; r++) {
  for (let c = 1; c <= 6; c++) {
    const cell = ws.getCell(r, c);
    cell.font = { name: "Arial", size: 11 };
    cell.border = { top: { style: "thin" }, bottom: { style: "thin" }, left: { style: "thin" }, right: { style: "thin" } };
    if (c === 4 || c === 5)
      cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FF" + yellow } };
  }
  ws.getRow(r).height = 20;
}
ws.views = [{ state: "frozen", ySplit: 4 }];

const ws2 = wb.addWorksheet("Units (pre-seeded)");
ws2.getCell("A1").value = "These 4 units are pre-seeded — do not edit";
ws2.getCell("A1").font = { name: "Arial", bold: true, color: { argb: "FF555555" } };
["name", "kind", "address", "lat", "lng"].forEach((h, i) => {
  const c = ws2.getCell(2, i + 1);
  c.value = h;
  c.font = { name: "Arial", bold: true, color: { argb: "FFFFFFFF" } };
  c.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FF" + teal } };
  c.border = { top: { style: "thin" }, bottom: { style: "thin" }, left: { style: "thin" }, right: { style: "thin" } };
  ws2.getColumn(i + 1).width = 25;
});
[
  ["Castletown", "hub", "Castletown, Isle of Man", 54.0757, -4.6558],
  ["Douglas - White Ho", "stock", "Douglas, Isle of Man", 54.1509, -4.4694],
  ["Peel - Ballacallin", "stock", "Peel, Isle of Man", 54.2244, -4.694],
  ["Ramsey", "stock", "Ramsey, Isle of Man", 54.3232, -4.3849],
].forEach((u, ri) => {
  u.forEach((val, ci) => {
    const c = ws2.getCell(ri + 3, ci + 1);
    c.value = val;
    c.font = { name: "Arial", size: 11 };
    c.border = { top: { style: "thin" }, bottom: { style: "thin" }, left: { style: "thin" }, right: { style: "thin" } };
  });
});

await wb.xlsx.writeFile("C:/Users/juank/OneDrive/Desktop/property_import.xlsx");
console.log("Created: C:/Users/juank/Desktop/property_import.xlsx");
