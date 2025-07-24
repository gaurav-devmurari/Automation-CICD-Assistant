export interface AzurePipeline {
  nodeVersion: string; // Node.js version, e.g., '20.00.00' or 'latest'
  trigger: string[]; // Array of branches to trigger the pipeline
  azure_stages: AzureStage[]; // Array of Azure stages
}

export interface AzureStage {
  stage: string; // Name of the stage
  displayName: string; // Display name for the stage
  jobs: AzureJob[]; // Array of jobs in this stage
}

export interface AzureJob {
  job: string; // Job identifier
  displayName: string; // Display name for the job
  pool: AzurePool; // Pool configuration
  steps: AzureStep[]; // Array of steps in the job
}

export interface AzurePool {
  vmImage: string; // VM image, e.g., 'ubuntu-latest'
}

export interface AzureStep {
  script: string; // Script command to execute
  displayName: string; // Display name for the step
}

// ==================================================== //

export interface BitbucketPipeline {
  nodeVersion: string; // Node.js version, e.g., '20.00.00', '18'
  selectedActions: BitBucketSelectedAction[]; // Array of selected actions
}

export interface BitBucketSelectedAction {
  type: 'branch' | 'tag'; // Type of action: branch or tag
  name: string; // Name of the branch or tag
  steps: BitBucketStep[]; // Array of steps for this action
}

export interface BitBucketStep {
  stepName: string; // Name of the step, e.g., 'install'
  actions: string[]; // Array of commands, e.g., ['npm install']
}

// ==================================================== //
export interface GitLabPipeline {
  nodeVersion: string;
  stages: string[];
  rules: Record<string, GitLabRule[]>;
  jobs: GitLabJob[];
  rule_name?: string[];
}

export interface GitLabRule {
  key: string;
  value: string;
}

export interface GitLabJob {
  jobName: string;
  stage: string;
  script: string;
  rule: string;
}

// ==================================================== //

export interface GitHubPipeline {
  nodeVersion: string;
  github_name: string;
  on: GitHubTriggers;
  git_jobs: GitHubJob[];
}

export interface GitHubTriggers {
  push?: GitHubBranchTrigger;
  pull?: GitHubBranchTrigger;
  pull_request?: GitHubBranchTrigger;
}

export interface GitHubBranchTrigger {
  branches: string[];
}

export interface GitHubJob {
  build: GitHubBuild;
}

export interface GitHubBuild {
  'runs-on': string;
  steps: GitHubStep[];
}

export interface GitHubStep {
  name: string;
  Use?: string;
  Run?: string;
}
