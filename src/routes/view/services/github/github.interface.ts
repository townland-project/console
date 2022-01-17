export interface IRepository {
    id: number;
    node_id: string;
    name: string;
    full_name: string;
    private: boolean;
    owner: IOwner;
    html_url: string;
    description: string;
    fork: boolean;
    url: string;
    forks_url: string;
    keys_url: string;
    collaborators_url: string;
    teams_url: string;
    hooks_url: string;
    issue_events_url: string;
    events_url: string;
    assignees_url: string;
    branches_url: string;
    tags_url: string;
    blobs_url: string;
    git_tags_url: string;
    git_refs_url: string;
    trees_url: string;
    statuses_url: string;
    languages_url: string;
    stargazers_url: string;
    contributors_url: string;
    subscribers_url: string;
    subscription_url: string;
    commits_url: string;
    git_commits_url: string;
    comments_url: string;
    issue_comment_url: string;
    contents_url: string;
    compare_url: string;
    merges_url: string;
    archive_url: string;
    downloads_url: string;
    issues_url: string;
    pulls_url: string;
    milestones_url: string;
    notifications_url: string;
    labels_url: string;
    releases_url: string;
    deployments_url: string;
    created_at: Date;
    updated_at: Date;
    pushed_at: Date;
    git_url: string;
    ssh_url: string;
    clone_url: string;
    svn_url: string;
    homepage: string;
    size: number;
    stargazers_count: number;
    watchers_count: number;
    language: string;
    has_issues: boolean;
    has_projects: boolean;
    has_downloads: boolean;
    has_wiki: boolean;
    has_pages: boolean;
    forks_count: number;
    mirror_url: null;
    archived: boolean;
    disabled: boolean;
    open_issues_count: number;
    license: ILicense;
    allow_forking: boolean;
    is_template: boolean;
    topics: string[];
    visibility: string;
    forks: number;
    open_issues: number;
    watchers: number;
    default_branch: string;
    permissions: IPermissions;
}

export interface ILicense {
    key: string;
    name: string;
    spdx_id: string;
    url: string;
    node_id: string;
}

export interface IOwner {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    gravatar_id: string;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
    site_admin: boolean;
}

export interface IPermissions {
    admin: boolean;
    maintain: boolean;
    push: boolean;
    triage: boolean;
    pull: boolean;
}

export interface IRelease {
    url?: string;
    assets_url?: string;
    upload_url?: string;
    html_url?: string;
    id?: number;
    author?: IAuthor;
    node_id?: string;
    tag_name?: string;
    target_commitish?: string;
    name?: string;
    draft?: boolean;
    prerelease?: boolean;
    created_at?: Date;
    published_at?: Date;
    tarball_url?: string;
    zipball_url?: string;
    body?: string;
}
export interface IAuthor {
    login?: string;
    id?: number;
    node_id?: string;
    avatar_url?: string;
    gravatar_id?: string;
    url?: string;
    html_url?: string;
    followers_url?: string;
    following_url?: string;
    gists_url?: string;
    starred_url?: string;
    subscriptions_url?: string;
    organizations_url?: string;
    repos_url?: string;
    events_url?: string;
    received_events_url?: string;
    type?: string;
    site_admin?: boolean;
}

export interface IMe {
    login?:                     string;
    id?:                        number;
    node_id?:                   string;
    avatar_url?:                string;
    gravatar_id?:               string;
    url?:                       string;
    html_url?:                  string;
    followers_url?:             string;
    following_url?:             string;
    gists_url?:                 string;
    starred_url?:               string;
    subscriptions_url?:         string;
    organizations_url?:         string;
    repos_url?:                 string;
    events_url?:                string;
    received_events_url?:       string;
    type?:                      string;
    site_admin?:                boolean;
    name?:                      string;
    company?:                   null;
    blog?:                      string;
    location?:                  string;
    email?:                     string;
    hireable?:                  null;
    bio?:                       string;
    twitter_username?:          string;
    public_repos?:              number;
    public_gists?:              number;
    followers?:                 number;
    following?:                 number;
    created_at?:                Date;
    updated_at?:                Date;
    private_gists?:             number;
    total_private_repos?:       number;
    owned_private_repos?:       number;
    disk_usage?:                number;
    collaborators?:             number;
    two_factor_authentication?: boolean;
    plan?:                      IPlan;
}

export interface IPlan {
    name?:          string;
    space?:         number;
    collaborators?: number;
    private_repos?: number;
}
