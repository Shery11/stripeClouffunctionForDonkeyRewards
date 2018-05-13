var express = require('express');
var router = express.Router();

var Project = require('../models/project');
var User = require('../models/user');
var Task = require('../models/tasks');
var UserActivity = require('../models/user_activity');


router.post('/save',function(req,res){

	console.log("save user_activity Route hit");
   
    console.log(req.body);

  


})

module.exports = router;