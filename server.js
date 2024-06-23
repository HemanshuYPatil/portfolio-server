const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const port = 3001;

// Middleware
app.use(bodyParser.json());
app.use(cors());

const mongoURI = 'mongodb+srv://hemanshuypatil:57cITOpdabsx1TVZ@cluster0.nj0juix.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'; 
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true,dbName: 'portfolio-data',
    bufferCommands: false,})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

const contactSchema = new mongoose.Schema({
  senderEmail: { type: String, required: true },
  message: { type: String, required: true }
});

const Contact = mongoose.model('Contact', contactSchema);

// Route to handle form data submission
app.post('/submit-form', async (req, res) => {
  const { senderEmail, message } = req.body;

  try {
    const newContact = new Contact({ senderEmail, message });
    await newContact.save();
    res.status(200).send({ message: 'Form data received and stored successfully', data: newContact });
  } catch (error) {
    console.error('Error saving form data:', error);
    res.status(500).send({ message: 'An error occurred while saving the form data' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
