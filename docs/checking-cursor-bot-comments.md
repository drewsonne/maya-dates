# Checking Cursor Bot Comments

Cursor bot automatically reviews PRs and leaves comments on potential issues. Here's how to check them:

## Using GitHub CLI

The simplest way is to use the GitHub MCP API (if available) or check the PR directly:

```bash
# View PR and check for review comments
gh pr view <PR_NUMBER> --web

# Or use the GitHub API directly
gh api repos/drewsonne/maya-dates/pulls/<PR_NUMBER>/comments --jq '.[] | select(.user.login == "cursor")'
```

## Using the Script

We have a helper script at `scripts/check-cursor-bot-comments.sh`:

```bash
./scripts/check-cursor-bot-comments.sh <PR_NUMBER>
```

Note: This script may need updates based on GitHub API changes.

## Manual Check

1. Open the PR on GitHub
2. Scroll to the "Files changed" tab
3. Look for comments from user "cursor"
4. Review each comment for severity (High/Low)

## Common Issues

- **High Severity**: Bugs that could cause incorrect behavior - fix immediately
- **Low Severity**: Code quality issues, accidental commits, etc. - fix before merging

## Automation

You can add this to your CI/CD pipeline or as a pre-commit hook to automatically check for Cursor bot comments before merging.

