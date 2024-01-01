const express = require('express');
const cors = require('cors');
require('express-async-catch');
require('dotenv').config();
const app = express();
const path = require('path');
const passport = require('passport');
const { errorController } = require('./controller/errorController');
const userRouter = require('./routs/userRoute');

app.use(cors({ origin: 'http://localhost:4000' }));

app.use(express.json());
app.use(passport.initialize());
require('./middleware/passport');
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/user', userRouter);

app.all('*', (req, res, next) => {
  res.status(200).json({ message: `${req.originalUrl} is invalid url` });
  next();
});

app.use(errorController); 

app.listen(5000, (err) => {
  if (err) {
    console.log('server not connected');
  }
  console.log('employee server connected on port 5000');
});
