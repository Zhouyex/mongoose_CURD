var mongoose = require('mongoose');

var db = mongoose.createConnection('mongodb://127.0.0.1:27017/message',{ useNewUrlParser: true });


//创建Schema 数据模型
var cat = new mongoose.Schema({
    name:{type:String,required:true},
    age:{type:Number,min:1,max:100},
    remk:{type:String,enum:['man','woman']}

});

//绑定数据模型
var catModel = db.model('students',cat);
//定义上传数据
var data = new catModel({
    name:'yasuo',
    age:20,
    remk:'man'

});

//监听服务器开启状态
db.on('open', (err) => {
    if (err) {
        console.log(err)
    } else {
        console.log('success');

        catModel.updateOne({'name': 'yasuo'}, {$set: {'name': 'newYasuo'}}, (err, data) => {
            if (err) {
                console.log('数据更新失败');
            } else {
                console.log('更新成功');
                catModel.find((err, data) => {
                    if (err) {
                        console.log("数据插入后，查找全部-失败");
                    } else {
                        console.log(data)
                    }
                })
            }
        })

}
})
