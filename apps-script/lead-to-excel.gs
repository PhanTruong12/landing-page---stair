/*
  Google Apps Script (Web App) -> ghi dữ liệu form vào Google Sheets.

  Cách dùng:
  1) Tạo Google Sheet và copy SHEET_ID, SHEET_NAME dưới đây.
  2) Trong Apps Script, tạo Web App (Deploy -> New deployment)
     - Execute as: Me
     - Who has access: Anyone
  3) Lấy URL Web App và gán vào frontend env: NEXT_PUBLIC_SHEETS_WEB_APP_URL
*/

const SHEET_ID = "PUT_YOUR_SHEET_ID_HERE";
const SHEET_NAME = "Leads";

function doGet() {
  return ContentService.createTextOutput(
    JSON.stringify({ ok: true, message: "POST / doPost available" })
  ).setMimeType(ContentService.MimeType.JSON);
}

function ensureHeader_(sheet, headers) {
  const firstRow = sheet.getRange(1, 1, 1, headers.length).getValues()[0];
  const hasHeader = firstRow && firstRow.some((c) => String(c || "").trim().length > 0);
  if (hasHeader) return;
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
}

function doPost(e) {
  try {
    const params = e && e.parameter ? e.parameter : {};

    const payload = {
      timestamp: params.timestamp || new Date().toISOString(),
      name: params.name || "",
      phone: params.phone || "",
      constructionAddress: params.constructionAddress || "",
      source: params.source || "",
      utm_source: params.utm_source || "",
      utm_medium: params.utm_medium || "",
      utm_campaign: params.utm_campaign || "",
    };

    const ss = SpreadsheetApp.openById(SHEET_ID);
    const sheet =
      ss.getSheetByName(SHEET_NAME) || ss.getSheets()[0];

    const headers = [
      "Timestamp",
      "Name",
      "Phone",
      "ConstructionAddress",
      "Source",
      "utm_source",
      "utm_medium",
      "utm_campaign",
    ];

    ensureHeader_(sheet, headers);

    sheet.appendRow([
      payload.timestamp,
      payload.name,
      payload.phone,
      payload.constructionAddress,
      payload.source,
      payload.utm_source,
      payload.utm_medium,
      payload.utm_campaign,
    ]);

    return ContentService.createTextOutput(
      JSON.stringify({ ok: true })
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(
      JSON.stringify({ ok: false, error: String(err) })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

