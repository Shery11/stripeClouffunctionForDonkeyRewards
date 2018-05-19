var express = require('express');
var router = express.Router();

var Project = require('../models/project');
var User = require('../models/user');
var Task = require('../models/tasks');
var UserActivity = require('../models/user_activity');


router.post('/save',function(req,res){

	console.log("save user_activity Route hit");
   
    console.log(req.body);


    UserActivity.save(function(err,doc){
        if(err){
           res.json({success:false,message:err});
        }else{
            res.json({success:true,data:doc});
        }
    })

  


})

module.exports = router;