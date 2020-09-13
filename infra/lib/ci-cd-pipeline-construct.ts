import * as cdk from "@aws-cdk/core";
import * as codeCommit from "@aws-cdk/aws-codecommit";
import * as codeBuild from "@aws-cdk/aws-codebuild";
import * as codePipeline from "@aws-cdk/aws-codepipeline";
import * as codePipelineActions from "@aws-cdk/aws-codepipeline-actions";
import * as s3 from "@aws-cdk/aws-s3";

export interface CiCdPipelineConstructProps {
  repositoryProps: codeCommit.RepositoryProps;
  pipelineProps?: codePipeline.PipelineProps;
  sourceActionProps?: codePipelineActions.CodeCommitSourceActionProps;
  buildProjectProps?: codePipelineActions.CodeBuildActionProps;
  buildActionProps?: codePipelineActions.CodeBuildActionProps;
  manualApproval?: boolean;
  manualApprovalActionProps?: codePipelineActions.ManualApprovalActionProps;
  deployActionProps?: codePipelineActions.S3DeployActionProps;
  deployBucketProps?: s3.BucketProps;
}

export class CiCdPipelineConstruct extends cdk.Construct {
  constructor(
    scope: cdk.Construct,
    id: string,
    {
      repositoryProps,
      pipelineProps,
      sourceActionProps,
      buildProjectProps,
      buildActionProps,
      manualApprovalActionProps,
      manualApproval,
      deployActionProps,
      deployBucketProps
    }: CiCdPipelineConstructProps
  ) {
    super(scope, id);

    const repository = new codeCommit.Repository(
      this,
      `${id}Repository`,
      repositoryProps || {}
    );

    const pipeline = new codePipeline.Pipeline(
      this,
      `${id}Pipeline`,
      pipelineProps
    );

    const sourceOutput = new codePipeline.Artifact();

    const sourceAction = new codePipelineActions.CodeCommitSourceAction({
      ...(sourceActionProps || {}),
      actionName: "Source",
      repository,
      output: sourceOutput
    });

    pipeline.addStage({
      stageName: "Source",
      actions: [sourceAction]
    });

    const buildProject = new codeBuild.PipelineProject(
      this,
      `${id}BuildProject`,
      {
        ...{
          buildSpec: codeBuild.BuildSpec.fromObject({
            version: "0.2",
            phases: {
              test: { commands: ["yarn install", "yarn test"] },
              build: { commands: ["yarn build"] }
            }
          })
        },
        ...(buildProjectProps || {})
      }
    );

    const buildOutput = new codePipeline.Artifact();

    const buildAction = new codePipelineActions.CodeBuildAction({
      ...(buildActionProps || {}),
      input: sourceOutput,
      actionName: "Build",
      outputs: [buildOutput],
      project: buildProject,
      type: codePipelineActions.CodeBuildActionType.BUILD
    });

    pipeline.addStage({ stageName: "Build", actions: [buildAction] });

    if (manualApproval) {
      const manualApprovalAction = new codePipelineActions.ManualApprovalAction(
        {
          ...(manualApprovalActionProps || {}),
          actionName: "Manual approval"
        }
      );

      pipeline.addStage({
        stageName: "Manual approval",
        actions: [manualApprovalAction]
      });
    }

    const deployBucket = new s3.Bucket(this, `${id}DeployBucket`, {
      ...(deployBucketProps || {})
    });

    const deployAction = new codePipelineActions.S3DeployAction({
      ...(deployActionProps || {}),
      actionName: "Deploy",
      input: buildOutput,
      bucket: deployBucket
    });

    pipeline.addStage({ stageName: "Deploy", actions: [deployAction] });
  }
}
