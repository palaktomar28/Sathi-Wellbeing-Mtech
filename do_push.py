import os
import sys
import ctypes
from ctypes import wintypes
import dulwich.porcelain as p
from dulwich.repo import Repo

# 1. Retrieve credential from Windows Credential Manager
advapi32 = ctypes.windll.advapi32
CRED_TYPE_GENERIC = 1

class CREDENTIAL(ctypes.Structure):
    _fields_ = [
        ('Flags', wintypes.DWORD),
        ('Type', wintypes.DWORD),
        ('TargetName', wintypes.LPWSTR),
        ('Comment', wintypes.LPWSTR),
        ('LastWritten', wintypes.FILETIME),
        ('CredentialBlobSize', wintypes.DWORD),
        ('CredentialBlob', ctypes.POINTER(ctypes.c_byte)),
        ('Persist', wintypes.DWORD),
        ('AttributeCount', wintypes.DWORD),
        ('Attributes', ctypes.c_void_p),
        ('TargetAlias', wintypes.LPWSTR),
        ('UserName', wintypes.LPWSTR),
    ]

PCREDENTIAL = ctypes.POINTER(CREDENTIAL)
CredRead = advapi32.CredReadW
CredRead.argtypes = [wintypes.LPCWSTR, wintypes.DWORD, wintypes.DWORD, ctypes.POINTER(PCREDENTIAL)]
CredRead.restype = wintypes.BOOL
CredFree = advapi32.CredFree
CredFree.argtypes = [ctypes.c_void_p]

pcred = PCREDENTIAL()
target = "git:https://github.com"
token = None
username = "palaktomar28"

if CredRead(target, CRED_TYPE_GENERIC, 0, ctypes.byref(pcred)):
    cred = pcred.contents
    username = cred.UserName or username
    blob = ctypes.string_at(cred.CredentialBlob, cred.CredentialBlobSize)
    token = blob.decode('utf-16-le', errors='ignore')
    if not token or not token.isprintable():
        token = blob.decode('utf-8', errors='ignore')
    CredFree(pcred)
    print(f"[✓] Retrieved stored GitHub credentials for user: {username}")
else:
    print("[!] CredRead failed. Check Windows Credential Manager.")
    sys.exit(1)

# 2. Stage all files
repo_path = r"c:\Users\dell\Desktop\HEALTH_PREDICTOR"
repo = Repo(repo_path)

print("[*] Staging files for commit...")
# Remove any nonexistent files from index
index = repo.open_index()
to_delete = []
for entry in index:
    full_path = os.path.join(repo_path, entry.decode('utf-8'))
    if not os.path.exists(full_path):
        to_delete.append(entry)

for entry in to_delete:
    del index[entry]
index.write()

# Add all current files respecting .gitignore
p.add(repo)

status = p.status(repo)
print(f"[*] Staged additions: {len(status.staged['add'])}, modifications: {len(status.staged['modify'])}, deletions: {len(status.staged['delete'])}")

# 3. Commit
author = b"Palak Tomar <palaktomar2819@gmail.com>"
commit_id = p.commit(
    repo,
    message=b"Initial commit: complete saathi-wellbeing platform build",
    author=author,
    committer=author
)
print(f"[✓] Commit created: {commit_id.decode() if isinstance(commit_id, bytes) else commit_id}")

# 4. Set branch main
repo.refs.set_symbolic_ref(b'HEAD', b'refs/heads/main')
head_sha = repo.head()
repo.refs[b'refs/heads/main'] = head_sha
print(f"[✓] Branch 'main' points to {head_sha.decode()}")

# 5. Push to GitHub
auth_remote_url = f"https://{username}:{token}@github.com/palaktomar28/Sathi-Wellbeing-.git"
print(f"[*] Pushing main branch to https://github.com/palaktomar28/Sathi-Wellbeing-.git ...")

try:
    result = p.push(repo, auth_remote_url, [b"refs/heads/main:refs/heads/main"])
    print("[✓] PUSH SUCCESSFUL!")
    print("Push result:", result)
except Exception as e:
    print("[!] Push encountered an error:", type(e).__name__, e)
    # Check if remote repository has existing commits (e.g. initial README) that require force push
    print("[*] Trying with force=True in case remote has default initial files...")
    try:
        result = p.push(repo, auth_remote_url, [b"refs/heads/main:refs/heads/main"], force=True)
        print("[✓] FORCE PUSH SUCCESSFUL!")
        print("Push result:", result)
    except Exception as e2:
        print("[!] Force push error:", type(e2).__name__, e2)
        sys.exit(1)

# Ensure remote 'origin' in config does not store the token in plain text
config = repo.get_config()
config.set((b'remote', b'origin'), b'url', b'https://github.com/palaktomar28/Sathi-Wellbeing-.git')
config.set((b'remote', b'origin'), b'fetch', b'+refs/heads/*:refs/remotes/origin/*')
config.write_to_path()
print("[✓] Remote origin set cleanly in .git/config")
