const aws = require("aws-sdk");
const ses = new aws.SES();
const dynamo = new aws.DynamoDB.DocumentClient();
aws.config.update({ region: "us-east-1" });


exports.handler = (event, context, callback) => {
  
let message = JSON.parse(event.Records[0].Sns.Message);
 
  var searchParams = {
    TableName: "csye6225",
    Key: {
      email_id:message.Email+message.QuesId+message.AnsId+message.Action+message.Answer
    }
  };
    var dynamoparams = {
          Item: {
            email_id: message.Email+message.QuesId+message.AnsId+message.Action+message.Answer
          },
          TableName: "csye6225"
        };

  dynamo.get(searchParams, function(error, result) {
        if (error) {
          
     
    } else {
 
   
      if (result.Item == null || result.Item == undefined) {
        dynamo.put(dynamoparams, function(error, data) {
          if (error) {
          
          } 
          else{
             var params = {
                Destination: {
                  ToAddresses: [message.Email],
                },
                Message: {
                  Body: {
                    Text: { Data: "Click here  " + message.URL},
                  },
                  Subject: { Data: message.Action},
                },
                Source: "donotreply-webapp@" + message.DOMAIN,
              };
              return ses.sendEmail(params).promise();
          }
          
        });
        
      } 
     
    }
  });
};