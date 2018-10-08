# Create Cubbles artifacts

The [CDT](../README.md) offers you four tasks to create [Cubbles artifacts](../../terms-and-concepts/artifacts.md), which will be described below.

> Note that all tasks should be run within the CDT folder (normally it is called *devtools*). The new artifacts will be created as part of the [active webpackage](change-active-webpackage.md).

## Create an app

To create an application in the active webpackage, you should run the `+webpackage-createApp` task as follows:

```bash
grunt +webpackage-createApp
```

After that, you should type a name and then a description of your application. Below, we present a simple example:

```bash
? Application name (e.g. 'my-app'): my-first-app
? Provide a short description (optional): This is my first app
```

The task will create a folder with the name you provided. The folder contains an `index.html` file, which imports the needed RTE files to allow you to use Cubbles components immediately. You only need to add your components to the body of the application.

Furthermore, a definition for your app will be created in the [manifest.webpackage](../../terms-and-concepts/webpackage.md#the-manifest-webpackage-file) file of the active webpackage.

## Create an utility

To create an application in the active webpackage, you should run the `+webpackage-createApp` task as follows:

```bash
grunt +webpackage-createUtility
```

After that, you should type a name and then a description of your application. Below, we present a simple example:

```bash
? Utility name (e.g. 'my-util'): my-first-util
? Provide a short description (optional): This is my first utility
```

The task will create a folder with the name you provided. The folder will contain an HTML file and a folder to place javascript files. You can use those or create other files as you need; for instance, you may want to create a utility that wraps an existing library such as jQuery.

Furthermore, a definition for your app will be created in the [manifest.webpackage](../../terms-and-concepts/webpackage.md#the-manifest-webpackage-file) file of the active webpackage. If you include other files (e.g., for external libraries), you should edit the `resources` property of the utility definition accordingly.

## Create an elementary component

To create an elementary component, you should run the `+webpackage-createElementary` task as follows:

```bash
grunt +webpackage-createElementary
```

Then, you should provide the information about your elementary.

Check [this tutorial](../../first-steps/create-elementary) to read more about the process of creating, editing and visualizing an elementary component.

## Create a compound component

To create a compound component, you should run the `+webpackage-createCompound` task as follows:

```bash
grunt +webpackage-createCompound
```

Then, you should provide the information about your compound.

Check [this tutorial](../../first-steps/create-compound/README.md) to read more about the process of creating, editing and visualizing a compound component.