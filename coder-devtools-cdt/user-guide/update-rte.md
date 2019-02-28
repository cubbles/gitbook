# Update the RTE version of a webpackage

Sometimes you may be interested in updating the used RTE version of a webpackage. That is, to refactor the demo, docs and manifest files. The [CDT](../README.md) offers the `_webpackage-updateRte` task to perform that process automatically.

## Purpose

To describe how to update the RTE used by the components of a webpackage using the  `_webpackage-updateRte` task.

## Steps

First, you should run the task within the CDT folder (normally it is called *devtools*) as follows:

```bash
grunt  _webpackage-updateRte
```

Second, you should type the version to be used. It should have the proper format; i.e., a one, two or three dot-separated digits, with a *-SNAPSHOT* suffix for developing versions: For example, 2.4, 3.0.0 or 3.0.0-SNAPSHOT

## Outcome

The dependencies and runnables of each artifact in the manifest.webpackage file will be refactored to use the new RTE version.

> Note that if you choose to update the RTE to 3.0.0 or above, the runnables will be fixed. However, you would have to fix the resources of all elementary components in the webpackage to meet RTE@3.x requirements.

## The npm module version

You can use an npm module that serves the same purposes called [cubx-webpackage-rte-update](https://www.npmjs.com/package/cubx-webpackage-rte-update). The module can be used from the command line or in a node script.