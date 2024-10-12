---
layout: post
title: "Git Practice 02"
description: 
date: 2024-09-20
categories: git
---


## 1.1 What is Git

Git is a ditributed version control system that stores codes.
Git is a list of code modifying records (time arthor place content).

![git-three-main-components](/assets/post-images/git/git-three-components.png)

## 1.2 Manipulation

### 1.2.1 Add files into repository

```
git add
git commit -m

// check status and result
git status
git diff
```

### 1.2.2 Version revert

```
// version list
git log
git reflog
git log --pretty=oneline

git reset --hard HEAD~[n]
```

### 1.2.3 Cancel modification (uncommited)

```
git checkout [filename]
```

- unversioned : revert to last committed
- versioned : revert to last versioned

### 1.2.4 Delete files

```
rm file
git add
git commit -m
```

### 1.2.5 Remote repository

```
git remote add origin [url] | git clone
git push origin [main]
git pull origin [main]
```

### 1.3 Branch and Practice

branch is a timeline of repository

```
git branch [branch_name]
git branch -d [branch_name]
git checkout [branch_name]
git merge [branch_name]
```

### 1.3.1 local dev branch

```
git branch dev_branch
git checkout dev_branch
==> git checkout -b dev_branch

git add
git commit -m

git checkout main_branch
git merge --no-ff -m "message"
```

### 1.3.2 local bug branch

```
git stash

git checkout -b bug_branch
git chechout bug_branch
git add
git commit
git checkout main_branch
git merge --no-ff -m "" bug_branch

git stash pop | git stash apply
```

### 1.3.3 Remote dev&bug branch

```
git remote -v
```

For developer1 : 

```
git checkout -b dev origin/dev
git add 
git commit -m
git push origin dev
```

But for developer2 : 

```
git branch --set-upstream dev origin/dev
git pull
```