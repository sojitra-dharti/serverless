const aws = require("aws-sdk");

const ses = new aws.SES();
aws.config.update({ region: "us-east-1" });


exports.handler = (event, context, callback) => {
  let message = JSON.parse(event.Records[0].Sns.Message);
  var params = {
    Destination: {
      ToAddresses: [message.email],
    },
    Message: {
      Body: {
        Text: { Data: "Click here : Link"  },
      },
      Subject: { Data: "Answer Posted for your question"},
    },
    Source: "noreply@prod.dhartisojitra.me",
  };
  return ses.sendEmail(params).promise()
};
