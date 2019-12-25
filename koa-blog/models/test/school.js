
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SchoolSchema = new Schema({
    id: String,
    name: String,
})

// SchoolSchema.index({index: 1});
const School = mongoose.model('school', SchoolSchema)

module.exports = School