# PDF to Excel Extractor

## 📌 Project Overview

PDF to Excel Extractor is a web application that allows users to upload PDF files and extract structured table data into an Excel spreadsheet.

## 🚀 Features

- 📂 **Upload PDFs** via drag-and-drop or file selection.
- 🏆 **Extract Table Data** from structured PDFs using regex.
- 📊 **Generate and Download Excel Files** with extracted data.
- 🎨 **Dark Mode Support** for a better user experience.

## 🛠️ Tech Stack

### Frontend:

- React.js
- Bootstrap
- Axios
- React Dropzone

### Backend:

- Express.js
- Multer (File Uploads)
- PDF-Parse (Text Extraction)
- pdf2pic (PDF to Image Conversion)
- XLSX (Excel File Generation)
- CORS (Cross-Origin Requests)

## 📂 Project Structure

```
📦 pdf-to-excel-extractor
├── frontend (React App)
│   ├── src
│   │   ├── App.js
│   │   
│   │  
│   ├── public
│   ├── package.json
│   └── ...
├── backend (Express Server)
│   ├── server.js
│   ├── uploads/ (Temporary file storage)
│   ├── package.json
│   └── ...
├── README.md
└── .gitignore
```

## 🖥️ Installation and Setup

### Prerequisites:

- Node.js installed on your system
- npm or yarn installed

### 🔧 Setup Backend

```sh
cd backend
npm install
node server.js
```

The backend will start at `http://localhost:5000`.

### 🎨 Setup Frontend

```sh
cd frontend
npm install
npm start
```

The frontend will be available at `http://localhost:3000`.

## 📜 API Endpoints

### `POST /upload`

- **Description:** Uploads a PDF file, extracts table data, and generates an Excel file.
- **Request:** `multipart/form-data` with `pdf` as the file field.
- **Response:** JSON containing extracted data and a download URL.

### `GET /download/:filename`

- **Description:** Downloads the generated Excel file.
- **Response:** File download.

## 📸 Screenshots




