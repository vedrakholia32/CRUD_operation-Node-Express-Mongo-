const express = require('express');
const db = require('./db');
const app = express();
require('dotenv').config(); 

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const Person = require('./models/Person');

app.get('/', (req, res) => {
    res.send("Welcome")
})

app.put('/person/:id', async (req, res) => {
    try {
        const personId = req.params.id;
        const updateData = req.body;

        // Find and update the person by ID
        const updatedPerson = await Person.findOneAndUpdate(
            { _id: personId },           // Filter to find the document
            { $set: updateData },         // Data to update
            { new: true }                 // Return the updated document
        );

        if (!updatedPerson) {
            return res.status(404).json({ error: 'Person not found' });
        }

        console.log('Data updated');
        res.status(200).json(updatedPerson);

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server Error' });
    }
});


const personRoutes = require('./routes/personRoutes')
app.use('/person', personRoutes)

app.listen(3000, () => {
    console.log('listening on port 3000');
})