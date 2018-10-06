# Validate the manifest.webpackage file

As you may know, the `manifest.webpackage` file must follow a [JSON schema](https://github.com/cubbles/cubx-webpackage-document-api/wiki/manifest.webpackage:-Change-Notes) according to its model version. The [CDT](../README.md) offers you the  `+webpackage-validateManifestFile` task to validate the manifest of your current webpackage automatically.

> Note that the manifest is validated before being [uploaded](upload-a-webpackage.md), and if it is not valid the upload will be interrupted.

## Purpose

To show how to validate the manifest of a webpackage using the +webpackage-validateManifestFile` task.

## Steps

You should run the task within the CDT folder (normally it is called *devtools*) as follows:

```bash
grunt +webpackage-validateManifestFile
```

## Outcome

If the manifest has errors, those will be prompted. Otherwise, you will get a message similar to the one below:

```bash
Done, without errors.
```