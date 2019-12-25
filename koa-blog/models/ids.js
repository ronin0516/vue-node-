const mongoose = require('mongoose')

const idsSchema = new mongoose.Schema({
    department_id: {type: Number, default: 0},      //部门id
    employee_id: {type: Number, default: 0},            //员工id
    school_id: {type: Number, default: 0},           //员工id
    student_id: {type: Number, default: 0},            //员工id
});

const Ids = mongoose.model('Ids', idsSchema);

new Ids({'department_id': 0, 'employee_id': 0,school_id:0,student_id:0}).save(); // ??????findOneAndUpdate????????null

module.exports = Ids