
# The Cubbles Dependency API

## Introduction

The Cubbles platform comes with an own dependency management mechanism. In the following sections, we will describe how you can use the API provided by the platform to handle dependencies. That means:

- How to add additional dependencies
- How to exclude one or more dependencies
- How to replace existing dependencies

A dependency of an artifact is another artifact that should be requested. In most cases, those required artifacts will be compound components, elementary components or utilities.

> Note: We strongly recommend you to read and understand the section before you proceed!

## Prerequisites

This guide assumes that we have included a `<first-demo-component>` component instance into an `index.html` file. Furthermore, in this example, the `<first-demo-component>` should be a compound component, so that, we have several dependencies that our compound component needs to work as expected.

The dependency tree of `first-demo-component` looks as follows:

```text
demo-package@1.0/first-demo-component // we call this a root dependency
  |
  |- another-demo-package@1.0/demo-elementary-component
  |  |
  |  |- third-party-lib@1.0/awesome-lib-util
  |
  |- demo-package@1.0/my-utility
```

As a page editor or html developer who wants to use the `first-demo-component` from the webpackage `demo-package@1.0`, you don't need to take care of including all the needed dependencies (and their corresponding resources) into the page's `<head>` area. The dependency resolution mechanism provided by the RTE does all the magic to ensure all of these needed resources are included into the page's `head` to make the `first-demo-component` work as expected. Duplicated dependencies are also removed.

```html
<head>
    ...
    <!--
        Note: this is just for explanation purposes!
        In fact each artifact comes with a list of ordinary web
        resources like JS, HTML or CSS files which will be included
        by DependencyManager of the RTE.
    -->
    <link rel="import" href="third-party-lib@1.0/awesome-lib-util">
    <link rel="import" href="another-demo-package@1.0/demo-elementary-component">
    <link rel="import" href="demo-package@1.0/my-utility">
    <link rel="import" href="demo-package@1.0/first-demo-component">
    ...
</head>
<body>
    ...
    <first-demo-component cubx-webpackage-id="demo-package@1.0">
</first-demo-component>
    ...
</body>
```

## Adding additional artifacts to existing dependencies

Sometimes, you might want to add some additional dependencies to the existing ones that come from the used components. Normally you are using components out-of-the-box and are not able or willing to manipulate their dependencies by editing the corresponding `manifest.webpackage` file. That can be because you don't want to release a new version of the component only for the sake of adjusting their dependency list. Or because you are not the owner of the used component.

The Cubbles API provides several ways of adding additional dependencies to the existing list of dependencies without changing the used components itself.

### Adding a dependency using the Cubbles TAG API

One way to add dependencies is using the `<cubx-dependencies>` and `<cubx-dependency>` tags inside a custom tag of a cubbles component. This is useful when you are restricted to edit only small snippets of a page's html body. For example, assume that you are editing the content of a Wordpress post; in that case, you normally don't have access to the whole html tree of a page but rather can edit html in the content section.

In the example below, we use the Cubbles TAG API to add a new artifact dependency `second-demo-utility` from the `third-party-pkg@1.0` webpackage. Internally the RTE adjusts the dependency tree by adding the new artifact as new root dependency (Note: the new dependency will be inserted before the existing dependencies in the list of root dependencies).

To include an additional dependency, we should consider:

- Each custom html tag representing a cubbles component can have exactly one `<cubx-dependencies>` child
- The `<cubx-dependencies>` element can have 1..n `<cubx-dependency>` children with the following attributes:
  - `artifact-id` (mandatory) For the example above, this would be `second-demo-utility`.
  - `webpackage-id` (optional) If no webpackage-id is given, then the artifact will be searched in the same webpackage of the parent cubbles component. For the example above, this attribute should be `third-party-pkg@1.0`.

The code below allows performing the dependency inclusion of our example:

```html
<head>
...
</head>
<body>
    ...
    <first-demo-component cubx-webpackage-id="demo-package@1.0">
        <cubx-dependencies>
            <cubx-dependency artifact-id="second-demo-utility" webpackage-id="third-party-pkg@1.0"></cubx-dependency>
        </cubx-dependencies>
    </first-demo-component>
    ...
</body>
```

The resulting dependency tree will look as follows:

```text
third-party-pkg@1.0/second-demo-utility // adding a new root dependency
  |
  |-- ...

demo-package@1.0/first-demo-component // initial root dependency
  |
  |- another-demo-package@1.0/demo-elementary-component
  |  |
  |  |- third-party-lib@1.0/awesome-lib-util
  |
  |- demo-package@1.0/my-utility
```

### Adding a dependency using the global `window.cubx.CRCInit` object

Besides the Cubbles TAG API, you can add dependencies using the global property `window.cubx.CRCInit.rootDependencies`

This property is an array of items where each item defines a root dependency holding the following properties:

- `webpackageId` (mandatory)
- `artifactId` (mandatory)

```html
<head>
...
    <!--
        The below script block needs to be placed before(!)
        the crc-loader script is included
    -->
    <script>
        window.cubx = {
            CRCInit: {
                rootDependencies: [
                    {
                        webpackageId: 'third-party-pkg@1.0',
                        artifactId: 'second-demo-utility'  
                    }
                ]  
            }
        };
    </script>
...
</head>
<body>
    ...
    <first-demo-component cubx-webpackage-id="demo-package@1.0">
    </first-demo-component>
    ...
</body>
```

The resulting dependency tree for the above example will be equal to the one displayed in the previous section.

