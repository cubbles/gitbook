# How to manually resolve dependency conflicts?

Let's suppose that the third-party-lib@1.0/awesome-lib-util dependency is causing a conflict. To solve a dependency conflict you can exclude or replace the dependency which is causing it, as follows:

## Using the TAG API (Only for a component)

### Excluding the conflicting dependency

One way to solve a conflict is by excluding the conflicting dependency. To aim that, use the `cubx-dependency-excludes` and the  `cubx-dependency-exclude` tags as follows:

```html
...
    <demo-component cubx-webpackage-id="demo-package@1.0">
        <cubx-dependency-excludes>
            <cubx-dependency-exclude
                artifact-id="awesome-lib-util"
                webpackage-id="third-party-lib@1.0">
            </cubx-dependency-exclude>
        </cubx-dependency-excludes>
    </demo-component>
...
```

### Replacing the conflicting dependency

Another approach is to replace the conflicting dependency by excluding it as above and including the desired dependency using the `cubx-dependencies` and the `cubx-dependency` tags as follows:

```html
...
    <demo-component cubx-webpackage-id="demo-package@1.0">
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
    </demo-component>
...
```

## Using the Dependency API (For all components)

### Excluding the conflicting dependency

You could also exclude a dependency using the `rootDependencyExcludes` property of the global  `window.cubx.CRCInit` object as follows:

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
...
```

### Replacing the conflicting dependency

Similarly, you could replace the conflicting dependency by adding a new one and excluding an existing one, as shown below:

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
                    webpackageId: 'third-party-lib@2.0',
                    artifactId: 'awesome-lib-util'
                }
              ],
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
...
```

For more details check [The Cubbles Dependency API](../cubbles-tag-api/dependency-api.md).