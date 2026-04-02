/*
  Google Apps Script (Web App) -> ghi lead vào Google Sheets.
  Cột tiếng Việt, không UTM.

  1) SHEET_ID, SHEET_NAME
  2) Deploy Web App: Execute as Me, Who has access: Anyone
  3) NEXT_PUBLIC_SHEETS_WEB_APP_URL = URL /exec
*/

const SHEET_ID = "PUT_YOUR_SHEET_ID_HERE";
const SHEET_NAME = "Leads";

function parseFormParams_(e) {
  if (e && e.parameter && Object.keys(e.parameter).length > 0) {
    return e.parameter;
  }
  var type = e && e.postData ? String(e.postData.type || "") : "";
  var isForm =
    type.indexOf("application/x-www-form-urlencoded") === 0 || type === "";
  if (e && e.postData && e.postData.contents && isForm) {
    var out = {};
    String(e.postData.contents)
      .split("&")
      .forEach(function (pair) {
        var i = pair.indexOf("=");
        if (i < 0) return;
        var k = decodeURIComponent(pair.slice(0, i).replace(/\+/g, " "));
        var v = decodeURIComponent(pair.slice(i + 1).replace(/\+/g, " "));
        out[k] = v;
      });
    return out;
  }
  return {};
}

function doGet() {
  return ContentService.createTextOutput(
    JSON.stringify({ ok: true, message: "POST / doPost" })
  ).setMimeType(ContentService.MimeType.JSON);
}

function ensureHeader_(sheet, headers) {
  var firstRow = sheet.getRange(1, 1, 1, headers.length).getValues()[0];
  var hasHeader =
    firstRow && firstRow.some(function (c) {
      return String(c || "").trim().length > 0;
    });
  if (hasHeader) return;
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
}

function doPost(e) {
  try {
    if (!SHEET_ID || SHEET_ID === "PUT_YOUR_SHEET_ID_HERE") {
      return ContentService.createTextOutput(
        JSON.stringify({
          ok: false,
          error: "Chưa cấu hình SHEET_ID",
        })
      ).setMimeType(ContentService.MimeType.JSON);
    }

    var params = parseFormParams_(e);

    var payload = {
      timestamp: params.timestamp || new Date().toISOString(),
      name: params.name || "",
      phone: params.phone || "",
      constructionAddress: params.constructionAddress || "",
      source: params.source || "",
    };

    var ss = SpreadsheetApp.openById(SHEET_ID);
    var sheet = ss.getSheetByName(SHEET_NAME) || ss.getSheets()[0];

    var headers = [
      "Thời gian",
      "Họ và tên",
      "Số điện thoại",
      "Địa chỉ thi công",
      "Nguồn",
      "Dữ liệu gốc",
    ];

    ensureHeader_(sheet, headers);

    var rawData = JSON.stringify({
      timestamp: payload.timestamp,
      name: payload.name,
      phone: payload.phone,
      constructionAddress: payload.constructionAddress,
      source: payload.source,
    });

    sheet.appendRow([
      payload.timestamp,
      payload.name,
      payload.phone,
      payload.constructionAddress,
      payload.source,
      rawData,
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
