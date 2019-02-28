# Create a demo webpackage

Sometimes you may want to create a demo webpackage to see a sample for each type of artifact. The [CDT](../README.md) offers the `_createWebpackageDemo` task to achieve that goal.

## Purpose

To show how to generate a demo webpackage using the `_createWebpackageDemo` task.

## Steps

First, you should run the task within the CDT folder (normally it is called *devtools*) as follows:

```bash
grunt _createWebpackageDemo
```

Then, you should continue the process in the same way as [creating an empty webpackage](../../first-steps/create-a-webpackage.md).

## Outcome

A webpackage containing a demo for each type of artifact will be created. Additionally, this webpackage will be set as the currently active one.