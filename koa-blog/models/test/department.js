const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DepartmentSchema = new Schema({
    id: {type: Number, default: 0}, //部门编号
    name: String //名称
})

// EmployeeSchema.index({id: 1})

const Department = mongoose.model('department', DepartmentSchema);
module.exports = Department