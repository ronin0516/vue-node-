const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EmployeeSchema = new Schema({
    id: Number,
    name: String,
    sex: Number,
    age: Number,
    dep: {
        type: Schema.Types.ObjectId,
        ref: 'department'
    }
})

// EmployeeSchema.index({id: 1})

const Employ = mongoose.model('employ', EmployeeSchema);
module.exports = Employ