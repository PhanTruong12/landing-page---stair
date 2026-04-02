/**
 * LEAD → GOOGLE SHEETS — Premium table (TND Granite tone)
 *
 * Một Web App phục vụ 2 site / 2 tab: dùng `webapp-unified.gs` (router `target=stairs` | `website`).
 * File này giữ cho bản deploy chỉ báo giá cầu thang (một tab).
 *
 * Tiêu đề cột: tiếng Việt. Không cột UTM.
 *
 * Deploy: Execute as Me · Anyone · URL /exec → NEXT_PUBLIC_SHEETS_WEB_APP_URL
 *
 * Áp dụng lại style sau khi đổi cột: xóa property LEAD_SHEET_PREMIUM_V4 (Script properties).
 *
 * Tab đích: CONFIG.SHEET_NAME phải trùng 100% tên tab trong file (kể cả hoa/thường, không thừa
 * khoảng trắng). Nếu không khớp, script báo lỗi và liệt kê tên các tab — không còn ghi nhầm
 * vào tab đầu tiên (ví dụ Website).
 */

var CONFIG = {
  SHEET_ID: "1rxXaVrue9U0DYsVKxBunKik3fPG7MksoZCFdrRxFaH0",
  SHEET_NAME: "Leads",
  HEADERS: [
    "Thời gian",
    "Họ và tên",
    "Số điện thoại",
    "Địa chỉ thi công",
    "Nguồn",
    "Dữ liệu gốc",
  ],
};

var THEME = {
  headerBg: "#1f1c18",
  headerFg: "#faf8f5",
  borderLight: "#e0d8ce",
  zebraA: "#ffffff",
  zebraB: "#f6f3ee",
  rawMuted: "#5c534a",
};

var PROP_PREMIUM_SETUP = "LEAD_SHEET_PREMIUM_V4";

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

/**
 * @param {SpreadsheetApp.Spreadsheet} ss
 * @param {string} name
 * @return {GoogleAppsScript.Spreadsheet.Sheet}
 */
function getSheetByNameOrThrow_(ss, name) {
  var sheet = ss.getSheetByName(name);
  if (sheet) return sheet;
  var names = ss.getSheets().map(function (s) {
    return s.getName();
  });
  throw new Error(
    'Không tìm thấy tab "' +
      name +
      '". Tên trong CONFIG.SHEET_NAME phải khớp chính xác với tên tab trên Google Sheets. ' +
      "Các tab hiện có: " +
      names.join(", ")
  );
}

function setupPremiumTableOnce_(sheet) {
  var props = PropertiesService.getScriptProperties();
  var done = props.getProperty(PROP_PREMIUM_SETUP);

  var cols = CONFIG.HEADERS.length;
  var headerRange = sheet.getRange(1, 1, 1, cols);
  var firstRow = headerRange.getValues()[0];
  var hasHeader =
    firstRow &&
    firstRow.some(function (cell) {
      return String(cell || "").trim().length > 0;
    });
  if (!hasHeader) {
    headerRange.setValues([CONFIG.HEADERS]);
  }

  if (done === "1") {
    return;
  }

  sheet.setRowHeight(1, 40);
  headerRange
    .setFontWeight("bold")
    .setFontSize(11)
    .setBackground(THEME.headerBg)
    .setFontColor(THEME.headerFg)
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
    THEME.borderLight,
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
      .setBackground(THEME.zebraA)
      .setRanges([bodyRange])
      .build()
  );
  rules.push(
    SpreadsheetApp.newConditionalFormatRule()
      .whenFormulaSatisfied("=AND(ROW()>1,MOD(ROW(),2)=1)")
      .setBackground(THEME.zebraB)
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
    THEME.borderLight,
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

  props.setProperty(PROP_PREMIUM_SETUP, "1");
}

function formatAppendedRow_(sheet, row) {
  var cols = CONFIG.HEADERS.length;
  var r = sheet.getRange(row, 1, row, cols);
  r.setVerticalAlignment("middle");
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
    .setFontColor(THEME.rawMuted);
}

function validateLead_(payload) {
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

function doGet() {
  return ContentService.createTextOutput(
    JSON.stringify({
      ok: true,
      message: "Web App đang hoạt động. POST form-urlencoded để gửi lead.",
      version: "3.1 - Tiếng Việt, không UTM",
    })
  ).setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  var t0 = new Date();
  try {
    if (!CONFIG.SHEET_ID || CONFIG.SHEET_ID === "PUT_YOUR_SHEET_ID_HERE") {
      throw new Error("Chưa cấu hình SHEET_ID trong CONFIG");
    }

    var params = parseFormParams_(e);
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

    var ve = validateLead_(payload);
    if (ve.length > 0) {
      return ContentService.createTextOutput(
        JSON.stringify({ ok: false, error: "Dữ liệu không hợp lệ", details: ve })
      ).setMimeType(ContentService.MimeType.JSON);
    }

    var ss = SpreadsheetApp.openById(CONFIG.SHEET_ID);
    var sheet = getSheetByNameOrThrow_(ss, CONFIG.SHEET_NAME);

    setupPremiumTableOnce_(sheet);

    sheet.appendRow([
      payload.timestamp,
      payload.name,
      payload.phone,
      payload.constructionAddress,
      payload.source,
      payload.rawData,
    ]);

    var lastRow = sheet.getLastRow();
    formatAppendedRow_(sheet, lastRow);

    console.log("Lead OK row " + lastRow + " " + (new Date() - t0) + "ms");

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
