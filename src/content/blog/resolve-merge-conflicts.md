---
title: "Resolve Merge Conflicts and Merge It: A Practical Guide to Git Conflict Resolution"
description: "A developer's guide to understanding, preventing, and resolving Git merge conflicts with confidence"
publishedAt: 2026-06-28
---

## Why Merge Conflicts Happen

Merge conflicts are a rite of passage for every developer working in a team. They happen when Git cannot automatically reconcile changes made to the same part of a file by different contributors. Git is remarkably good at merging — it handles most merges silently — but when two people modify the same lines in conflicting ways, it stops and asks for human judgment.

Conflicts arise in two main scenarios: when merging branches and when rebasing. In both cases, the root cause is the same — Git encounters changes that overlap and cannot decide which version is correct. Understanding this helps demystify the experience; you're not fighting Git, you're providing the information Git needs to complete the operation.

## Anatomy of a Conflict

When a conflict occurs, Git marks the conflicted file with special markers. Here's what they look like:

```text
<<<<<<< HEAD
console.log("This is our version of the code");
=======
console.log("This is their version of the code");
>>>>>>> feature-branch
```

- `<<<<<<< HEAD` marks the beginning of **your** version (the current branch).
- `=======` separates the two conflicting changes.
- `>>>>>>> feature-branch` marks the end of **their** version (the incoming branch).

Your job is to edit the file, decide what the final code should look like, remove the conflict markers, and stage the resolved file.

## Step-by-Step: Resolving a Merge Conflict

### 1. Identify the Conflict

After running `git merge` (or `git rebase`) and hitting a conflict, check which files need attention:

```bash
git status
```

Files listed under "both modified" or "both added" are conflicted. Unmerged paths are the ones you need to resolve.

### 2. Open and Understand the Conflict

Open each conflicted file and look for the conflict markers. Before making changes, understand what each side intended:

```bash
# See what changes your branch introduced
git log --oneline HEAD..MERGE_HEAD

# See what changed in the conflicted file on each side
git diff --ours   # Your changes
git diff --theirs # Their changes
```

For deeper context, use `git log` with the conflict markers:

```bash
git log --merge -p path/to/file
```

### 3. Choose Your Resolution Strategy

Every conflict resolution falls into one of three approaches:

**Accept one side entirely** — Use when you know one version is correct and the other should be discarded:

```bash
# Keep our version (current branch)
git checkout --ours -- path/to/file

# Keep their version (incoming branch)
git checkout --theirs -- path/to/file

git add path/to/file
```

**Manually edit the file** — The most common approach. Open the file in your editor, combine the changes thoughtfully, and remove all conflict markers:

```text
<<<<< HEAD
function calculateTotal(items) {
  return items.reduce((sum, item) => sum + item.price, 0);
======
function calculateTotal(items) {
  const subtotal = items.reduce((sum, item) => sum + item.price, 0);
  return subtotal + applyTax(subtotal);
>>>>>> feature/tax
```

Resolved:

```javascript
function calculateTotal(items) {
  const subtotal = items.reduce((sum, item) => sum + item.price, 0);
  return subtotal + applyTax(subtotal);
}
```

**Use a merge tool** — For complex conflicts, visual diff tools make resolution easier:

```bash
# Configure a merge tool (one-time setup)
git config merge.tool vimdiff

# Launch the merge tool
git mergetool
```

Popular merge tools include Vimdiff, Meld, Beyond Compare, and VS Code's built-in merge editor.

### 4. Stage the Resolved Files

Once you've edited the file and removed all conflict markers:

```bash
git add path/to/file
```

The file is now staged as resolved.

### 5. Complete the Merge

After resolving all conflicts and staging all files, finish the merge:

```bash
git merge --continue
```

A commit message template will open. Git prepopulates it with a standard merge message — save and exit to finalise.

Alternatively, you can commit directly:

```bash
git commit
```

If at any point you want to start over, you can abort entirely:

```bash
git merge --abort
```

## Conflict Resolution During Rebase

Resolving conflicts during a rebase follows the same process, but with one critical difference: the conflict markers are swapped. During a rebase, `HEAD` refers to the commit being replayed (theirs), and the incoming changes are yours:

```text
<<<<<<< HEAD
// This is the commit being replayed
=======
// This is your branch's change
>>>>>>> your-branch
```

After resolving conflicts during a rebase, use `git rebase --continue` instead of `git merge --continue`:

```bash
git add path/to/file
git rebase --continue
```

## Advanced Techniques

### Using `git rerere`

`rerere` (Reuse Recorded Resolution) is a powerful but lesser-known feature. When enabled, Git remembers how you resolved a conflict and automatically applies the same resolution if the conflict appears again:

