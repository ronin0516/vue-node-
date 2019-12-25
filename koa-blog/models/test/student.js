
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const StudentSchema = new Schema({
    id: String,
    name: String, //学生姓名
    age: Number, //年龄
    school_id: Number, // 学校id
    school: {
        type: Schema.Types.ObjectId,
        ref: 'school'
    }
});

// StudentSchema.index({id: 1});
const Student = mongoose.model('student', StudentSchema);

module.exports = Student;