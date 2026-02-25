import * as cdk from "aws-cdk-lib";
import { aws_lambda as lambda } from "aws-cdk-lib";
import * as path from "path";
import * as s3 from "aws-cdk-lib/aws-s3";
import * as s3n from "aws-cdk-lib/aws-s3-notifications";

export class HelloCdkStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props); // call parent constructor from hello-cdk.ts

    //below was not included in the book, but was in the Offical GitHub repo

    // Create an S3 bucket
    const helloCdkS3Bucket = new s3.Bucket(this, "HelloCdkS3Bucket");

    // Create Lambda function to generate greeting
    const helloCdkLambdaFunction = new lambda.Function(this, "HelloCdkLambda", {
      runtime: lambda.Runtime.NODEJS_18_X,
      handler: "index.main",
      code: lambda.Code.fromAsset(
        path.join(__dirname, "./lambda/lambda-hello-cdk")
      ),
    });

    // Output S3 bucket name
    new cdk.CfnOutput(this, "bucketName", {
      value: helloCdkS3Bucket.bucketName,
    });
  }
}
