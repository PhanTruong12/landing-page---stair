/**
 * Một Web App — 2 nguồn form (tham số `target`) — 2 tab trong cùng Spreadsheet.
 *
 * - target=website (mặc định nếu không gửi): tab Website — cột Họ tên, Điện thoại, Email, Nội dung
 * - target=stairs: tab LandingPage — cột báo giá đá cầu thang (professional)
 *
 * Deploy: một project, một deployment /exec. Site cầu thang: gửi target=stairs (env NEXT_PUBLIC_SHEETS_LEAD_TARGET).
 * Site form cũ: không gửi target hoặc target=website.
 *
 * Sửa getRange 1 dòng soạn sẵn: dùng (nextRow,1,nextRow,5) thay vì (nextRow,1,1,5).
 */

// ——— Chung: cùng file Spreadsheet ———
var UNIFIED_SPREADSHEET_ID = "1QqhwoROAo9YoTFpWqUNVQrvgvEsGHtUJXYnpws5gCAA";

// ——— Website (form email / liên hệ) ———
var WEBSITE_SHEET_NAME = "Website";

/** Tiêu đề cột (hiển thị trên Sheet — tiếng Việt) */
var WEBSITE_HEADER = [
  "Thời gian",
  "Họ tên",
  "Điện thoại",
  "Email",
  "Nội dung",
];

var COL_DATE = 1;
var COL_NAME = 2;
var COL_PHONE = 3;
var COL_EMAIL = 4;
var COL_MESSAGE = 5;

var COLOR_HEADER_BG = "#1565c0";
var COLOR_HEADER_FG = "#ffffff";
var COLOR_BORDER = "#cfd8dc";
var COLOR_ROW_EVEN = "#f5f9fc";
var COLOR_ROW_ODD = "#ffffff";
var COLOR_ACCENT = "#e3f2fd";

// ——— Stairs / Landing báo giá ———
var STAIRS_SHEET_NAME = "LandingPage";

var STAIRS_HEADERS = [
  "Thời gian",
  "Họ và tên",
  "Số điện thoại",
  "Địa chỉ thi công",
  "Nguồn",
  "Dữ liệu gốc",
];

var STAIRS_THEME = {
  headerBg: "#1f1c18",
  headerFg: "#faf8f5",
  borderLight: "#e0d8ce",
  zebraA: "#ffffff",
  zebraB: "#f6f3ee",
  rawMuted: "#5c534a",
};

var PROP_STAIRS_SETUP = "LEAD_SHEET_PREMIUM_V4";

// ——— Router ———

function parseFormParams_(e) {
  if (e && e.parameter && Object.keys(e.parameter).length > 0) {
    var trimmed = {};
    Object.keys(e.parameter).forEach(function (k) {
      var v = e.parameter[k];
      trimmed[k] = v == null ? "" : String(v).trim();
    });
    return trimmed;
  }
  var type = e && e.postData && e.postData.type ? String(e.postData.type) : "";
  var isForm =
    type.indexOf("application/x-www-form-urlencoded") === 0 || type === "";
  if (!e || !e.postData || !e.postData.contents || !isForm) {
    return {};
  }
  var out = {};
  String(e.postData.contents)
    .split("&")
    .forEach(function (pair) {
      var i = pair.indexOf("=");
      if (i < 0) return;
      var k = decodeURIComponent(pair.slice(0, i).replace(/\+/g, " "));
      var v = decodeURIComponent(pair.slice(i + 1).replace(/\+/g, " "));
      out[k] = v.trim();
    });
  return out;
}

function jsonOut_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON
  );
}

function doGet() {
  return jsonOut_({
    ok: true,
    message:
      "POST form-urlencoded. target=website (mặc định) hoặc target=stairs — 2 tab khác nhau.",
    version: "4.0-router",
  });
}

