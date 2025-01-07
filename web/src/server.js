// server.js
require('dotenv').config();
const express = require('express');
const { google } = require('googleapis');
const cors = require('cors');

const app = express();

// Enable CORS for your frontend domain
app.use(cors());
app.use(express.json());

// Configure Google Sheets authentication
const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  },
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const sheets = google.sheets({ version: 'v4', auth });

app.post('/api/register', async (req, res) => {
  try {
    const {
      studentName,
      email,
      registrationNumber,
      department,
      phoneNumber,
      eventTitle,
      registrationDate,
    } = req.body;

    // Format the date
    const formattedDate = new Date(registrationDate).toLocaleString();

    // Prepare the data for Google Sheets
    const values = [
      [
        studentName,
        email,
        registrationNumber,
        department,
        phoneNumber,
        eventTitle,
        formattedDate,
      ],
    ];

    // Append the data to Google Sheets
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: 'Sheet1!A:G', // Assuming your sheet is named "Sheet1"
      valueInputOption: 'USER_ENTERED',
      resource: { values },
    });

    if (response.status === 200) {
      res.status(200).json({ message: 'Registration successful!' });
    } else {
      throw new Error('Failed to write to Google Sheets');
    }

  } catch (error) {
    console.error('Server Error:', error);
    res.status(500).json({ 
      error: 'Registration failed', 
      details: error.message 
    });
  }
});

// Simple test route
app.get('/test', (req, res) => {
  res.json({ message: 'Server is running!' });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});