```bash
# Enable rerere
git config --global rerere.enabled true
```

This is especially useful during rebasing, where the same conflict can appear across multiple commits.

### Configuring Diff3 Style

By default, conflict markers show only the two conflicting versions. With `diff3` style, Git also shows the common ancestor, giving you more context:

```bash
git config --global merge.conflictstyle diff3
```

The markers now look like this:

```text
<<<<<<< HEAD
console.log("Version A");
||||||| parent of abc123 (common ancestor)
console.log("Original version");
=======
console.log("Version B");
>>>>>>> feature-branch
```

Seeing the original helps you understand what both sides were trying to change.

### Ignoring Whitespace Conflicts

Whitespace differences — trailing spaces, indentation changes — are common but rarely meaningful. You can tell Git to ignore them:

```bash
git merge -Xignore-space-change feature-branch
```

Or for more aggressive whitespace ignoring:

```bash
git merge -Xignore-all-space feature-branch
```

## Preventing Conflicts

The best conflict is the one that never happens. Here are proven strategies to reduce conflict frequency:

**Pull from main frequently** — The longer your branch diverges, the more likely conflicts become. Pull or rebase onto the main branch daily.

**Keep feature branches short-lived** — A branch that lives for hours or days, not weeks, minimises drift. Aim for branches that last 1–3 days maximum.

**Break large files into smaller modules** — When two developers edit the same file, conflict risk rises. Smaller files with clear ownership reduce collisions naturally.

**Use consistent code formatting** — Automatic formatters like Prettier eliminate whitespace-only conflicts. Add formatting as a pre-commit hook or CI step.

**Communicate about shared code** — If you know a teammate is refactoring the same area, coordinate. A quick message can save an hour of conflict resolution.

To see which files in your project have the highest conflict potential, run a quick analysis of recent merges:

```bash
git log --all --merges --name-only --format="" | sort | uniq -c | sort -rn | head -10
```

This lists the files that have appeared in merge commits most frequently — your hot spots.

## Team Workflows That Minimise Conflicts

**Trunk-based development** is the most effective workflow for small teams. Everyone commits to a single main branch, and feature branches — if used at all — live only for hours. This eliminates long-lived divergence entirely.

When trunk-based development isn't feasible, use **short-lived feature branches with continuous integration**. Merge to main at least once per day, even if the feature isn't complete. Feature flags hide incomplete work from users while keeping the team's code in sync.

GitFlow, in contrast, introduces multiple long-lived branches (`develop`, `release`, `hotfix`) that increase the surface area for conflicts. It rarely pays off for teams of fewer than ten developers.

## Real-World Scenario

Let's walk through a realistic conflict and resolve it end-to-end.

Two developers are working on the same API endpoint. Developer A adds pagination to the `listUsers` function in `api/users.ts`, while Developer B adds filtering support.

A's commit:
```
git checkout -b feat/pagination
// Edits api/users.ts
function listUsers() {
  const page = req.query.page || 1;
  const limit = req.query.limit || 20;
  return db.users.find().skip((page - 1) * limit).limit(limit);
}
git commit -m "feat: add pagination to listUsers"
```

B's commit on main:
```
// Edits api/users.ts
function listUsers() {
  const filters = buildFilters(req.query);
  return db.users.find(filters);
}
git commit -m "feat: add filtering support to listUsers"
```

When A merges main into their branch:

```bash
git checkout feat/pagination
git merge main
```

Conflict appears in `api/users.ts`:

```text
<<<<<<< HEAD
  const page = req.query.page || 1;
  const limit = req.query.limit || 20;
  return db.users.find().skip((page - 1) * limit).limit(limit);
=======
  const filters = buildFilters(req.query);
  return db.users.find(filters);
>>>>>>> main
```

The resolution combines both features:

```javascript
function listUsers() {
  const page = req.query.page || 1;
  const limit = req.query.limit || 20;
  const filters = buildFilters(req.query);
  return db.users.find(filters).skip((page - 1) * limit).limit(limit);
}
```

Stage, continue, and the merge is complete.

## Conclusion

Merge conflicts are not a sign that something went wrong — they're Git's way of asking for human judgment when automation reaches its limit. Every conflict follows the same pattern: understand what both sides intended, combine the changes thoughtfully, remove the markers, and continue the merge.

The tools and techniques in this guide — conflict markers, `git mergetool`, `rerere`, `diff3` style, and prevention strategies — transform conflict resolution from a frustrating interruption into a routine, manageable task. The next time you see `CONFLICT (content)` in your terminal, you'll know exactly what to do.
