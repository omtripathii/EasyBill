const express = require('express');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const cors = require('cors'); // Add this line
require('dotenv').config();

const app = express();


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
// const cors = require('cors');

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));



app.use(express.json());

// MongoDB connection
const connectToDatabase = async () => {
    try {
        await mongoose.connect('mongodb+srv://mongodbom:hMSaZrlDKayPslD7@cluster0.u9locf4.mongodb.net/invoiceDB');
        console.log('Connected to Mongoose');
    } catch (error) {
        console.error('Failed to connect to MongoDB:', error);
        process.exit(1); // Exit process with failure
    }
};

connectToDatabase();

// Mongoose Schema and Model
const schema = new mongoose.Schema({
    date: {
        type: [],
        isrequired: true
    },
    due: {
        type: Number,
        isrequired: true
    },
    name: {
        type: String,
        isrequired: true
    },
    address: {
        type: String,
        isRequired: true
    },
    phone: {
        type: Number,
        isrequired: true
    },
    email: {
        type: String,
        isrequired: true
    }, 
    product: {
        type: Number,
        isrequired: true
    },
    service: {
        type: Number,
        isrequired: true
    },
    labour: {
        type: Number,
        isrequired: true
    },    
    paid: {
        type: Boolean,
        isrequired: true,
    }
});

const Invoice = mongoose.model('Invoice', schema);

// Nodemailer setup
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD,
      clientId: process.env.OAUTH_CLIENTID,
      clientSecret: process.env.OAUTH_CLIENT_SECRET,
      refreshToken: process.env.OAUTH_REFRESH_TOKEN
    }
});

// Routes
app.post('/mail', (req, res) => {
    const { receiver, message } = req.body;

    if (!receiver) {
        return res.status(400).json({ err: true, message: 'No recipient defined' });
    }

    let mailOptions = {
        from: `"OM TRIPATHI" <${process.env.MAIL_USERNAME}>`,
        to: receiver,
        subject: 'Invoice for your purchase',
        text: `Your grand total is: ${message}`
    };

    transporter.sendMail(mailOptions, (err, response) => {
        if (err) {
            res.status(500).json({ err: true, message: 'Could not send email' });
            console.log(err);
        } else {
            res.status(200).json({ err: false, message: 'Email sent successfully' });
        }
    });
});

app.get('/invoice', async (req, res) => {
    try {
        const result = await Invoice.find({});
        res.status(200).json({ err: false, message: result });
    } catch (err) {
        res.status(500).json({ err: true, message: 'Failed to load data' });
    }
});

app.post('/invoice', async (req, res) => {
    const details = req.body;
    const d = new Date();
    const date = d.getDate();
    const month = d.getMonth();
    const year = d.getFullYear();
    const due = Date.now() + 432000000;
    const current_date = [date, month, year];
    const newInvoice = new Invoice({
        date: current_date,
        due: due,
        name: details.name,
        address: details.address,
        phone: details.phone,
        email: details.email,
        product: details.product,
        service: details.service,
        labour: details.labour,
        paid: false
    });

    try {
        await newInvoice.save();
        res.status(200).json({ err: false, message: 'Invoice saved successfully' });
    } catch (err) {
        res.status(500).json({ err: true, message: 'Failed to save the invoice' });
        console.log(err);
    }
});

app.patch('/invoice', async (req, res) => {
    const inv_id = req.body.id;
    try {
        // Update the invoice status
        const result = await Invoice.findByIdAndUpdate(inv_id, { paid: true }, { new: true });
        if (!result) {
            return res.status(404).json({ err: true, message: 'Invoice not found' });
        }
        res.status(200).json({ err: false, message: 'Status changed' });
    } catch (err) {
        res.status(500).json({ err: true, message: 'Could not update status of invoice' });
        console.log(err);
    }
});

app.get('/:id', async (req, res) => {
    const invId = req.params.id;
    try {
        const invoice = await Invoice.findById(invId);
        if (!invoice) {
            res.status(400).json({ err: true, message: 'Invoice not found' });
        } else {
            res.status(200).json({ err: false, message: invoice });
        }
    } catch (err) {
        res.status(500).json({ err: true, message: 'Server error. Try again later' });
        console.log(err);
    }
});

app.listen(8080, () => {
    console.log('Server running on port 8080');
});
