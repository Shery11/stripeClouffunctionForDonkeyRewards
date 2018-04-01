const functions = require('firebase-functions');
const express = require('express');
const stripe = require('stripe')('sk_test_4ResYzIWW4eq8z5Ct5grgT1X');
var bodyParser = require('body-parser');
var cors = require('cors');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions

const app = express();
var router = express.Router();

app.use(bodyParser.json());
app.use(cors({ origin: true }));


router.post('/stripe',(request,response)=>{

	console.log(request.body);

	var userId = request.body.userId;
	var spins = request.body.spins;
	
	var stripetoken = request.body.stripetoken;
	var amountPayable = request.body.amountPayable;
	var charge = stripe.charges.create({
		amount : amountPayable,
		currency : 'usd',
		description : 'Sample charge',
		source : stripetoken
	},function(err,charge){
		if(err){
			console.log(err);
			response.json({success: false, err: err})

		}else{
			console.log("success");
			var spinss = spinss + 5;
            admin.database().ref(`users/${userId}`).update({
			  spins: 5
			});
            response.json({success : true , message : charge});
		}
	})
})

app.use(router);

exports.stripe = functions.https.onRequest(app);
