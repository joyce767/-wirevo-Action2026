// ---------- SERVER.JS ---------- //

require('dotenv').config();
const express = require("express");
const cors = require("cors");
const PDFDocument = require("pdfkit");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// ----------------------------
// PAYSTACK PAYMENT VERIFICATION
// ----------------------------
const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;

async function verifyPaystackPayment(reference) {
  try {
    const response = await axios.get(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
        },
      }
    );
    return response.data.data.status === "success";
  } catch (err) {
    console.error("Paystack verification error:", err.response?.data || err);
    return false;
  }
}

// ----------------------------
// GENERATE PLANNER PDF
// ----------------------------
app.post("/generate-plan", async (req, res) => {
  try {
    const { name, goal, challenge, target, paymentReference } = req.body;

    if (!name || !goal || !challenge || !target || !paymentReference) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Verify payment
    const paid = await verifyPaystackPayment(paymentReference);
    if (!paid) {
      return res.status(400).json({ error: "Payment not verified" });
    }

    // Create PDF in memory
    const doc = new PDFDocument();
    let chunks = [];

    doc.on("data", (chunk) => chunks.push(chunk));
    doc.on("end", () => {
      const pdfBuffer = Buffer.concat(chunks);

      res.setHeader("Content-Type", "application/pdf");
      res.setHeader(
        "Content-Disposition",
        `attachment; filename="${name}_2026_Planner.pdf"`
      );
      res.send(pdfBuffer);
    });

    // ---- PDF CONTENT ----
    doc.fontSize(24).text("Action 2026 Personalized Planner", { align: "center" });
    doc.moveDown();

    doc.fontSize(16).text(`Name: ${name}`);
    doc.text(`Business / Career Focus: ${goal}`);
    doc.text(`What Helps You Succeed: ${challenge}`);
    doc.text(`2026 Target: ${target}`);
    doc.moveDown(2);

    doc.fontSize(18).text("Your AI-Guided Plan:", { underline: true });
    doc.moveDown();

    doc.fontSize(14).text(
      `Here is your structured action plan for 2026:

1. 🚀 Focus Strategy:
   - Stay aligned with your main goal: ${goal}.
   - Remove distractions and commit to one major project at a time.

2. 🛠 What You Need:
   - ${challenge}.
   - Prioritize resources, coaching, knowledge, and clarity.

3. 🎯 2026 Goals:
   - Your target is: ${target}.
   - Break it into quarterly milestones and weekly tasks.

4. 📌 Direction & Clarity:
   - Build consistency.
   - Review your progress every month.
   - Improve skills, productivity, and execution.

5. 🌟 Final Advice:
   - Your year is defined by discipline.
   - Take bold steps and track everything.
`
    );

    doc.end();
  } catch (err) {
    console.error("Server Error:", err);
    res.status(500).json({ error: "Server error generating PDF" });
  }
});

// ----------------------------
// START SERVER
// ----------------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});