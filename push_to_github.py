"""Helper script to push the committed code to GitHub using your Personal Access Token (PAT).

Usage:
    python push_to_github.py <YOUR_GITHUB_TOKEN>
    # or just run it and enter token when prompted:
    python push_to_github.py
"""

import sys
import getpass
import dulwich.porcelain as p
from dulwich.repo import Repo

REPO_PATH = r"c:\Users\dell\Desktop\HEALTH_PREDICTOR"
REPO_URL = "https://github.com/palaktomar28/Sathi-Wellbeing-.git"

if len(sys.argv) > 1:
    token = sys.argv[1].strip()
else:
    token = input("Enter your GitHub Personal Access Token (with 'repo' scope): ").strip()

if not token:
    print("[!] No token provided. Exiting.")
    sys.exit(1)

auth_url = f"https://palaktomar28:{token}@github.com/palaktomar28/Sathi-Wellbeing-.git"

print(f"[*] Pushing 'main' branch to {REPO_URL} ...")
repo = Repo(REPO_PATH)

try:
    p.push(repo, auth_url, [b"refs/heads/main:refs/heads/main"])
    print("\n[✓] PUSH SUCCESSFUL! Your code is now live on GitHub:")
    print(f"    👉 {REPO_URL}\n")
except Exception as e:
    print(f"\n[!] Push failed: {e}")
    print("[*] Retrying with force=True in case the remote repository already had default files...")
    try:
        p.push(repo, auth_url, [b"refs/heads/main:refs/heads/main"], force=True)
        print("\n[✓] FORCE PUSH SUCCESSFUL! Your code is now live on GitHub:")
        print(f"    👉 {REPO_URL}\n")
    except Exception as e2:
        print(f"\n[❌] Error pushing: {e2}")
        print("Please check that your token has 'repo' write permissions on github.com.")
