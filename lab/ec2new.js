var AWS = require('aws-sdk');
AWS.config.loadFromPath('./config.json');
var ec2 = new AWS.EC2();

var task =  function(request, callback){
    if(request.body.number && request.body.number > 0 && request.body.number <= 2) {
        var numberInstance = request.body.number;
    } else {
       return callback('invalid number param. Only 1 and 2 are valid')
    }
    var isTest = request.body.isTest === 'on';
    var params = {
            ImageId: 'ami-5017a730', /* required */
            MaxCount: numberInstance , /* required */
            MinCount: 1, /* required */
            DisableApiTermination: false,
            KeyName: 'Node.js klucz',
            DryRun: isTest, /* Checks whether you have the required permissions, doesn't perform request if it's set to true */
            InstanceInitiatedShutdownBehavior: 'terminate',
            InstanceType:  't2.micro',
            SecurityGroupIds: [
                'sg-adf905d6',
            ],
            Monitoring: {
                Enabled: false /* required */
            },
            Placement: {
                AvailabilityZone: 'us-west-2a',
            }
    };

    ec2.runInstances(params, function(err, data) {
        if (err) {
            console.log(err, err.stack);
            return callback(err);
        }
        else {
            console.log(data);
            var instanceData = data.Instances[0];
            var result = 'InstanceId: ' + instanceData.InstanceId;
            result += '<br> PrivateDnsName: ' + instanceData.PrivateDnsName;
            result += '<br> State: ' + instanceData.State.Name;

            if(numberInstance == 2) {
                instanceData = data.Instances[1];
                result += '<br>------------------<br>';
                result += 'InstanceId: ' + instanceData.InstanceId;
                result += '<br> PrivateDnsName: ' + instanceData.PrivateDnsName;
                result += '<br> State: ' + instanceData.State.Name;
            }
            return callback(null, result);
        }
    });
};

exports.aws = task;