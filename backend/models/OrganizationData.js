const mongoose = require('mongoose');
//change this schema according to the csv files that you will be dealing with.
//I chose one publically available which you can find in the root directory.
const organizationDataSchema = new mongoose.Schema({
  index: Number,
  organization_id: String,
  name: String,
  website: String,
  country: String,
  description: String,
  founded: Number,
  industry: String,
  number_of_employees: Number
});

module.exports = mongoose.model('OrganizationData', organizationDataSchema);