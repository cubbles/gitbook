# Change active webpackage

A cubbles project may contain more than one webpackage. You can use the [CDT](../README.md) with all existing webpackages; however, you must indicate which is the current webpackage. You can do it manually in the `.workspace` file of the `webpackages` folder of your project; or, you can do it using the `_change-activeWebpackage` task.

## Purpose

To show how to change current active project to be used by the [CDT](../README.md) using the `_change-activeWebpackage` task.

## Steps

First, you should run the task within the CDT folder (normally it is called *devtools*) as follows:

```bash
grunt _change-activeWebpackage
```

Second, a list of the existing webpackages will be prompted. You should choose the webpackage to be used as active by typing its index. The list is similar to the one below:

```bash
? Please type the index of your choice to change the activeWebpackage or to CANCEL:  
  1) my-first-webpackage
  2) my-second-webpackage
  3) CANCEL
  Answer: 
```

If you type a wrong index, you would have another chance to type it correctly. If you choose the *CANCEL* option, the process will finish without making any change.

## Outcome

The `.workspace` file in the `webpackages` folder will be updated with the selected webpackage, and all the [CDT](../README.md) tasks will use it.