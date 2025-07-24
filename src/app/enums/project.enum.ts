export enum Repository {
  Bitbucket = 'Bitbucket',
  GitLab = 'GitLab',
  GitHub = 'GitHub',
  Azure = 'Azure',
}

export enum Provider {
  Bitbucket = 'bitbucket',
  GitLab = 'gitlab',
  GitHub = 'github',
  Azure = 'azure',
}

export const PROJECT_TYPE_OPTIONS: Record<string, string> = {
  NodeJs: 'Node.js',
  Angular: 'Angular',
  React: 'React',
  NestJs: 'Nest.js',
  NextJs: 'Next.js',
  'dotnet-core': '.NET Core',
  Java: 'Java',
  Python: 'Python',
};

export const VCS_VERSION_TYPES: Record<string, string> = {
  NodeJs: 'Node Version',
  Angular: 'Node Version',
  React: 'Node Version',
  NestJs: 'Node Version',
  VueJs: 'Node Version',
  'dotnet-core': '.NET SDK Version',
  Java: 'JDK Version',
  Python: 'Python Version',
};
