const Ids = require('../models/ids')

class BaseClass {
    constructor() {
        // this.idList = ['restaurant_id', 'food_id', 'order_id', 'user_id', 'address_id', 'category_id', 'sku_id', 'admin_id', 'pay_id', 'comment_id'];
        this.idList = ['department_id', 'employee_id', 'student_id', 'school_id']
        this.getId = this.getId.bind(this);
    }

    //获取id列表
    async getId(type_id) {
        if (!this.idList.includes(type_id)) {
            throw new Error('id类型错误');
            
        }
        // console.log('type_id==========', type_id)
        try {
            const idData = await Ids.findOneAndUpdate({}, {'$inc': {[type_id]: 1}});
            // console.log('-------------------', idData)
            return idData[type_id];                //返回当前类型id数量*/
        } catch (err) {
            console.log('获取ID数据失败');
            throw new Error(err)
        }
    }
}

module.exports = BaseClass

