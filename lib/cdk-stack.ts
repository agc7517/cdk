import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';
import {aws_s3 as s3} from 'aws-cdk-lib';
import { SubnetType, Vpc } from 'aws-cdk-lib/aws-ec2';
import cluster from 'cluster';
import { Cluster, FargateTaskDefinition, TaskDefinition } from 'aws-cdk-lib/aws-ecs';
import { cpuUsage } from 'process';

export class CdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
    // new s3.Bucket(this, 'MyFirstBucket', {
    //   versioned: true,
    //   autoDeleteObjects: true,
    //   removalPolicy: cdk.RemovalPolicy.DESTROY,
    //   bucketName: 'asquaredotdev'
    // });


    const vpc = new Vpc(this, 'dotvpc', {
      vpcName:'dot-vpc',
      cidr: '10.0.0.0/16',
      natGateways: 1,
      maxAzs: 2,
      subnetConfiguration: [
        {
          name: 'dot-private-subnet-1',
          subnetType: SubnetType.PRIVATE_WITH_EGRESS,
          cidrMask: 24,
        },
        {
          name: 'dot-public-subnet-1',
          subnetType: SubnetType.PUBLIC,
          cidrMask: 24,
        }
      ]
    });

    const cluster = new Cluster(this, 'dot-cluster', {
      vpc: vpc,
    });

    const taskDef = new FargateTaskDefinition(this, 'dot-task-def', {
      cpu: 256,
      memoryLimitMiB: 512,
      
    });

    


    // example resource
    // const queue = new sqs.Queue(this, 'CdkQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });
  }
}
