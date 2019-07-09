var mongoose = require('mongoose');

var db = mongoose.createConnection('mongodb://127.0.0.1:27017/message',{ useNewUrlParser: true });


//创建Schema 数据模型
var cat = new mongoose.Schema({
    name:String,
    age:Number,
    remk:String

});

//绑定数据模型
var catModel = db.model('student',cat);
//定义上传数据
var data = new catModel({
    name:'kitty',
    age:20,
    remk:'这就是了'

});

//监听服务器开启状态
db.on('open',(err)=>{
    if(err)
    {
        console.log(err)
    }else{
        console.log('success');

        //执行数据操作
        catModel.create(data,(err)=>{
            if(err)
            {
                console.log('数据添加失败');
            }else{
                console.log('添加成功')
            }
        })
    }
})