function doPost(e) {
  try {
    if (!UNIFIED_SPREADSHEET_ID || UNIFIED_SPREADSHEET_ID.indexOf("PUT_") === 0) {
      throw new Error("Chưa cấu hình UNIFIED_SPREADSHEET_ID");
    }
    var params = parseFormParams_(e);
    var raw = String(params.target || "website")
      .toLowerCase()
      .trim();
    if (raw === "stairs" || raw === "stair" || raw === "landing" || raw === "granite") {
      return handleStairsPost_(params);
    }
    return handleWebsitePost_(params);
  } catch (err) {
    return jsonOut_({ ok: false, error: "Lỗi server", message: String(err.message || err) });
  }
}

// ——— Website handler ———

function safeStr_(v) {
  if (v == null) return "";
  return String(v).trim();
}

function handleWebsitePost_(p) {
  try {
    var name = safeStr_(p.name);
    var phone = safeStr_(p.phone);
    var email = safeStr_(p.email);
    var message = safeStr_(p.message);

    if (!name || !phone) {
      return jsonOut_({
        success: false,
        error: "Missing required fields: name/phone",
      });
    }

    var ss = SpreadsheetApp.openById(UNIFIED_SPREADSHEET_ID);
    var sheet = ss.getSheetByName(WEBSITE_SHEET_NAME);
    if (!sheet) sheet = ss.insertSheet(WEBSITE_SHEET_NAME);

    if (sheet.getLastRow() === 0) {
      sheet.getRange(1, 1, 1, WEBSITE_HEADER.length).setValues([WEBSITE_HEADER]);
      styleLeadsTable_(sheet, WEBSITE_HEADER.length);
    }

    var nextRow = sheet.getLastRow() + 1;

    // getRange(row, col, numRows, numCols) — KHÔNG phải (startRow, startCol, endRow, endCol)
    sheet.getRange(nextRow, 1, 1, 5).setValues([
      [new Date(), name, "", email, message],
    ]);

    var phoneCell = sheet.getRange(nextRow, COL_PHONE);
    phoneCell.setNumberFormat("@");
    phoneCell.setValue(phone);

    formatLeadsDataRow_(sheet, nextRow, WEBSITE_HEADER.length);

    return jsonOut_({ success: true });
  } catch (err) {
    return jsonOut_({ success: false, error: String(err) });
  }
}

function styleLeadsTable_(sheet, numCols) {
  var maxRows = sheet.getMaxRows();
  var fullGrid = sheet.getRange(1, 1, maxRows, numCols);

  sheet.setFrozenRows(1);

  var headerRange = sheet.getRange(1, 1, 1, numCols);
  headerRange
    .setFontWeight("bold")
    .setFontSize(11)
    .setFontFamily("Roboto")
    .setBackground(COLOR_HEADER_BG)
    .setFontColor(COLOR_HEADER_FG)
    .setHorizontalAlignment("center")
    .setVerticalAlignment("middle")
    .setWrap(false);
  headerRange.setBorder(
    true,
    true,
    true,
    true,
    null,
    null,
    COLOR_HEADER_BG,
    SpreadsheetApp.BorderStyle.SOLID_MEDIUM
  );

  sheet.setRowHeight(1, 36);

  sheet.setColumnWidth(COL_DATE, 168);
  sheet.setColumnWidth(COL_NAME, 200);
  sheet.setColumnWidth(COL_PHONE, 132);
  sheet.setColumnWidth(COL_EMAIL, 240);
  sheet.setColumnWidth(COL_MESSAGE, 380);

  var bodyPreset = sheet.getRange(2, 1, maxRows, numCols);
  bodyPreset.setVerticalAlignment("top");
  bodyPreset.setFontSize(10);
  bodyPreset.setFontFamily("Roboto");

  thinBorderGrid_(fullGrid, COLOR_BORDER);

  try {
    var filterRange = sheet.getRange(1, 1, 1, numCols);
    if (!sheet.getFilter()) {
      filterRange.createFilter();
    }
  } catch (e) {}

  sheet.getRange(2, COL_DATE, maxRows, COL_DATE).setNumberFormat("dd/mm/yyyy hh:mm:ss");
  sheet.getRange(2, COL_PHONE, maxRows, COL_PHONE).setNumberFormat("@");
}

