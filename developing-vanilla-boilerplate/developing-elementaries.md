# Developing elementaries using the vanilla boilerplate

The easiest way to develop Cubbles elementaries is to modify the base sample contained in the vanilla boilerplate. In this section, we will give some recommendations to help you with that process. Below, we present an overview of the development process of a compound:

![Developing a elementary with the vanilla boilerplate](../assets/images/elementary-with-vanilla-boilerplate.png)

## Prerequisites

To start developing Cubbles elementaries using the vanilla boilerplate, this should be cloned locally and all dependencies should be installed (See [this guide](./creating-project.md) for more information).

## Development considerations

The `vanilla boilerplate` includes a boilerplate for an elementary component called `elem1`. An elementary component has a manifest definition, a logic, and a view. You should rename this folder according to your needs. The name of the folder will be used to set the `artifactId` of your elementary in the built version of the final manifest.

Additionally, you should edit the following files according to your needs:

### The **MANIFEST.elementary.js**

It contains only the [manifest definition](../terms-and-concepts/artifacts.md#artifact-definition) of the elementary. As you may notice, it is a javascript script; thus, you have more freedom to play with the definition, but after building, it should be JSON and [Cubbles manifest](http://cubbles.github.io/cubx-webpackage-document-api/schema-explorer.html?schemaPath=https://raw.githubusercontent.com/cubbles/coder-toolset/develop/packages/webpackage-document-api/lib/jsonSchema/manifestWebpackage-10.1.0.schema.json) valid.

The following are the valid properties of an elementary manifest definition:

```javascript
{
    "artifactId": , // Set automatically during building process
    "resources": [],
    "slots": [], // Optional
    "dependencies": [], // Optional
    "runnables": [], // Optional
    "dependencyExcludes": [], // Optional
    "description": "A description" // Optional
}
```

> Check [this](http://cubbles.github.io/cubx-webpackage-document-api/schema-explorer.html?schemaPath=https://raw.githubusercontent.com/cubbles/coder-toolset/develop/packages/webpackage-document-api/lib/jsonSchema/manifestWebpackage-10.1.0.schema.json) to know the type and structure of values that each property can take.

#### About the artifactId

The `artifactId` of your elementary is set automatically during the building process. By default it has the following format: `[webpackageId]-[artifactId]`. The `webpackageId` will be determined from the `name` property of the `package.json` file. And the `artifactId` will be based on the name of the folder that contains the component.

For instance, the artifactId of the `elem1` elementary contained in `vanilla boilerplate` will be `cubbles-vanilla-boilerplate-elem1`, since the `name` property of the `package.json file` is *@cubbles/vanilla-boilerplate* and the container folder is called *elem1*. Note that the special characters (i.e., @ and /) of the name property were removed since `artifactIds` should be valid HTML elements names.

### The **element.html** file

It contains the view of the elementary. You should remove the sample code except for `<template>` tag, here you should add the html code of your elementary. Also, have into account that the `id="<%= elementName %>"` attribute of that tag will be replaced with the `artifactId` defined in the `MANIFEST.elementary.js`. If you remove this attribute your elementary will not work properly. Similarly, if you hard code the id attribute and then change the artifactId in the manifest, you will have to update this manually or the elementary will not work. So, after edition your `element.html` file may look as follows:

```html
<template id="<%= elementName %>">
    ... Your own code goes here
</template>
```

### The **element.js** file

This file contains the logic of the sample elementary. To define the behavior of an elementary you should use the [CubxComponent](../runtime-extension-rte/user-guide/cubbles-js-api/inside-interaction.md#the-cubxcomponent-object). The most important step is to define the `is` property of this object using the `artifactId` of the elementary, which is defined automatically during the building process. Then, if you want/need, you can define the life cycle associated methods of an elementary. Also, you may want to add listeners for changes in the slot values and implement additional methods to control the behavior of your elementary.

```javascript
// imports

(function () {
  'use strict';

  CubxComponent({
    is: '/* @echo elementName */',

    // Life cycle methods
    created: function () { },

    ready: function () { },

    connected: function () { },

    disconnected: function () { },

    contextReady: function () { },

    // Slot changes listeners
    model[SlotId]Changed: function () { },

    // Additional code
    yorOwnMethod: function () { }
  });
}());
```

Since the `vanilla boilerplate` uses [webpack](https://webpack.github.io/) to build a distribution version of the webpackage and uses [preprocess-loader](https://www.npmjs.com/package/preprocess-loader) and [babel-loader](https://webpack.js.org/loaders/babel-loader/) to load javascript files, you can import other scripts and style files, which are loaded with [style-loader](https://webpack.js.org/loaders/style-loader/), [css-loader](https://webpack.js.org/loaders/css-loader/) and [postcss-loader](https://webpack.js.org/loaders/postcss-loader/).

### The **element.sss** file

It contains the style of the sample elementary using [sugarss](https://github.com/postcss/sugarss). It could also be a CSS style sheet. As you may have noticed, in this sample elementary, this style was imported in the `element.js` file.

### The **SHOWROOM.html** file

After building your webpackage, the dist version of this file will have a working demo of your elementary. You don't need to add any code to make to work unless you want to improve it.

## Testing your elementary

While developing your compound, you can run the `npm run build` command to build a developing dist version of your webpackage. Then, you should run the `npm run start` command to start a local web server and be able to run `SHOWROOM.html` file to watch your component working.

For more information about those and other commands, check [this guide](./available-scripts.md).