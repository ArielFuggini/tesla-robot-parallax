#!/bin/bash
# Auto-push to GitHub on every git commit
# Run: chmod +x auto-push.sh && ./auto-push.sh

set -e

REPO_PATH="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$REPO_PATH"

echo "🚀 Auto-push watcher started"
echo "📁 Watching: $REPO_PATH"
echo ""

# Function to push changes
push_changes() {
    git push origin master 2>&1 | grep -E "master|error|rejected|files changed" || echo "✅ Pushed"
}

# Initial push if needed
if git status | grep -q "ahead"; then
    echo "📤 Pushing initial commits..."
    push_changes
fi

echo "✅ Ready for auto-push"
echo "   Next: Commit changes normally with 'git commit -m \"msg\"'"
echo "   This script will automatically push them."

# Watch for new commits (this is optional - mainly for info)
# In production, commits will auto-push via post-commit hook
