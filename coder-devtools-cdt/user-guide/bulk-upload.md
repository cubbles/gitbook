# Bulk upload of webpackages

Since a Cubbles project may have more than one webpackage, sometimes, you may want to upload several packages at the same time. The [CDT](../README.md) offers the `_webpackages-bulk-upload` task to achieve that goal.

## Purpose

To show how to bulk upload webpackages using the `_webpackages-bulk-upload` task.

## Steps

First, you should run the task within the CDT folder (normally it is called *devtools*) as follows:

```bash
grunt _webpackages-bulk-upload
```

Then, a list of existing webpackages will be displayed. You should choose the webpackages to be uploaded typing the indexes of the desired webpackages separated by a space. In the example below, we have chosen to upload both listed webpackages:

```bash
Please select all webpackages to upload or to CANCEL:
1) my-second-webpackage
2) my-first-webpackage
3) CANCEL
? Answer: 2 1
```

After that, the process is the same as [uploading one webpackage](upload-a-webpackage.md).

> Note that all webpackages will be uploaded using the same configuration. That is, they will be uploaded to the same store using the same user data.

## Outcome

The selected webpackages will be uploaded to the desired store.