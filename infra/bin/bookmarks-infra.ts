#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "@aws-cdk/core";
import { BookmarksInfraStack } from "../lib/bookmarks-infra-stack";

const app = new cdk.App();
new BookmarksInfraStack(app, "BookmarksInfraStack");
