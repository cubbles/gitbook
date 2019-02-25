# Coder-template scripts

The [coder-template](https://github.com/cubbles/coder-template) includes 13 scripts listed in the `package.json` file. However, in this tutorial we will present only 9, which are the ones that you will require to develop, deploy and upload Cubbles artifacts.

## Prerequisites

To start developing Cubbles compounds using the coder-template, this should be cloned locally and all its dependencies should be installed (See [this guide](./creating-project.md) for more information).

## Start a local server

"start": "npm-run-all --parallel _serve _open",
    "start:watch": "npm-run-all --parallel build:watch _serve _open",

## Build a dist version of your webpackage

"build": "npm-run-all --serial clean \"_webpack -- -d --config src/webpack.config.js\"",
    "build:watch": "npm-run-all --serial \"_webpack -- -d --config src/webpack.config.js --watch\"",
    "build:prod": "npm-run-all --serial clean \"_webpack -- -p --config src/webpack.config.js\"",

## Clean the dist folder

"clean": "rimraf ./dist",

## Upload your project to a Cubbles base

    "upload": "upload-webpackage ./cubx-uploader-config.dev.json",
    "upload:prod": "upload-webpackage ./cubx-uploader-config.json -p",

## Validate de generated (built) manifest

    "validate-manifest": "validate-manifest",

## Using ntl
