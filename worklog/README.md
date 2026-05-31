# Worklog

Task logs are stored here.

## Manual log

Run:

```bash
node scripts/log-task.mjs "Task name" "Short summary" "done"
```

This creates or updates:

- `worklog/YYYY-MM-DD-auto-log.txt`

## Git hook log

This project includes a Git `post-commit` hook in `.githooks/post-commit`.

To enable it after Git is initialized:

```bash
git config core.hooksPath .githooks
chmod +x .githooks/post-commit
```

After that, each Git commit will add a worklog entry automatically.

## App limitation

The browser app cannot write directly to this folder.
This is a browser security rule.
For filesystem logs, use the local script or a hook.