function thinBorderGrid_(range, color) {
  range.setBorder(
    true,
    true,
    true,
    true,
    true,
    true,
    color,
    SpreadsheetApp.BorderStyle.SOLID
  );
}

function formatLeadsDataRow_(sheet, row, numCols) {
  var rowRange = sheet.getRange(row, 1, 1, numCols);
  var zebra = row % 2 === 0 ? COLOR_ROW_EVEN : COLOR_ROW_ODD;

  rowRange.setBackground(zebra);
  thinBorderGrid_(rowRange, COLOR_BORDER);

  sheet
    .getRange(row, COL_DATE)
    .setNumberFormat("dd/mm/yyyy hh:mm:ss")
    .setHorizontalAlignment("center")
    .setBackground(zebra);

  sheet.getRange(row, COL_NAME).setHorizontalAlignment("left").setWrap(false);

  sheet
    .getRange(row, COL_PHONE)
    .setNumberFormat("@")
    .setHorizontalAlignment("center")
    .setBackground(COLOR_ACCENT);

  sheet.getRange(row, COL_EMAIL).setHorizontalAlignment("left").setWrap(false);

  sheet
    .getRange(row, COL_MESSAGE)
    .setWrap(true)
    .setHorizontalAlignment("left");

  var msgLen = String(sheet.getRange(row, COL_MESSAGE).getValue() || "").length;
  sheet.setRowHeight(row, msgLen > 120 ? 72 : msgLen > 60 ? 56 : 28);
}

// ——— Stairs handler (premium table) ———

function getStairsSheetOrThrow_(ss) {
  var sheet = ss.getSheetByName(STAIRS_SHEET_NAME);
  if (sheet) return sheet;
  var names = ss.getSheets().map(function (s) {
    return s.getName();
  });
  throw new Error(
    'Không tìm thấy tab "' +
      STAIRS_SHEET_NAME +
      '". Tạo tab hoặc sửa STAIRS_SHEET_NAME. Có: ' +
      names.join(", ")
  );
}

function setupStairsTableOnce_(sheet) {
  var props = PropertiesService.getScriptProperties();
  var done = props.getProperty(PROP_STAIRS_SETUP);

  var cols = STAIRS_HEADERS.length;
  var headerRange = sheet.getRange(1, 1, 1, cols);
  var firstRow = headerRange.getValues()[0];
  var hasHeader =
    firstRow &&
    firstRow.some(function (cell) {
      return String(cell || "").trim().length > 0;
    });
  if (!hasHeader) {
    headerRange.setValues([STAIRS_HEADERS]);
  }

  if (done === "1") {
    return;
  }

  sheet.setRowHeight(1, 40);
  headerRange
    .setFontWeight("bold")
    .setFontSize(11)
    .setBackground(STAIRS_THEME.headerBg)
    .setFontColor(STAIRS_THEME.headerFg)
    .setVerticalAlignment("middle");
  headerRange.setHorizontalAlignment("center");
  sheet.getRange(1, 2).setHorizontalAlignment("left");
  sheet.getRange(1, 4).setHorizontalAlignment("left");
  sheet.getRange(1, 6).setHorizontalAlignment("left");

  headerRange.setBorder(
    true,
    true,
    true,
    true,
    false,
    false,
    STAIRS_THEME.borderLight,
    SpreadsheetApp.BorderStyle.SOLID
  );

  sheet.setFrozenRows(1);

  var widths = [175, 200, 140, 300, 130, 380];
  widths.forEach(function (w, i) {
    sheet.setColumnWidth(i + 1, w);
  });

  var maxVisualRows = Math.min(sheet.getMaxRows(), 2500);
  var bodyRange = sheet.getRange(2, 1, maxVisualRows, cols);
  var rules = [];
  rules.push(
    SpreadsheetApp.newConditionalFormatRule()
      .whenFormulaSatisfied("=AND(ROW()>1,MOD(ROW(),2)=0)")
      .setBackground(STAIRS_THEME.zebraA)
      .setRanges([bodyRange])
      .build()
  );
  rules.push(
    SpreadsheetApp.newConditionalFormatRule()
      .whenFormulaSatisfied("=AND(ROW()>1,MOD(ROW(),2)=1)")
      .setBackground(STAIRS_THEME.zebraB)
      .setRanges([bodyRange])
      .build()
  );
  sheet.setConditionalFormatRules(rules);

  bodyRange.setBorder(
    true,
    true,
    true,
    true,
    true,
    true,
    STAIRS_THEME.borderLight,
    SpreadsheetApp.BorderStyle.SOLID
  );

  sheet.getRange(2, 1, maxVisualRows, 1).setNumberFormat("dd/mm/yyyy hh:mm:ss");
  sheet.getRange(2, 3, maxVisualRows, 3).setNumberFormat("@");
  sheet.getRange(2, 4, maxVisualRows, 4).setWrap(true);
  sheet.getRange(2, 6, maxVisualRows, 6).setWrap(true);

  var lr = sheet.getLastRow();
  if (lr >= 1 && !sheet.getFilter()) {
    try {
      sheet.getRange(1, 1, Math.max(lr, 2), cols).createFilter();
    } catch (ignore) {}
  }

  props.setProperty(PROP_STAIRS_SETUP, "1");
}

