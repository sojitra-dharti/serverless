const aws = require("aws-sdk");
const ses = new aws.SES();
const dynamo = new aws.DynamoDB.DocumentClient();
aws.config.update({ region: "us-east-1" });


exports.handler = (event, context, callback) => {
  var message = JSON.parse(event.Records[0].Sns.Message);
  var uniqueKey = message.Email + message.QuesId + message.AnsId + message.Action + message.Answer;

  var searchParams = {
    TableName: "csye6225",
    Key: {
      email_id: uniqueKey
    }
  };
  var dynamoparams = {
    Item: {
      email_id: uniqueKey
    },
    TableName: "csye6225"
  };

  dynamo.get(searchParams, function (error, result) {
    if (error) {
    } else {
      if (!result.Item) {
        dynamo.put(dynamoparams, function (error, data) {
          if (error) {
          }
          else {
            var params = {
              Destination: {
                ToAddresses: [message.Email],
              },
              Message: {
                Body: {
                  Text: { Data: message.URL },
                },
                Subject: { Data: message.Action },
              },
              Source: message.Domain,
            };
            return ses.sendEmail(params).promise();
          }
        });
      }
    }
  });
};