'use strict'
const AWS = require('aws-sdk');


const ses = new AWS.SES();
const documentClient = new AWS.DynamoDB.DocumentClient({region: REGION});

exports.handler = (event, context, callback)=>{
    console.log("Hello World");
};