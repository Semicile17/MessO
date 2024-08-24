const mongoose = require('mongoose');
const validator = require('validator');


const formSchema = new mongoose.Schema({
    from_date:{
        type:Date,
        required:[true,"There should be a start date"],
        validate:{
             validator:function(val){
                return val.getTime() > (this.to_date).getTime();
             },
             message : 'Invalid from date',
        },
    },
    to_date:{
        type:Date,
        required:[true,"There should be a to date"],
        validate:{
            validator:function(val){
                return val.getTime() < (this.from_date).getTime();
            },
            message : 'Invalid to date',
       },
    },
    reason:{
        type:String,
        required:[true,"There should be a reason"],
        minlength:[15,"Should contain atleast 10 characters"],
        maxlength:[40,"Should be atmost 40 characters"]
    },
    status:{
        type:String,
        enum:['pending','approved','rejected'],
        default:'pending'
    },
    room_no:{
        type:Number,
        required:[true,"There should be a room number"],
        min:[100,"Room number should be above 100"],
        max:[350,"Room number should be above 350"]
    }
});


const Form = mongoose.model('Form', formSchema);

module.exports = Form;
