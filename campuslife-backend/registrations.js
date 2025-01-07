import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import XLSX from 'xlsx';

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const registrationsDir = path.resolve(__dirname, 'registrations');

// Ensure "registrations" directory exists
if (!fs.existsSync(registrationsDir)) {
  fs.mkdirSync(registrationsDir);
  console.log(`Created directory: ${registrationsDir}`);
} else {
  console.log(`Directory already exists: ${registrationsDir}`);
}

// API endpoint for handling registrations
router.post('/register', (req, res) => {
  const {
    eventTitle,
    studentName,
    email,
    registrationNumber,
    department,
    phoneNumber,
    registrationDate,
  } = req.body;

  console.log('Received registration data:', req.body);

  if (!eventTitle || !studentName || !email || !registrationNumber || !department || !phoneNumber) {
    console.error('Missing required fields');
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const fileName = `${eventTitle.replace(/ /g, '_')}.xlsx`;
  const filePath = path.join(registrationsDir, fileName);

  console.log(`File path for registration: ${filePath}`);

  let workbook;
  if (fs.existsSync(filePath)) {
    console.log('File exists, reading workbook');
    workbook = XLSX.readFile(filePath);
  } else {
    console.log('File does not exist, creating new workbook');
    workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, XLSX.utils.json_to_sheet([]), 'Registrations');
  }

  const worksheet = workbook.Sheets['Registrations'];
  const data = XLSX.utils.sheet_to_json(worksheet);

  console.log('Current registration data:', data);

  data.push({
    StudentName: studentName,
    Email: email,
    RegistrationNumber: registrationNumber,
    Department: department,
    PhoneNumber: phoneNumber,
    RegistrationDate: registrationDate,
  });

  console.log('Updated registration data:', data);

  const updatedWorksheet = XLSX.utils.json_to_sheet(data);
  workbook.Sheets['Registrations'] = updatedWorksheet;
  XLSX.writeFile(workbook, filePath);

  console.log('Registration successful, data written to file');

  res.status(201).json({ message: 'Registration successful' });
});

export default router;