# Using the vanilla boilerplate scripts

The [vanilla boilerplate](https://github.com/cubblesmasters/vanilla) includes 13 scripts listed in the `package.json` file. However, in this tutorial, we will present only 9, which are the ones that you will require to develop, deploy and upload Cubbles artifacts.

## Prerequisites

To start using the scripts of the `vanilla boilerplate`, it should be cloned locally and all its dependencies should be installed (See [this guide](./creating-project.md) for more information).

## Running the scripts

You can run all the available scripts using npm as follows:

```bash
npm run [script-name]
```

Also, you can install [ntl](https://www.npmjs.com/package/ntl) globally and the run it to access the scripts as shown below:

```bash
$ ntl
✔  Npm Task List - v3.0.0
? Select a task to run: (Use arrow keys)
❯ build
  build:watch
  build:prod
  clean
  upload
  upload:prod
  validate-manifest
(Move up and down to reveal more choices)
```

## Building a dist version of your webpackage

TO be able to test a developed artifact you should build a dist version that can be run under the Cubbles platform. That is, it should be within a [webpackage](../terms-and-concepts/webpackage.md) that contains a [valid manifest file](http://cubbles.github.io/cubx-webpackage-document-api/schema-explorer.html?schemaPath=https://raw.githubusercontent.com/cubbles/coder-toolset/develop/packages/webpackage-document-api/lib/jsonSchema/manifestWebpackage-10.1.0.schema.json). To aim that, you should run one of the building scripts which are:

* **build**: builds a development version of the current webpackage.
* **build:watch**: builds a development version of the current webpackage, and monitors changes to produce new builds when required.
* **build:prod**: builds a production version (i.e., with minified scripts) of the webpackage.

The built webpackage will be placed in a folder called `dist` in the root folder of your project.

## Starting a local server

After building a webpackage, you may want to run it locally. To aim that, you can run one of the following scripts:

* **start**: it starts a local web server listening at *http:localhost:4000*.
* **start:watch**: it starts a local web server listening at *http:localhost:4000* and monitoring changes to reload the server when needed.

## Uploading a webpackage to a Cubbles base

When your webpackage is ready, you may want to upload it to a Cubbles base. There two scripts that you can use for uploading:

* "upload": this script is intended to be used during development. It uploads the webpackage using the configuration defined in the `cubx-uploader-config.dev` property of the `cubbles[cubx-webpackage-uploader]` property of the *package.json* file. The script offers you the opportunity to build the webpackage using the `build` script.
* "upload:prod": this script is intended to be used for production. It uploads the webpackage using the configuration defined in the `cubx-uploader-config.prod` property of the `cubbles[cubx-webpackage-uploader]` property of the *package.json* file.. The script offers you the opportunity to build the webpackage using the `build:prod` script.

Both scripts run the `validate-manifest` script before trying to upload the webpackage. If the generated manifest is invalid the webpackage would not be uploaded.

### Upload configuration files

As mentioned above, upload configuration files are located at the root of your folder. Those are JSON files, containing the following properties:

1. `target [mandatory, object]`: This object contains the following properties:
   1. `url [mandatory, string/url]`: This is the url of the Cubbles Base where the webpackage will be uploaded to.
   2. `proxy [optional, string/url]`: If your connection to the Cubbles Base is routed over a proxy server, use this attribute to provide the proxy url.
2. `dryRun [optional, boolean]`: This option allows you to run the task, without actually uploading anything. It's perfect to check your permissions to upload to the target base.
3. `debug [optional, boolean]`: Set the debug option to "true" to print more details of the uploading process.

You should edit those properties according to your needs.

## Validating de generated (built) manifest

The manifest of a Cubbles webpackage should be valid according to a JSON schema associated with a model version. Up [RTE@3.0.0](../runtime-extension-rte/README.md) the modelVersion is 10.0.0, whose JSON schema can be explored [online](http://cubbles.github.io/cubx-webpackage-document-api/schema-explorer.html?schemaPath=https://raw.githubusercontent.com/cubbles/coder-toolset/develop/packages/webpackage-document-api/lib/jsonSchema/manifestWebpackage-10.1.0.schema.json).

If you want to be sure that the generated manifest is valid, you can run the `validate-manifest` script.

Note that this script is run automatically before uploading a webpackage. That is when running `upload` or `upload:dev` scripts.

## Cleaning the dist folder

Finally, if you want to clean (remove) the generated *dist* folder, you can run the `clean` script. Note, that it is run automatically when running `build` or `build:dev` scripts.