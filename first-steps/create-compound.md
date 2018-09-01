# Create a compound component

## Purpose

To demonstrate how to create a compound component using the [Coder DevTools](../coder-devtools-cdt/README.md).

## Prerequisites

The [`currency-converter`](create-elementary.md) elementary component should be created already.

## Creating the currency-viewer Compound Component

We will create a compound component called `currency-viewer`. This compound will use a chart to display the conversion calculated by the [`currency-converter`](create-elementary.md) elementary. The dataflow of this compound is shown below:

![`currency-viewer` dataflow](../.gitbook/assets/compound_dataflow.png)

Our compound component will be created within the same webpackage where you created your `currency-converter` elementary.

First, run the following Grunt task from DevTools in the bash (Make sure you are located in your devtools folder):

```bash
grunt +webpackage-createCompound
```

Second, you should provide a name and, if you want, a description for the component. In our case, it should be as follows:

* Name: *currency-viewer*.
* Description: Component to display currency differences in a bar-chart.

If everything is okay, you will get the following message in the bash:

```bash
Done, without errors.
```

The manifest file is modified automatically to include the new compound component. Also, a folder with the name you specified for the component is created. The folder contains a simple structure as follows.

![`currency-viewer` generated folder](../.gitbook/assets/compound_folder_struct.png)

### Extending the [`currency-converter`](create-elementary.md) component

We will use a bar chart to display the conversion calculated by the `currency-converter`. To aim that we will use an elementary component called `bar-chart`. That component has an input slot indicating the data to be displayed as an array. Thus, we need a new output slot for the `currency-converter`. The new slot will be called `conversionArray` and should produce an array as follows:

```javascript
[
    ["baseCurrencyName", baseCurrencyValue],
    ["targetCurrencyName", targetCurrencyValue],
]
// For instance: [["EUR", 1], ["USD", 1.162149]]
```

To aim that, we need to add a new slot definition to the `currency-converter` elementary in the `manifest.webpackage` file:

```javascript
    // ...
    "elementaryComponents": [
      {
        "artifactId": "currency-converter",
        // ...
        "slots": [
            // ...
            {
            "slotId": "conversionArray",
            "type": "array",
            "direction": [
              "output"
            ]
          }
        ]
      }
    ],
    // ...
```

Then, we need to set the value of the `conversionArray`  slot when the conversion is calculated. In the *currency-converter.js* locate the `sendQuery` function and specifically the following code:

```javascript
// ...
sendQuery: function () {
    // ...
    // Update the Cubbles component model slots using the setters
    var converted = data[conversionKey]['val'][queryDate];
    self.setConversion(converted);
    // ...
}
// ...
```

Below that code, you should add the following line to set the value of our new slot:

```javascript
self.setConversionArray([[self.getBase(), 1],[self.getForeignCurrency(), converted]]);
```

Now we can continue developing our compound component.

### Specify the Compound configuration in the Manifest File

We should modify the `manifest.webpackage` file again to set up the compound component. To support a compound you have to specify the member components and the connections between their slots. As you can see in the dataflow picture above, our compound has two members, the `currency-converter` and the `bar-chart` component. The compound has a connection identified as *data-connection*.

#### The dependencies section

To have the resources of the members available, we need to define two dependencies to be loaded at runtime:

##### `currency-converter`

1. webpackageId: it is not necessary since the currency-converter implementation is within the same webpackage.
2. artifactId: currency-converter.

##### `bar-chart`

1. webpackageId: `com.incowia.lib.chart-library@01.0.0`, as the `bar-chart` artifact resides within another webpackage. Thus, we should specify the name and version of this webpackage. 
2. artifactId: currency-converter.

> Note that the `com.incowia.lib.chart-library@01.0.0`is already available in the [shared](https://cubbles.world/shared/cubx.core.artifactsearch@1.6.1/artifactsearch/index.html) store of the Cubbles platform.

The *dependencies* property of the `currency-viewer` should look as follows:

```javascript
    // ...
    "elementaryComponents": [
      {
        "artifactId": "currency-converter",
        // ...
        "dependencies": [
          {
            "artifactId": "currency-converter"
          },
          {
            "webpackageId": "com.incowia.lib.chart-library@1.0.0",
            "artifactId": "bar-chart"
          }
        ],
      }
    ],
    // ...
```

#### The slots section

Since our compound doesn't expose any member-slots, just remove the pre-generated slots definition.

#### The members section

Now, we need to add the members that belong to our compound as follows:

```javascript
    // ...
    "elementaryComponents": [
      {
        "artifactId": "currency-converter",
        // ...
        "members": [
          {
            "memberId": "currencyConverter",
            "artifactId": "currency-converter"
          },
          {
            "memberId": "chart",
            "artifactId": "bar-chart"
          }
        ],
      }
    ],
    // ...
```

> Note that both members were included as dependencies. Otherwise, the compound component wouldn't be able to identify them.

By default, each member will be rendered as a direct child node of the compound in the order in which each member was defined above. However, if you want to render the compound members in a particular way or add other HTML elements, you can provide a custom HTML template. The following is an example of a template for the currency-viewer component. To aim that, you should edit the `currency-viewer-template.html` file. Add the following code to your template:

```html
<template id="currency-viewer">
    <h1>My Currency Viewer</h1>
    <currency-converter member-id-ref="currencyConverter"></currency-converter>
    <bar-chart member-id-ref="chart"></bar-chart>
</template>
```

Be sure that the id attribute of the template is equal to the *artifactId* of the compound component. The member components are added as HTML tags whose *member-id-ref* attribute is equal to its *memberId* in the *manifest.webpackage*.

Moreover, to make the template available, you should add it as a resource in the compound component in the *manifest.webpackage* file as follows.

```javascript
    // ...
    "elementaryComponents": [
      {
        "artifactId": "currency-converter",
        // ...
        "resources": [
          "css/currency-viewer.css",
          "currency-viewer-template.html"
        ],
      }
    ],
    // ...
```

> Note that you can modify the *css/currency-viewer.css* file (automatically generated) to style your component.

#### The connections section

A connection defines the data to be transferred between 2 slots each from one member.
To set up a connection you need to edit the *connections* array of the compound component in the *manifest.webpackage*. Add the following code to your manifest to include the `data-connection` connection to the `currency-viewer-compound`:

```javascript
    // ...
    "elementaryComponents": [
      {
        "artifactId": "currency-converter",
        // ...
        "connections": [
          {
            "connectionId": "data-connection",
            "source": {
              "memberIdRef": "currencyConverter",
              "slot": "conversionArray"
            },
            "destination": {
              "memberIdRef": "chart",
              "slot": "dataColumns"
            }
          }
        ],
        // ...
      }
    ],
    // ...
```

#### The inits section

The *inits* property of a compound allows setting an initial value to the slots of the compound component being defined, or to the slots of its members. To read more about compound components initialisation check [this](compound-init).

We won't initialise any slot for the purpose of this tutorial.

## Check your first Compound Component

Now you can check the generated demo of the component performing the following steps:

* Start the embedded webserver using the `+startWebserver` grunt task available in the [DevTools](../coder-devtools-cdt/README.md).
* Your default browser will start.
* Navigate to: http://localhost:8282/\[webpackage-name\]/currency-viewer/demo/

> Note that \[webpackage-name\] should be replaced by the name of your current webpackage.

It should look as follows:

![`currency-viewer` generated demo](../.gitbook/assets/compound_demo.png)