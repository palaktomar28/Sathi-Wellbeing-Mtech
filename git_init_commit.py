import os
import dulwich.porcelain as p
from dulwich.repo import Repo

repo_path = r"c:\Users\dell\Desktop\HEALTH_PREDICTOR"

# Check if .git exists
git_dir = os.path.join(repo_path, ".git")
if not os.path.exists(git_dir):
    print("Initializing git repository...")
    repo = p.init(repo_path)
else:
    print("Opening existing git repository...")
    repo = Repo(repo_path)

# Set default branch to main
repo.refs.set_symbolic_ref(b'HEAD', b'refs/heads/main')

# Add all files respecting .gitignore
print("Staging files...")
# Get list of files to add
p.add(repo)

status = p.status(repo)
staged_count = len(status.staged['add']) + len(status.staged['modify'])
print(f"Staged {staged_count} files/entries.")

# Commit
author = b"Palak Tomar <palaktomar2819@gmail.com>"
commit_id = p.commit(
    repo,
    message=b"Initial commit: saathi-wellbeing complete platform build",
    author=author,
    committer=author
)
print("Committed successfully! Commit hash:", commit_id.decode() if isinstance(commit_id, bytes) else commit_id)

# Set remote origin
remote_url = "https://github.com/palaktomar28/Sathi-Wellbeing-.git"
try:
    p.remote_add(repo, "origin", remote_url)
    print(f"Remote origin added: {remote_url}")
except Exception as e:
    print("Remote add info:", e)

print("Repository initialized and committed on main branch!")
