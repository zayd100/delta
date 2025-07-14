const express = require('express');
const router = express.Router();
const multer = require('multer');
const csv = require('csv-parser');
const fs = require('fs');
const path = require('path');
const AWS = require('aws-sdk');
const OrganizationData = require('../models/OrganizationData');
require('dotenv').config();

const upload = multer({ dest: 'uploads/' });

//Configure AWS S3
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION || 'us-east-1',
});

const s3 = new AWS.S3();

router.post('/upload', upload.single('file'), (req, res) => {
  const results = [];
  const filePath = req.file.path;
  const originalFileName = req.file.originalname;

  fs.createReadStream(filePath)
    .pipe(csv())
    .on('data', (data) => {
      results.push({
        index: parseInt(data.Index),
        organization_id: data['Organization Id'],
        name: data.Name,
        website: data.Website,
        country: data.Country,
        description: data.Description,
        founded: parseInt(data.Founded),
        industry: data.Industry,
        number_of_employees: parseInt(data['Number of employees']),
      });
    })
    .on('end', async () => {
      try {
        //Save to MongoDB
        await OrganizationData.insertMany(results);

        // Upload to S3
        const fileContent = fs.readFileSync(filePath);
        const s3Params = {
          Bucket: process.env.AWS_S3_BUCKET_NAME,
          Key: `uploads/${Date.now()}-${originalFileName}`,
          Body: fileContent,
        };

        await s3.upload(s3Params).promise();

        // Delete file locally
        fs.unlinkSync(filePath);

        res.json({ message: 'Data uploaded to MongoDB and file saved to S3' });
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to insert data or upload to S3' });
      }
    });
});

router.get('/', async (req, res) => {
  const data = await OrganizationData.find();
  res.json(data);
});

module.exports = router;
