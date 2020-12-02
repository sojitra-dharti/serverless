## Lambda Function

# Usage of Serverless repository

1. Index.js file has code of lambda function.
2. Lambda function will be invoked by SNS.
3. Github actions will deploy new zip file containing index.js in s3 bucket and update lambda function.
