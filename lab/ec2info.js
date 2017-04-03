var AWS = require('aws-sdk');
AWS.config.loadFromPath('./config.json');
var ec2 = new AWS.EC2();

var task =  function(request, callback){

    var params = {
        DryRun: false,
        Filters: [
            {}
        ],
        InstanceIds: [
            'i-0d3676a28ef233641'
        ]
    };
	
    ec2.describeInstances(params, function(err, data) {
        if (err) {
            console.log(err, err.stack);
            return callback(err);
        }
        else {
            var result = data;
            /*var instanceData = data.Reservations[0].Instances[0];
            if(request.query.dns) {
                result = 'Public dns name: ' + instanceData.PublicDnsName;
            }
            if(request.query.zone) {
                result += '<br> Zone: ' + instanceData.Placement.AvailabilityZone;
            }
            if(request.query.ip) {
                result += '<br> Public ip: ' + instanceData.PublicIpAddress;
            }*/
            console.log(result);
            return callback(null, result);
        }
    });
};

exports.aws = task;