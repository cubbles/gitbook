# Rename an artifact

To rename an artifact, you need to rename folders, files and refactor some code. The [CDT](../README.md) offers the `_webpackage-renameArtifact` task to perform that process automatically.

## Purpose

To describe how to rename an artifact using the  `_webpackage-renameArtifact` task.

## Steps

First, you should run the task within the CDT folder (normally it is called *devtools*) as follows:

```bash
grunt  _webpackage-renameArtifact
```

Second, a list of available artifacts will be displayed. You should choose the one to be renamed. Type the number of the artifact in the displayed list, then press Enter.

## Outcome

The task will perform the following changes according to the type of artifact:

| Changes | Elementary |  Compound | Utility | App |
|----------------------------------------|------------|-----------|---------|-----|
| Refactor manifest | X | X | X | X |
| Rename associated folder | X | X | X | X |
| Refactor generated docs | X | X |  |  |
| Refactor generated demo | X | X |  |  |
| Refactor associated resources | X | X |  |  |
| Refactor associated template | X | X |  |  |
| Refactor associated js file | X |  |  |  |
| Rename template, logic and style files | X |  |  |  |

## The npm module version

You can use an npm module that serves the same purposes called [cubx-rename-artifact](https://www.npmjs.com/package/cubx-rename-artifact). The module can be used from the command line or in a node script.