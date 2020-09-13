import * as cdk from "@aws-cdk/core";

import * as ciCdPipeline from "./ci-cd-pipeline-construct";

export class BookmarksInfraStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    new ciCdPipeline.CiCdPipelineConstruct(this, "BookmarksPipeline", {
      repositoryProps: { repositoryName: "bookmarks" },
      manualApproval: true
    });
  }
}
