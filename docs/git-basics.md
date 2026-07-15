# Git Basics

> Git is not only a version control system.
> Git is the history of your project.

---

**Author** : Ikhwan Puji Indratno

**Project** : CapyDB

---

# Level 1 — Daily Commands

## 1. `git status`

### Function

Show the current status of the working directory.

### Use When

- Check modified files.
- Check staged files.
- Check branch status.
- Check if the working tree is clean.

### Example

```bash
git status
```

---

## 2. `git add`

### Function

Move file changes from the Working Directory to the Staging Area.

### Use When

- Select files for the next commit.
- Prepare changes before committing.

### Example

```bash
git add README.md
```

or

```bash
git add .
```

---

## 3. `git diff`

### Function

Show differences between the Working Directory and the Staging Area.

### Use When

- Review changes before staging.

### Example

```bash
git diff
```

---

## 4. `git diff --cached`

### Function

Show differences that have already been staged.

### Use When

- Review staged changes before committing.

### Example

```bash
git diff --cached
```

---

## 5. `git commit`

### Function

Save staged changes into the Local Repository.

### Use When

- Create a logical checkpoint.
- Record completed work.

### Example

```bash
git commit -m "Initialize CapyDB foundation"
```

---

## 6. `git push`

### Function

Upload local commits to the remote repository.

### Use When

- Share changes.
- Backup work to GitHub.

### Example

```bash
git push
```

---

# Level 2 — History & Investigation

## 7. `git log`

### Function

Show commit history.

### Useful Options

```bash
git log
git log --oneline
git log --graph --oneline --decorate
```

### Use When

- Review project history.
- Find previous commits.

---

## 8. `git show`

### Function

Show detailed information about a commit.

### Use When

- Inspect commit contents.
- Review changed files.

### Example

```bash
git show
```

or

```bash
git show <commit-id>
```

---

## 9. `git blame`

### Function

Show which commit last modified each line of a file.

### Use When

- Investigate bugs.
- Understand file history.

### Example

```bash
git blame README.md
```

---

## 10. `git log <file>`

### Function

Show commit history for a specific file.

### Use When

- Track changes to one file only.

### Example

```bash
git log README.md
```

---

## 11. `git diff <commit>`

### Function

Compare commits.

### Use When

- Review differences between versions.

### Example

```bash
git diff HEAD~1
```

or

```bash
git diff 577a562 cc37ba6
```

---

# Level 3 — Version Management

## 12. `git tag`

### Function

Mark important milestones.

### Use When

- Release versions.
- Milestone completion.

### Example

```bash
git tag v0.1.0
```

---

# Level 4 — Branching

## 13. `git branch`

### Function

Create or manage branches.

### Use When

- Develop features independently.
- Isolate experiments.

### Example

```bash
git branch
```

```bash
git branch feature/sql-generator
```

---

## 14. `git merge`

### Function

Combine changes from another branch.

### Use When

- Finish a feature.
- Integrate work into `main`.

### Example

```bash
git merge feature/sql-generator
```

---

## 15. `git rebase`

### Function

Reapply commits onto another branch to create a cleaner history.

### Use When

- Keep history linear.
- Update feature branch from `main`.

### Example

```bash
git rebase main
```

---

# Level 5 — Advanced Operations

## 16. `git stash`

### Function

Temporarily save uncommitted changes.

### Use When

- Switch tasks quickly.
- Pull latest changes without committing.

### Example

```bash
git stash
```

---

## 17. `git revert`

### Function

Undo a commit by creating a new commit.

### Use When

- Safely undo changes in shared repositories.

### Example

```bash
git revert <commit-id>
```

---

## 18. `git cherry-pick`

### Function

Copy a specific commit from another branch.

### Use When

- Reuse one commit without merging everything.

### Example

```bash
git cherry-pick <commit-id>
```

---

# CapyDB Git Workflow

```text
Working Directory
        │
        ▼
git status
        │
        ▼
git diff
        │
        ▼
git add
        │
        ▼
git diff --cached
        │
        ▼
git commit
        │
        ▼
git push
        │
        ▼
GitHub
```

---

# Engineering Principle

> **Every Commit Tells a Story.**

A commit should represent one meaningful change.

Good commit messages make project history understandable, traceable, and explainable.