## Exclude certain artifacts from existing dependencies

Similar to adding dependencies, it's useful to exclude specific dependencies. Consider, for example, a scenario where you already have the jQuery library on a web page, but the cubbles component you want to use also comes with jQuery in its own dependencies. Thus, it would be great if you could exclude jQuery in the dependencies to avoid naming conflicts in the global JavaScript scope.

### Exclude a dependency using the Cubbles TAG API

Analogous to adding dependencies, you can use the `<cubx-dependency-excludes>` and `<cubx-dependency-exclude>` to exclude one or more dependencies from an artifacts' dependency tree.

Let's suppose we have an initial dependency tree that looks as follows:

```text
demo-package@1.0/first-demo-component
  |
  |- another-demo-package@1.0/demo-elementary-component
  |  |
  |  |- third-party-lib@1.0/awesome-lib-util // this package will be excluded!
  |
  |- demo-package@1.0/my-utility
```

To exclude the desired dependency, we should consider that:

- Each custom html tag representing a cubbles component can have exactly one `<cubx-dependency-excludes>` child
- The `<cubx-dependency-excludes>` element can have 1..n `<cubx-dependency-exclude>` children with the following attributes:
  - `artifact-id` (mandatory) For the example above, this would be `awesome-lib-util`.
  - `webpackage-id` (optional) If no webpackage-id is given then the artifact will be searched in the same webpackage of the parent cubbles component. For the example above this attribute should be `third-party-lib@1.0`

The code below allows performing the dependency exclusion of our example:

```html
<head>
...
</head>
<body>
    ...
    <first-demo-component cubx-webpackage-id="demo-package@1.0">
        <cubx-dependency-excludes>
            <cubx-dependency-exclude
                artifact-id="awesome-lib-util"
                webpackage-id="third-party-lib@1.0">
            </cubx-dependency-exclude>
        </cubx-dependency-excludes>
    </first-demo-component>
    ...
</body>
```

The resulting dependency tree would look as follows:

```text
demo-package@1.0/first-demo-component
  |
  |- another-demo-package@1.0/demo-elementary-component
  |
  |- demo-package@1.0/my-utility
```

### Exclude a dependency using the global `window.cubx.CRCInit` object

Dependency excludes can also be added using the global `window.cubx.CRCInit.rootDependencyExcludes` property.

This property is an array of objects where each object defines a root dependency exclude holding the following properties:

- `webpackageId` (mandatory)
- `artifactId` (mandatory)

The code below results in the same exclusion of the previous section:

```html
<head>
...
    <!--
        The below script block needs to be placed before(!)
        the crc-loader script is included
    -->
    <script>
        window.cubx = {
            CRCInit: {
                rootDependencyExcludes: [
                    {
                        webpackageId: 'third-party-lib@1.0',
                        artifactId: 'awesome-lib-util'
                    }
                ]  
            }
        };
    </script>
...
</head>
<body>
    ...
    <first-demo-component cubx-webpackage-id="demo-package@1.0"></first-demo-component>
    ...
</body>
```

### The scope of dependency excludes

The difference between `rootDependencyExcludes` and dependency excludes which are defined for a specific artifact (using the Cubbles TAG API) is that `rootDependencyExcludes` always apply to the whole dependency tree. Thus, you could consider those as global exclusions, so an artifact added in the `rootDependencyExcludes` array will always be ignored. In contrast, if you define a dependency exclude on the artifact level using the Cubbles TAG API then this exclude is only valid within the dependencies of that artifact. Let's see an example to illustrate the difference.

```html
<body>
    ...
    <my-first-cubble webpackage-id="...">
        <cubx-dependency-excludes>
            <cubx-dependency-exclude
            artifact-id="another-artifact"
            webpackage-id="another-package@1.0">
            </cubx-dependency-exclude>
        </cubx-dependency-excludes>
    </my-first-cubble>
    ...
    <my-second-cubble webpackage-id="..."></my-second-cubble>
    ...
</body>
```

In the example above, there are two different instantiated Cubble components. Let's assume that `my-first-cubble` as well as `my-second-cubble` use `another-artifact` from the webpackage `another-package@1.0.` The exclusion defined in the code above is only valid within the dependencies of `my-first-cubble` because it is only declared for `my-first-cubble`. However,  the Dependency Manager of the RTE will make it available for `my-second-cubble`.

However, declaring the exclusion within the global `window.cubx.CRCInit.rootDependencyExcludes` property will exclude the dependency for both components in our example.

## Replacing artifacts in existing dependencies

When combining dependency addition and dependency excludes it is possible to replace artifacts in existing dependencies.

In the example below, the `awesome-lib-util` artifact from the `third-party-lib@1.0` webpackage is replaced with the `awesome-lib-util` artifact from the `third-party-lib@2.0` webpackage. In fact, here we replaced an existing dependency with a newer version of its own.

```html
<head>
...
</head>
<body>
    ...
    <first-demo-component cubx-webpackage-id="demo-package@1.0">
        <cubx-dependencies>
            <cubx-dependency
                webpackage-id="third-party-lib@2.0"
                artifact-id="awesome-lib-util">
            </cubx-dependency>
        </cubx-dependencies>
        <cubx-dependency-excludes>
            <cubx-dependency-exclude
                webpackage-id="third-party-lib@1.0"
                artifact-id="awesome-lib-util">
            </cubx-dependency-exclude>
        </cubx-dependency-excludes>
    </first-demo-component>
    ...
</body>
```