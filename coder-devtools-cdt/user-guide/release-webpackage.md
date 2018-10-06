# Release a webpackage

When releasing a webpackage to need to:

1. Check if all dependencies are not under development
2. Update the current version to a fixed version; i.e., without the `-SNAPSHOT` suffix
3. Upload the webpackage to a store
4. Update the current version to a valid next development version, since no changes can be uploaded to fixed versions

The [CDT](../README.md) offers you the  `+webpackage-release` task to release a webpackage. Actually, this task uses three other tasks to perform each step:

1. The [`_webpackage-prepareRelease`](prepare-release.md) task to perform **steps 1. and 2.**
2. The [`+webpackage-upload`](upload-a-webpackage.md) task to perform **step 3**.
3. The [`_webpackage-updateToNextVersion`](update-to-next-version.md) to perform **step 4**.

## Steps

You should run the task within the CDT folder (normally it is called *devtools*) as follows:

```bash
grunt  +webpackage-release
```

Then, each task will be run in the order presented above.

> Click on the links provided above for each subtask to see further details about each step.

## Outcome

Your webpackage will be uploaded to a store with a fixed version and the `manifest.webpackage` file will end up with the correct next development version.