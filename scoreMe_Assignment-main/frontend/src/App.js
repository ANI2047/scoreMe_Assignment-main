import React, { useState } from "react";
import axios from "axios";
import { useDropzone } from "react-dropzone";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

const App = () => {
  const [file, setFile] = useState(null);
  const [data, setData] = useState([]);
  const [downloadUrl, setDownloadUrl] = useState("");
  const [processing, setProcessing] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const { getRootProps, getInputProps } = useDropzone({
    accept: "application/pdf",
    onDrop: (acceptedFiles) => setFile(acceptedFiles[0]),
  });

  const handleUpload = async () => {
    if (!file) return alert("Please select a PDF file.");
    const formData = new FormData();
    formData.append("pdf", file);

    setProcessing(true);
    setData([]);
    setDownloadUrl("");

    try {
      const response = await axios.post(
        "http://localhost:5000/upload",
        formData
      );
      setData(response.data.data);
      setDownloadUrl(response.data.downloadUrl);
    } catch (error) {
      alert(error.response?.data?.error || "Failed to process PDF.");
    } finally {
      setProcessing(false);
    }
  };

  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <div
      className={`${
        darkMode ? "bg-dark text-light" : "bg-light text-dark"
      } min-vh-100`}
    >
      <div className="container py-5">
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="fw-bold">
            <span role="img" aria-label="pdf">
              📄
            </span>{" "}
            PDF to Excel Extractor
          </h1>
          <div className="form-check form-switch">
            <input
              className="form-check-input"
              type="checkbox"
              id="darkModeSwitch"
              checked={darkMode}
              onChange={toggleDarkMode}
            />
            <label className="form-check-label" htmlFor="darkModeSwitch">
              {darkMode ? "🌙 Dark" : "☀️ Light"}
            </label>
          </div>
        </div>

        {/* Drag and Drop */}
        <div
          {...getRootProps()}
          className={`border border-3 rounded p-5 mb-3 text-center ${
            darkMode ? "border-light bg-secondary" : "border-primary bg-white"
          }`}
          style={{ cursor: "pointer" }}
        >
          <input {...getInputProps()} />
          <h5 className="mb-3">Drag & Drop your PDF here</h5>
          <p className="mb-0 text-muted">or click to select a file</p>
        </div>

        {/* File Info */}
        {file && (
          <p className="fw-medium text-success">✔ Selected File: {file.name}</p>
        )}

        {/* Upload Button */}
        <button
          onClick={handleUpload}
          disabled={processing}
          className="btn btn-lg btn-primary mt-3"
        >
          {processing ? "⏳ Processing..." : "🔍 Extract Tables"}
        </button>

        {/* Extracted Table */}
        {data.length > 0 && (
          <div className="mt-5">
            <h4 className="mb-4">📊 Extracted Table Data</h4>
            <div className="table-responsive">
              <table
                className={`table table-hover table-bordered ${
                  darkMode ? "table-dark" : "table-striped"
                }`}
              >
                <thead className="table-primary">
                  <tr>
                    {data[0].map((col, i) => (
                      <th key={i}>{col}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {data.slice(1).map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      {row.map((col, colIndex) => (
                        <td key={colIndex}>{col}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Download Button */}
        {downloadUrl && (
          <a
            href={downloadUrl}
            download="ExtractedData.xlsx"
            className="btn btn-success btn-lg mt-4"
          >
            ⬇️ Download Excel File
          </a>
        )}

        {/* Footer */}
        <footer className="mt-5 pt-4 border-top">
          <p className="text-muted text-center mb-0">
          </p>
        </footer>
      </div>
    </div>
  );
};

export default App;
