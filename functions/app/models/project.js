
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProjectSchema = new Schema({
    project_name : {type: String , required : true},
    short_description : {type : String,required: true},
    long_description: {type : String},
    start_date: { type: Date, default: Date.now },
    end_date: {type: Date, default: Date.now ,required: true},
    admin: { type : Schema.ObjectId, ref: 'User' },
    admins: [{ type : Schema.ObjectId, ref: 'User' }],
    developers: [{ type : Schema.ObjectId, ref: 'User' }],
    tasks: [{ type : Schema.ObjectId, ref: 'Task' }], //this will reference to standard errors in the db
    status : {type : Boolean , default: false}
});


//now we need a variable that we can access outside of this file

module.exports = mongoose.model('Project', ProjectSchema);