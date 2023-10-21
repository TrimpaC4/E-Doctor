// server.js
import express from 'express';
import EmailSender from './EmailSender'; // Adjust the path to your EmailSender component

const app = express();

app.use(express.json());

app.use(EmailSender); // Use the EmailSender component as middleware

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
