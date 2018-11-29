# RTE Integration

## Prerequisites

1. Your user-interface allows placing script-tags into a web page.
2. You have a url where the Cubbles RTE webpackage is available and your web page has access to it.

## Integration

Simply put two `<script>` tags into the webpage (into the head or the body) to make the RTE (the Cubbles RunTime Extension) available on the client side:

```html
  <script src="[base-url]/[store]/cubx.core.rte@3.0.0/webcomponents/custom-elements-es5-adapter.js"></script>
  <script src="[base-url]/[store]/cubx.core.rte@3.0.0/webcomponents/webcomponents-lite.js"> <script src="[base-url]/[store]/cubx.core.rte@3.0.0/crc-loader/js/main.js"></script>
```

### Scripts

1. **custom-elements-es5-adapter**: Allows compiling and serving [custom components](https://developers.google.com/web/fundamentals/web-components/customelements) using ES5, so that the browsers that don't support ES6 work correctly.
2. **webcomponents-lite**: Load some polyfills to enable browsers to work with webcomponents.
3. **crc-loader**: It provides the entry-point for RTE, that is, it makes RTE available on client side.

### Placeholders

Note that the source urls of the scripts presented above have two placeholders:

- **\[base-url\]**: The url of the [Cubbles Base](../../terms-and-concepts/base.md) you will use.
- **\[store\]**: The name of the store where your webpackages (including the RTE webpackage) are available.

### CRC-Loader optional attributes

- **data-crcinit-loadcif** ("true"|"false"; default="true"): Is true, the Component-Interaction-Framework (CIF) is loaded. If you are using the RTE to load artifacts of type `"utility"` you can set this attribute to false since no components will be processed.

```html
<script src="<crc-loader>" data-crcinit-loadcif="false"></script>
```

- **data-cubx-startevent** (default="DOMContentLoaded"): Set the event that triggers the RTE to
  - parse top-level dependencies from the document,
  - resolve transitive dependencies,
  - enable the browser to load the dependencies
  - and trigger the CIF to start working.

It might be useful to use another event - e.g. if the content containing cubbles components is included in the document in an asynchronous way.

```html
<script src="<crc-loader>" data-cubx-startevent="MyCubxStartEvent"></script>
```

## Configuration (optional)

A page developer can (optionally) provide a configuration object for the Cubbles RTE within the namespace `window.cubx`. He/she can define `rootDependencies` for a web page using the `CRCInit` property to **load an artifact**:

1. defined in a dependency declaration, which is done regardless of whether this artifact is required when the web page is initially loaded.
2. from the webpackage in the exact given version.

```html
<script>
    window.cubx = {
        CRCInit: {
            rootDependencies: [ { webpackageId: "demo-package@1.0" artifactId: "util1" } ]
        }
    }
</script>
```

### Important information about multiple versions of the same component

Loading the same artifact multiple times (perhaps in different versions) leads to an unpredictable behaviour within the browser --also if they have been referred from different components--. In this context, each component would work as programmed, but browsers do not provide isolated runtimes for different components (and components' versions).

Therefore the RTE (since version 2.1) has a dependency resolution mechanism implemented that prefers the webpackage version with the shortest path within the page dependency tree.

To affect the dependency tree specified artifacts can be added and/or excluded by configuration. The combination of exclusion and addition of dependencies allows you to simply override/replace any version of an artifact.