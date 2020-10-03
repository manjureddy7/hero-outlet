const express = require("express");
const cors = require('cors');
const fs = require('fs');

const path = require('path');

const jsonPath = path.join(__dirname, 'data.json');

fs.readFile(jsonPath, (err,data) => {
    if (err) throw err;
    let locationData = JSON.parse(data);
    // locationData.Document.Placemark
    //I lost logic here!!!
    // gettig both latitude and longitude from frontend
    // but failed to get how to get closest outlet based on the coords passed
})


// Initialize express app
const app = express();
app.use(cors());
app.use(express.json());


const PORT = process.env.PORT || 8080;


app.post('/location', async(req,res) => {
    const { latitude, longitude } = req.body;
    res.status(200).json({
        message: "Successfully received Location",
        location:`Your Latitude is - ${latitude} & Longitude is - ${longitude} `
    });
})

app.listen(PORT, () => console.log("App is up and running on ", PORT));