function formatStairsRow_(sheet, row) {
  var cols = STAIRS_HEADERS.length;
  sheet.getRange(row, 1, 1, cols).setVerticalAlignment("middle");
  sheet.getRange(row, 1).setNumberFormat("dd/mm/yyyy hh:mm:ss");
  sheet.getRange(row, 2).setHorizontalAlignment("left");
  sheet.getRange(row, 3).setHorizontalAlignment("center").setNumberFormat("@");
  sheet.getRange(row, 4).setHorizontalAlignment("left").setWrap(true);
  sheet.getRange(row, 5).setHorizontalAlignment("center");
  sheet
    .getRange(row, 6)
    .setHorizontalAlignment("left")
    .setWrap(true)
    .setFontSize(9)
    .setFontColor(STAIRS_THEME.rawMuted);
}

function validateStairs_(payload) {
  var errors = [];
  if (!payload.name || payload.name.trim() === "") {
    errors.push("Tên không được để trống");
  }
  var digits = String(payload.phone || "").replace(/\D/g, "");
  if (!digits || digits.length < 8 || digits.length > 15) {
    errors.push("Số điện thoại không hợp lệ");
  }
  return errors;
}

function handleStairsPost_(params) {
  var t0 = new Date();
  try {
    var payload = {
      timestamp: params.timestamp || new Date().toISOString(),
      name: (params.name || "").trim(),
      phone: (params.phone || "").trim(),
      constructionAddress: (params.constructionAddress || "").trim(),
      source: (params.source || "").trim(),
    };

    payload.rawData = JSON.stringify({
      timestamp: payload.timestamp,
      name: payload.name,
      phone: payload.phone,
      constructionAddress: payload.constructionAddress,
      source: payload.source,
    });

    var ve = validateStairs_(payload);
    if (ve.length > 0) {
      return ContentService.createTextOutput(
        JSON.stringify({ ok: false, error: "Dữ liệu không hợp lệ", details: ve })
      ).setMimeType(ContentService.MimeType.JSON);
    }

    var ss = SpreadsheetApp.openById(UNIFIED_SPREADSHEET_ID);
    var sheet = getStairsSheetOrThrow_(ss);

    setupStairsTableOnce_(sheet);

    sheet.appendRow([
      payload.timestamp,
      payload.name,
      payload.phone,
      payload.constructionAddress,
      payload.source,
      payload.rawData,
    ]);

    var lastRow = sheet.getLastRow();
    formatStairsRow_(sheet, lastRow);

    console.log("Stairs lead row " + lastRow + " " + (new Date() - t0) + "ms");

    return ContentService.createTextOutput(
      JSON.stringify({
        ok: true,
        message: "Lead đã được lưu",
        row: lastRow,
        timestamp: payload.timestamp,
      })
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    console.error(err);
    return ContentService.createTextOutput(
      JSON.stringify({
        ok: false,
        error: "Lỗi server",
        message: err.message || String(err),
      })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}
