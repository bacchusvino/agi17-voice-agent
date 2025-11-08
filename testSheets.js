import { google } from "googleapis";
import "dotenv/config";

async function testWrite() {
  console.log("🔧 Environment check:");
  console.log("SHEETS_ID:", process.env.SHEETS_ID ? "✅ Set" : "❌ Missing");
  console.log("GOOGLE_CLIENT_EMAIL:", process.env.GOOGLE_CLIENT_EMAIL ? "✅ Set" : "❌ Missing");
  console.log("GOOGLE_PRIVATE_KEY:", process.env.GOOGLE_PRIVATE_KEY ? "✅ Set" : "❌ Missing");
  
  const auth = new google.auth.JWT({
    email: process.env.GOOGLE_CLIENT_EMAIL,
    key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    scopes: ["https://www.googleapis.com/auth/spreadsheets"]
  });

  console.log("🔐 Authorizing...");
  await auth.authorize();
  console.log("✅ Authorization successful!");

  const sheets = google.sheets({ version: "v4", auth });

  const response = await sheets.spreadsheets.values.append({
    spreadsheetId: process.env.SHEETS_ID,
    range: "A1",
    valueInputOption: "RAW",
    requestBody: {
      values: [[new Date().toISOString(), "Test from Node"]],
    },
  });

  console.log("✅ Success:", response.statusText);
}

testWrite().catch(console.error);