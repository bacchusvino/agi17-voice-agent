// server.js
import express from "express";
import cors from "cors";
import "dotenv/config";
import { appendLeadRow } from "./utils/sheets.js";

const app = express();
app.use(cors());
app.use(express.json());

// health check
app.get("/api/health", (_req, res) => res.json({ ok: true }));

// lead ingest handler
app.post("/api/leads", async (req, res) => {
  try {
    const {
      source = "QualiFy",
      ownerName = "",
      phone = "",
      city = "",
      consentBasis = "",
      notes = "",
    } = req.body ?? {};

    const row = [
      new Date().toISOString(),
      source,
      ownerName,
      phone,
      city,
      consentBasis,
      notes,
    ];

    await appendLeadRow(row);
    res.status(201).json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, error: err?.message || "Unknown error" });
  }
});

const PORT = process.env.PORT || 5057; // avoid conflicts with Vite (5173)
app.listen(PORT, () => console.log(`✅ API running on http://localhost:${PORT}`));