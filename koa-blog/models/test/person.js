
const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const PersonSchema = new Schema({
    _id: Number,
    name: String,
    age: Number,
    stories: [{ type: Schema.Types.ObjectId, ref: 'Story' }]
})

// PersonSchema.index({id: 1})

const Person = mongoose.model('person', PersonSchema);
module.exports = Person;