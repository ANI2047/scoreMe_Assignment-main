


const express = require("express");
const multer = require("multer");
const fs = require("fs");
const pdf = require("pdf-parse");
const XLSX = require("xlsx");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Configure Multer for file uploads
const upload = multer({ dest: "uploads/" });

// Regular expression pattern
const regex = /(\d{2}-[A-Za-z]{3}-\d{4})\s+([TC])\s+(.+?)\s+([\d,]+\.\d{2})?\s+([\d,]+\.\d{2}Dr)?/g;

// Function to extract text from PDF (only native text, no OCR)
const extractTextFromPDF = async (pdfPath) => {
    const pdfBuffer = fs.readFileSync(pdfPath);
    const pdfData = await pdf(pdfBuffer);
    return pdfData.text; // Extracted text from the PDF
};

// Function to extract table data using regex
const extractTableData = (text) => {
    const matches = [...text.matchAll(regex)];
    return matches.map(match => match.slice(1));
};

app.post("/upload", upload.single("pdf"), async (req, res) => {
    try {
        const pdfPath = req.file.path;
        const extractedText = await extractTextFromPDF(pdfPath);
        const tableData = extractTableData(extractedText);

        if (tableData.length === 0) {
            throw new Error("No matching data found in the PDF.");
        }

        // Create Excel file
        const worksheet = XLSX.utils.aoa_to_sheet([["Date", "Type", "Description", "Amount", "Dr Amount"], ...tableData]);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Extracted Data");

        const excelPath = `uploads/${req.file.filename}.xlsx`;
        XLSX.writeFile(workbook, excelPath);

        fs.unlinkSync(pdfPath); // Delete uploaded PDF

        res.json({ 
            success: true, 
            data: tableData, 
            downloadUrl: `http://localhost:5000/download/${req.file.filename}.xlsx`
        });

    } catch (error) {
        res.status(500).json({ error: error.message || "Error processing the PDF." });
    }
});

// Route to serve the generated Excel file
app.get("/download/:filename", (req, res) => {
    const filePath = `uploads/${req.params.filename}`;
    res.download(filePath, "ExtractedData.xlsx", () => {
        fs.unlinkSync(filePath); // Delete file after download
    });
});

app.listen(5000, () => console.log("Server running on port 5000"));
