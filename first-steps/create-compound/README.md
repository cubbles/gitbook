# Create a compound component

## Purpose

To demonstrate how to create a compound component using the [Coder DevTools](../../coder-devtools-cdt/).

## Prerequisites

The [`currency-converter`](../create-elementary.md) elementary component should be created already.

## Creating the currency-viewer Compound Component

We will create a compound component called `currency-viewer`. This compound will use a chart to display the conversion calculated by the [`currency-converter`](../create-elementary.md) elementary.

### Members description

The `currency-viewer` comprises the following members:

| Member Id | Description | Artifact Id | Webpackage Id |
| :--- | :--- | :--- | :--- |
| currencyConverter | Component to calculate conversions between two currencies at a certain date. | currency-converter | "this" |
| chart | Component to visualise the currency conversion data from the `currencyCoverter` component using a bar chart. | bar-chart | com.incowia.lib.chart-library@1.0.0 |

### Dataflow of the compound

The dataflow of this compound is shown below:

![\`currency-viewer\` dataflow](../../assets/images/compound_dataflow.png)

### Creation

Our compound component will be created within the same webpackage where you created your `currency-converter` elementary.

First, run the following Grunt task from DevTools in the bash \(Make sure you are located in your devtools folder\):

```bash
grunt +webpackage-createCompound
```

Second, you should provide a name and, if you want, a description for the component. In our case, it should be as follows:

* Name: _currency-viewer_.
* Description: Component to display currency differences in a bar-chart.

If everything is okay, you will get the following message in the bash:

```bash
Done, without errors.
```

The manifest file is modified automatically to include the new compound component. Also, a folder with the name you specified for the component is created. The folder contains a simple structure as follows.

![\`currency-viewer\` generated folder](../../assets/images/compound_folder_struct.png)

### Extending the [`currency-converter`](../create-elementary.md) component

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

Then, we need to set the value of the `conversionArray` slot when the conversion is calculated. In the _currency-converter.js_ locate the `sendQuery` function and specifically the following code:

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

We should modify the `manifest.webpackage` file again to set up the compound component. To support a compound you have to specify the member components and the connections between their slots. As you can see in the dataflow picture above, our compound has two members, the `currency-converter` and the `bar-chart` component. The compound has a connection identified as _data-connection_.

#### The dependencies section

To have the resources of the members available, we need to define two dependencies to be loaded at runtime:

**currency-converter**

1. webpackageId: it is not necessary since the currency-converter implementation is within the same webpackage.
2. artifactId: currency-converter.

**bar-chart**

1. webpackageId: `com.incowia.lib.chart-library@01.0.0`, as the `bar-chart` artifact resides within another webpackage. Thus, we should specify the name and version of this webpackage. 
2. artifactId: bar-chart.

> Note that the `com.incowia.lib.chart-library@01.0.0`is already available in the [shared](https://cubbles.world/shared/cubx.core.artifactsearch@1.6.1/artifactsearch/index.html) store of the Cubbles platform.

The _dependencies_ property of the `currency-viewer` should look as follows:

```javascript
    // ...
    "compoundComponents": [
      {
        "artifactId": "currency-viewer",
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
    "compoundComponents": [
      {
        "artifactId": "currency-viewer",
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

```markup
<template id="currency-viewer">
    <h1>My Currency Viewer</h1>
    <currency-converter member-id-ref="currencyConverter"></currency-converter>
    <bar-chart member-id-ref="chart"></bar-chart>
</template>
```

Be sure that the id attribute of the template is equal to the _artifactId_ of the compound component. The member components are added as HTML tags whose _member-id-ref_ attribute is equal to its _memberId_ in the _manifest.webpackage_.

Moreover, to make the template available, you should add it as a resource in the compound component in the _manifest.webpackage_ file as follows.

```javascript
    // ...
    "compoundComponents": [
      {
        "artifactId": "currency-viewer",
        // ...
        "resources": [
          "css/currency-viewer.css",
          "currency-viewer-template.html"
        ],
      }
    ],
    // ...
```

> Note that you can modify the _css/currency-viewer.css_ file \(automatically generated\) to style your component.

#### The connections section

A connection defines the data to be transferred between 2 slots each from one member. To set up a connection you need to edit the _connections_ array of the compound component in the _manifest.webpackage_. Add the following code to your manifest to include the `data-connection` connection to the `currency-viewer-compound`:

```javascript
    // ...
    "compoundComponents": [
      {
        "artifactId": "currency-viewer",
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

The _inits_ property of a compound allows setting an initial value to the slots of the compound component being defined, or to the slots of its members. To read more about compound components initialisation check [this](compound-init.md).

We won't initialise any slot for the purpose of this tutorial.

## Check your first Compound Component

Now you can check the generated demo of the component performing the following steps:

* Start the embedded webserver using the `+startWebserver` grunt task available in the [DevTools](../../coder-devtools-cdt/).
* Your default browser will start.
* Navigate to: [http://localhost:8282/\[webpackage-name\]/currency-viewer/demo/](http://localhost:8282/[webpackage-name]/currency-viewer/demo/)

> Note that \[webpackage-name\] should be replaced by the name of your current webpackage.

It should look as follows:

![\`currency-viewer\` generated demo](../../assets/images/compound_demo.png)

You can also check the results at the [online demo](https://cubbles.world/sandbox/my-first-webpackage@0.1.0-SNAPSHOT/currency-viewer/demo/index.html).

