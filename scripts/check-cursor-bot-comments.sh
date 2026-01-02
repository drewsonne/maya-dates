#!/bin/bash
# Script to check for Cursor bot comments on GitHub PRs
# Usage: ./scripts/check-cursor-bot-comments.sh [PR_NUMBER]

set -e

PR_NUMBER=${1:-""}

if [ -z "$PR_NUMBER" ]; then
  echo "Usage: $0 <PR_NUMBER>"
  echo "Example: $0 52"
  exit 1
fi

# Check if gh CLI is available
if ! command -v gh &> /dev/null; then
  echo "Error: GitHub CLI (gh) is not installed"
  echo "Install it from: https://cli.github.com/"
  exit 1
fi

# Check authentication
if ! gh auth status &> /dev/null; then
  echo "Error: GitHub CLI is not authenticated"
  echo "Run: gh auth login"
  exit 1
fi

echo "Checking Cursor bot comments on PR #$PR_NUMBER..."
echo ""

# Get review comments from Cursor bot using GitHub API
REPO=$(gh repo view --json nameWithOwner -q .nameWithOwner)

# Get review comments (these are the code review comments, not PR comments)
COMMENTS=$(gh api "repos/$REPO/pulls/$PR_NUMBER/comments" --jq '.[] | select(.user.login == "cursor") | {path: .path, line: .line, body: .body, severity: (if .body | contains("High Severity") then "high" elif .body | contains("Low Severity") then "low" else "unknown" end)}')

# Also check review threads (which contain review comments)
if [ -z "$COMMENTS" ]; then
  # Try getting review threads and extract comments from them
  REVIEW_THREADS=$(gh api "repos/$REPO/pulls/$PR_NUMBER/comments" --paginate --jq '.[] | select(.user.login == "cursor") | {path: .path, line: .line, body: .body, severity: (if .body | contains("High Severity") then "high" elif .body | contains("Low Severity") then "low" else "unknown" end)}')
  COMMENTS="$REVIEW_THREADS"
fi

if [ -z "$COMMENTS" ]; then
  echo "✅ No Cursor bot comments found on PR #$PR_NUMBER"
  exit 0
fi

# Count comments
COMMENT_COUNT=$(echo "$COMMENTS" | jq -s 'length')
echo "Found $COMMENT_COUNT Cursor bot comment(s):"
echo ""

# Display comments
echo "$COMMENTS" | jq -s -r '.[] |
  "📝 " + .path + (if .line then ":" + (.line | tostring) else "" end) + " [" + .severity + " severity]\n" +
  .body + "\n" +
  "---\n"
'

# Check for high severity issues
HIGH_SEVERITY=$(echo "$COMMENTS" | jq -s '[.[] | select(.severity == "high")] | length')

if [ "$HIGH_SEVERITY" -gt 0 ]; then
  echo ""
  echo "⚠️  WARNING: $HIGH_SEVERITY high severity issue(s) found!"
  exit 1
fi

exit 0

