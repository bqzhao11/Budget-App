const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');


require('dotenv').config();

const app = express();
const port = process.env.BACKEND_PORT;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });

const connection = mongoose.connection;

connection.once('open', () => {
    console.log("MongoDB connected");
});

const usersRouter = require('./routes/user_route');
const paymentRouter = require('./routes/payment_route');

app.use('/users', usersRouter);
app.use('/payments', paymentRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});