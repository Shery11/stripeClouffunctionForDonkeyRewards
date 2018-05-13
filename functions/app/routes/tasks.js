var express = require('express');
var router = express.Router();

var Project = require('../models/project');
var User = require('../models/user');
var Task = require('../models/tasks')


router.post('/create',function(req,res){

	console.log("create task Route hit");
   
    console.log(req.body);

    var task = new Task();

    task.task_name = req.body.name;
    task.start_date = req.body.startDate;
    task.end_date = req.body.endDate;
    task.short_description = req.body.description;
    task.project_id = req.body.projectId;
    task.created_by = req.body.userId;
    task.developers = req.body.developers;


    task.save(function(err,data){
     
     	if(err){
    	   res.json({success: false, message: err.message});
        }else{
            console.log(data);
             Project.findOneAndUpdate({ _id : req.body.projectId},{$push:{tasks:data._id}},{new: true},function(err,project){
                if(err){
                    console.log('error occured');
                  res.json({success:false,data:err})
                }else{
                  res.json({success:true, projectData: project,taskData: data});
                }
            })
           
        }
    })


})



router.post('/addDeveloper',function(req,res){
    console.log("add developer route hit");
    console.log(req.body);
     Task.findOneAndUpdate({ _id : req.body.taskId},{$addToSet:{developers:req.body.developerId}},{new: true},function(err,project){
        if(err){
            console.log('error occured');
          res.json({success:false,data:err})
        }else{
              User.findOneAndUpdate({ _id :req.body.developerId},{$addToSet:{tasks:req.body.taskId}},{new: true},function(err,user){
                if(err){
                    console.log('error occured');
                  res.json({success:false,data:err})
                }else{
                  res.json({success:true, projectData: project,userData: user});
                }
             })
        }
     })
})


router.post('/getTaskById',function(req,res){
    console.log("get task route hit");
    console.log(req.body);
      Task.findOne({_id: req.body.id}).populate('created_by developers').exec(function (err, task) {
        if (err)
            throw err;
        if (!task) {
            res.json({success: false, message: 'Task not found'});
        } else if (task) {
                //return the success plus the token
                res.json({success: true, task: task});
            }
        
    });
})



module.exports = router;