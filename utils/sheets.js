import { google } from "googleapis";

const auth = new google.auth.JWT(
  process.env.GOOGLE_CLIENT_EMAIL,
  null,
  process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  ["https://www.googleapis.com/auth/spreadsheets"]
);
const sheets = google.sheets({ version: "v4", auth });

export async function appendLeadRow(values) {
  await sheets.spreadsheets.values.append({
    spreadsheetId: process.env.SHEETS_ID,
    range: "A1",
    valueInputOption: "RAW",
    requestBody: { values: [values] },
  });
}
