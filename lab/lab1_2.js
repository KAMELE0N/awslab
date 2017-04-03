//stub for lab 1_2
var AWS = require('aws-sdk');
var ec2 = new AWS.EC2();
var params = {};

AWS.config.loadFromPath('./config.json');

var task =  function(request, callback){
	
	ec2.describeInstances(params, function(err, data) {
	  if (err) console.log(err, err.stack); // an error occurred
	  else     console.log(data);           // successful response
	
}

exports.lab = task