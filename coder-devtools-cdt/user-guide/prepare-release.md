# Prepare a webpackage to be released

When you have finished developing a webpackage (or any of its artifacts), you may want to release it in a store using a fixed version (i.e., without the *-SNAPSHOT* suffix). After uploading the webpackage to a store, one won't be able to upload changes using the same version. The [CDT](../README.md) offers you the  `_webpackage-prepareRelease` task to:

* Check that all dependencies of your webpackage are not in development (i.e., they are fixed versions); to avoid any unexpected behaviour of artifacts under development.
* Update the version of your webpackage using a fixed version, provided by you or generated automatically by removing the *-SNAPSHOT* suffix to the current version.

## Purpose

To show how to use the `_webpackage-prepareRelease` task to prepare a webpackage to be released.

## Steps

First, you should run the task within the CDT folder (normally it is called *devtools*) as follows:

```bash
grunt  _webpackage-prepareRelease
```

Then, you should provide the release version to be used. Remember that it should be a digit, three or two dot-separated digits (e.g. 1, 3.1, 2.0.3). Or you can use the generated value (displayed in parenthesis) by pressing Enter. For instance, in the code below the suggested version is `0.1.0`:

```bash
? Please type the release version to be set to the webpackage: (0.1.0)
```

If all dependencies belong to released webpackages and the provided release version (if any) is correct, the process will finish. Otherwise, you will be prompted with a message indicating the error and how to solve it. After solving the error, you should run the task again.

## Outcome

The version of your webpackage will be updated in the `manifest.webpackage` file.

## The npm module version

You can use an npm module that serves the same purposes called [cubx-prepare-webpackage-release](https://www.npmjs.com/package/cubx-prepare-webpackage-release). The module can be used from the command line or in a node script.