# Validate sources

Checking the quality of your code to find and fix errors is a common task. The [CDT](../README.md) offers the `_validateSources` task, which allows you to check the quality of the code of the artifacts of a webpackage. This task will check the following type of files within the [active webpackage](change-active-webpackage.md):

* Javascript files using [eslint](https://www.npmjs.com/package/eslint) and the `.eslintrc` config file located at the root folder of the active webpackage.
* CSS files using [csslint](https://www.npmjs.com/package/grunt-contrib-csslint) and the `.csslintrc` config file located at the root folder of the CDT (normally it is called *devtools*).
* JSON files using [jsonlint](https://www.npmjs.com/package/grunt-jsonlint).

## Purpose

To show how to validate the sources of the artifacts of the active webpackage using the `_validateSources` task.

## Steps

You should run the task within the CDT folder (normally it is called *devtools*) as follows:

```bash
grunt _validateSources
```

## Outcome

If errors are identified, they will be listed in the bash. Otherwise, a success message will be displayed.