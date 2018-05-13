var express = require('express');
var router = express.Router();

var Project = require('../models/project');
var User = require('../models/user');


router.post('/create',function(req,res){

	console.log("create project Route hit");
   
    console.log(req.body);

    var project = new Project();

    project.project_name = req.body.name;
    project.start_date = req.body.startDate;
    project.end_date = req.body.endDate;
    project.short_description = req.body.description;
    project.admin = req.body.userId;


    project.save(function(err,data){

    	// console.log(err);
    	// console.log(data);
    	if(err){
    	   res.json({success: false, message: err.message});
        }else{
            // console.log(data);
             User.findOneAndUpdate({ _id : req.body.userId},{$push:{projects:data._id}},{new: true},function(err,user){
                if(err){
                    console.log('error occured');
                  res.json({success:false,data:err})
                }else{
                  res.json({success:true, userData: user,projectData: project});
                }
            })
            // now we have to push data in user
        	// res.json({success: true, message: "Project created successfully"});
        }
    })


})

router.post('/getById',function(req,res){
    console.log('inside get single project');

    var data = req.body.id; 

    console.log(data);

    Project.findOne({_id: data}).populate('tasks admins admin developers').exec(function(err,doc){
        if(err){
           res.json({success:false,data:err})
        }else{
           res.json({success:true,data:doc})
        }
    })
})

router.post('/addDeveloper',function(req,res){
    console.log("add developer route hit");
    console.log(req.body);
    // $addToSet for unique elements in array
     Project.findOneAndUpdate({ _id : req.body.projectId},{$addToSet:{developers:req.body.developerId}},{new: true},function(err,project){
        if(err){
            console.log('error occured');
          res.json({success:false,data:err})
        }else{
            // now we will add project id to user projects
             User.findOneAndUpdate({ _id : req.body.developerId},{$addToSet:{projects:req.body.projectId}},{new: true},function(err,user){
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



module.exports = router;