# Push to GitHub/GitLab/Bitbucket

## Step 1: Add Remote Repository

Replace `<your-repo-url>` with your actual repository URL:

```powershell
git remote add origin <your-repo-url>
```

Examples:
- GitHub: `https://github.com/username/repo-name.git`
- GitHub SSH: `git@github.com:username/repo-name.git`
- GitLab: `https://gitlab.com/username/repo-name.git`
- Bitbucket: `https://bitbucket.org/username/repo-name.git`

## Step 2: Push to Main Branch

```powershell
git push -u origin main
```

## If Repository Already Exists

If the remote repository already has commits, you may need to pull first:

```powershell
git pull origin main --allow-unrelated-histories
git push -u origin main
```

## Verify

Check your remote:
```powershell
git remote -v
```

## Quick Commands

```powershell
# Add remote (replace with your URL)
git remote add origin https://github.com/username/repo-name.git

# Push to main
git push -u origin main
```

