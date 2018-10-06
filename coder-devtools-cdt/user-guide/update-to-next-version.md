# Update webpackage to the next development version

The [CDT](../README.md) offers you the  `_webpackage-prepareRelease` task to update the version of your current webpackage to the next development version as follows:

* Using a version provided by you, or
* Generating a `SNAPSHOT` version increasing the second digit of the current version (corresponds to the minor version in [semantic versioning](https://semver.org/)).

## Purpose

To show how to use the `_webpackage-updateToNextVersion` task to prepare a webpackage to be released.

## Steps

First, you should run the task within the CDT folder (normally it is called *devtools*) as follows:

```bash
grunt  _webpackage-updateToNextVersion
```

Then, you should provide the next development version to be used. Remember that it should be a digit, three or two dot-separated digits with a `-SNAPSHOT` suffix (e.g. 1-SNAPSHOT, 3.1-SNAPSHOT, 2.0.3-SNAPSHOT). Or you can use the generated value (displayed in parenthesis) by pressing Enter. For instance, in the code below the suggested version is `0.2.0-SNAPSHOT`:

```bash
? Please type the next development version to be set to the webpackage: (0.2.0-SNAPSHOT)
```

If the provided version (if any) is correct, the process will finish. Otherwise, you will be prompted with a message indicating the error and how to solve it. After solving the error, you should run the task again.

## Outcome

The version of your webpackage will be updated in the `manifest.webpackage` file.

## The npm module version

You can use an npm module that serves the same purposes called [cubx-prepare-webpackage-release](https://www.npmjs.com/package/cubx-prepare-webpackage-release). The module can be used from the command line or in a node script.