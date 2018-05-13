
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ActivitySchema = new Schema({
    KeyboardMouseActivity : {type: String , required : true},
    AppsActivity : [{
        AppName : {type : String},
        Duration: {type : String},
        Description : {type : String}
    }],
    SwitchShots: [{type : String}],
    WebCamShots: [{ type: String }],
    ScreenShots: [{ type: String }],
    Notes: [{ type: String }],
    projectId: [{ type : Schema.ObjectId, ref: 'Project' }],
    taskId: [{ type : Schema.ObjectId, ref: 'Task' }],
    date : {type: Date,required: true},
    SystemInfo : {type: String}
});

module.exports = mongoose.model('Activity', ActivitySchema);