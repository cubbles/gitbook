# How to replace a dependency when declaring a component instance?

Let's suppose that you want to replace the third-party-lib@1.0/awesome-lib-util utility with a different version (e.g. 2.0). To replace a dependency, you should exclude the old dependency and include the new desired one.

## Using the TAG API (Only for a component)

You can replace the desired dependency by excluding it as above and including the desired dependency using the `cubx-dependencies` and the `cubx-dependency` tags as follows:

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

Similarly, you could replace the desired dependency by adding a new one and excluding an existing one using the *window.cubx.CRCInit* object, as shown below:

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