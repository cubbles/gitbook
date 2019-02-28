# How to create a component instance dynamically?

To create, and then, add a component instance dynamically you should:

1. Add the dependency of the desired component to the `rootDependencies`
2. Create the component using the document API method `createElement()`
3. Append the component to the Cubbles container (by default the  `body`,  otherwise the element having the  `cubx-core-crc`  attribute)

The code below presents this process for adding a new  `cubx-textarea`  to an existing app:

```html
<head>
    ...
    <script src="https://cubbles.world/sandbox/cubx.core.rte@3.0.0-SNAPSHOT/webcomponents/custom-elements-es5-adapter.js"></script>
    <script src="https://cubbles.world/sandbox/cubx.core.rte@3.0.0-SNAPSHOT/webcomponents/webcomponents-lite.js"></script>
    <script>
          // 1. You should add the dependency of the desired component to the rootDependencies
          window.cubx = {
            "CRCInit": {
            "rootDependencies": [
                   {
                      "webpackageId": "com.incowia.basic-html-components@2.0.0",
                      "artifactId": "cubx-textarea"
                    }
                ]
            }
          }
    </script>
    <script src="https://cubbles.world/sandbox/cubx.core.rte@3.0.0-SNAPSHOT/crc-loader/js/main.js" data-crcinit-loadcif="true"></script>
</head>


<body>
    ...
    <script>
        // 2. Create the component using the document API method createElement()
        var cubxTextArea = document.createElement('cubx-textarea');


        // 3. Append the component to the Cubbles container
        document.body.appendChild(cubxTextArea);
    </script>
</body>
```

You may also be interested in defining inits and connections for the component before appending it to the DOM. Check the [The Cubbles Tag API](../cubbles-tag-api/README.md) and the [The Cubbles Javascript API](../cubbles-js-api/README.md) to get more information about it.

> **Use document.createElement**: Although you may want to append the component using the  `innerHTML` property of a container, you should use the  `document.createElement()`  method for everything to work properly.