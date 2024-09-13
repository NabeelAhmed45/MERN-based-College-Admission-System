require('dotenv').config()
require('express-async-errors')
const express = require('express')
const app = express()
const path = require('path')
const { logger } = require('./middleware/logger')
const errorHandler = require('./middleware/errorHandler')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const connectDB = require('./config/dbConn')
const mongoose = require('mongoose')
const { logEvents } = require('./middleware/logger')
const corsOption = require('./config/corsOption')
const PORT = process.env.PORT || 3500
const FormDataModel = require('./models/StudentData')
const bodyParser = require('body-parser')

console.log(process.env.NODE_ENV)

connectDB()

app.use(logger)

app.use(express.json())
app.use(cookieParser())
app.use(cors(corsOption))
app.use(bodyParser.json())


app.use('/', express.static(path.join(__dirname, '/public')))

app.use('/', require('./routes/root'))
app.use('/auth', require('./routes/authRoutes'))
app.use('/users', require('./routes/userRoutes'))
app.use('/notes', require('./routes/noteRoutes'))



// Endpoint to check if a record with the CNIC exists
app.get('/home/checkCnic/:cnic', async (req, res) => {
  const cnic = req.params.cnic;

  try {
    // Check if CNIC exists in MongoDB
    const result = await FormDataModel.findOne({ cnic: cnic });

    if (result) {
      res.json({ exists: true });
    } else {
      res.json({ exists: false });
    }
  } catch (error) {
    console.error('Error checking CNIC in database:', error);
    res.status(500).json({ exists: false, message: 'Failed to check CNIC' });
  }
});
app.get('/home/checkPhone/:phone', async (req, res) => {
  const phone = req.params.phone;

  try {
    // Check if CNIC exists in MongoDB
    const result = await FormDataModel.findOne({ phone: phone });

    if (result) {
      res.json({ exists: true });
    } else {
      res.json({ exists: false });
    }
  } catch (error) {
    console.error('Error checking Contact in database:', error);
    res.status(500).json({ exists: false, message: 'Failed to check Contact' });
  }
});
app.get('/home/checkEmail/:email', async (req, res) => {
  const email = req.params.email;

  try {
    // Check if CNIC exists in MongoDB
    const result = await FormDataModel.findOne({ email: email });

    if (result) {
      res.json({ exists: true });
    } else {
      res.json({ exists: false });
    }
  } catch (error) {
    console.error('Error checking Email in database:', error);
    res.status(500).json({ exists: false, message: 'Failed to check Email' });
  }
});

// Endpoint to handle form submissions
app.post('/home', async (req, res) => {
  const formData = req.body;

  try {
    // Check if CNIC already exists
    const existingRecord = await FormDataModel.findOne({ cnic: formData.cnic });
   

    if (existingRecord) {
      return res.status(400).json({ message: 'Form submission failed. A record with this CNIC already exists.' });
    }
    const existingPhoneRecord = await FormDataModel.findOne({ phone: formData.phone });

    if (existingPhoneRecord) {
      return res.status(400).json({ message: 'Form submission failed. A record with this phone already exists.' });
    }
    const existingEmailRecord = await FormDataModel.findOne({ email: formData.email });

    if (existingEmailRecord) {
      return res.status(400).json({ message: 'Form submission failed. A record with this phone already exists.' });
    }

    // Create a new instance of FormDataModel
    const newFormData = new FormDataModel(formData);

    // Save to MongoDB
    await newFormData.save();

    console.log('Form data saved:', newFormData);

    res.status(201).json({ message: 'Form data saved successfully' });
  } catch (error) {
    console.error('Error saving form data:', error);
    res.status(500).json({ message: 'Failed to save form data' });
  }
});
app.put('/home/:id', async (req, res) => {
  const { id } = req.params;
  const formData = req.body;

  try {
    const updatedForm = await FormDataModel.findByIdAndUpdate(id, formData, { new: true });

    if (!updatedForm) {
      return res.status(404).json({ message: 'Form not found' });
    }

    res.json(updatedForm);
  } catch (error) {
    console.error('Error updating form:', error);
    res.status(500).json({ error: 'Error updating form' });
  }
});
app.get('/home', async (req, res) => {
    try {
      const formData = await FormDataModel.find({});
      res.status(200).json(formData);
    } catch (error) {
      console.error('Error fetching form data:', error);
      res.status(500).json({ message: 'Failed to fetch form data' });
    }
  });
  
  // Route to fetch student details by ID
  app.get('/home/:studentId', async (req, res) => {
    const studentId = req.params.studentId;
  
    try {
      const student = await FormDataModel.findById(studentId);
      if (!student) {
        return res.status(404).json({ message: 'Student not found' });
      }
      res.status(200).json(student);
    } catch (error) {
      console.error('Error fetching student details:', error);
      res.status(500).json({ message: 'Failed to fetch student details' });
    }
  });

app.all('*', (req, res) => {
  res.status(404)
  if (req.accepts('html')) {
    res.sendFile(path.join(__dirname, 'views', '404.html'))
  } else if (req.accepts('json')) {
    res.json({ message: '404 Not Found' })
  } else {
    res.type('txt').send('404 Not Found')
  }
})

app.use(errorHandler)

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB')
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
})

mongoose.connection.on('error', err => {
  console.log(err)
  logEvents(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`, 'mongoErrLog.log')
})
