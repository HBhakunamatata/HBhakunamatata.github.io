---
layout: post
title: "Maven Config"
description: 
date: 2025-07-29
categories: Maven
---


## 1. Local Repository

```xml
<localRepository>D:\Maven\local-repository</localRepository>
```

## 2. Security and Deployment Settings

In project __distributionManagement__ without username and password 

you should add a server definition to your own settings with an id that matches that of the deployment repository in the project.

## 3. Mirrors of Repositories

### 3.1 Why use mirror?

1. a synchronized mirror on the internet that is geographically closer and faster
2. replace a particular repository with your own internal repository which you have greater control over
3. You want to run a repository manager to provide a local cache as a mirror and need to use its URL instead

### 3.2 How to use mirror?

1. register in settings.xml

```xml
<mirrors>
    <mirror>
        <id>other-mirror</id>
        <name>Other Mirror Repository</name>
        <url>https://other-mirror.repo.other-company.com/maven2</url>
        <mirrorOf>central</mirrorOf>
    </mirror>
</mirrors>
```

mirrorOf setting that is the ID of the repository you are using a mirror of

Note that there can be at most one mirror for a given repository. In other words, you cannot map a single repository to a group of mirrors that all define the same mirrorOf value. Maven will not aggregate the mirrors but simply picks the first match. If you want to provide a combined view of several repositories, use a repository manager instead.


## 4. Profile

### 4.1 Why use profile

Apache Maven goes to great lengths to ensure that builds are portable. Among other things, this means allowing build configuration inside the POM, leaning much more heavily on the local repository to store the metadata needed to make this possible，and avoiding all filesystem references (in inheritance, dependencies, and other places).

However, sometimes portability is not entirely possible. Under certain conditions, plugins may need to be configured with local filesystem paths.

- Under other circumstances, a slightly different dependency set will be required, and the project's artifact name may need to be adjusted slightly.
- And at still other times, you may even need to include a whole plugin in the build lifecycle depending on the detected build environment.

To address these circumstances, Maven supports build profiles. Profiles are specified using a subset of the elements available in the POM itself (plus one extra section), and are triggered in any of a variety of ways. They modify the POM at build time, and are meant to be used in complementary sets to give equivalent-but-different parameters for a set of target environments. As such, profiles can easily lead to differing build results from different members of your team. However, used properly, profiles can be used while still preserving project portability.

### 4.2 How profile works

1. create a subset of pom elements as profile
2. active one profile
3. profile overwrites origin pom

### 4.3 Inheritance

only the effect of profile will be inherited, but the profile will not be inherited.

### 4.4 How to active profile

1. activate

```xml
mvn groupId:artifectId:goal -P profile1,profile2
```

Note that the default profile will be disabled once a profile is activated through command-line or pom.

1. conditional-activate

not invovled

1. deactivate

```xml
mvn groupId:artifectId:goal -P \!profile1,\!profile2
mvn groupId:artifectId:goal -P -profile1,-profile2
```

### 4.5 What can be profiled

1. external profile

outer-profile : settings.xml / profiles.xml

Profiles specified in external files are not portable in the strictest sense.  
Therefore, only repositories pluginRepositories and properties can be used in external profile.

1. inner profile

profile is a subset of normal pom.

### 4.6 profile order

All profile elements in a POM from active profiles overwrite the global elements with the same name of the POM or extend those in case of collections. In case multiple profiles are active in the same POM or external file, the ones which are defined later take precedence over the ones defined earlier (independent of their profile id and activation order).

### 4.7 Show in-effect profiles

```xml
# check profiles in effect
mvn help:active-profiles -P profile1

# output active profile pom
mvn help:effective-pom -P profile1
```

### 4.8 Naming Conventions

different build configuration requirements for different target environments  

One good way to do this is to use the common system property trigger as part of the name for the profile. This might result in names like env-dev, env-test, and env-prod for profiles that are triggered by the system property env. Such a system leaves a highly intuitive hint on how to activate a build targeted at a particular environment. Thus, to activate a build for the test environment, you need to activate env-test by issuing:

```xml
mvn groupId:artifectId:goal -Denv=test ...
```

## 5. Security

Not involved

## 6. Toolchains

You can build a project using a specific version of JDK independent from the one Maven is running with.

[Not involved](https://maven.apache.org/guides/mini/guide-using-toolchains.html)