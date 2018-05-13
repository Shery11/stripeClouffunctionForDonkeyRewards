
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TasksSchema = new Schema({
    task_name : {type: String , required : true},
    short_description : {type : String,required: true},
    created_by: { type : Schema.ObjectId, ref: 'User',required : true },
    start_date: { type: Date, default: Date.now ,required : true},
    end_date: {type: Date, default: Date.now ,required: true},
    project_id: { type : Schema.ObjectId, ref: 'Project' ,required: true},
    developers: [{type: Schema.ObjectId, ref: 'User'}],
    status :  {type: Boolean, default: false}
    // impact : { type : String , default: 10},
});


//now we need a variable that we can access outside of this file

module.exports = mongoose.model('Task', TasksSchema);