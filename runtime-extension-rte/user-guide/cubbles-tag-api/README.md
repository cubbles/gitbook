# The Cubbles TAG API

## Purpose

To initialize a Cubble at runtime, the RTE provides a so-called _tag api_. This page describes the api and related usage scenarios.

## Prerequisites

1. The [RTE is available](rte-integration.md) on the web page.
2. The configured store contains the components needed on the web page.

## Create a Cubble

To have a Cubble available at runtime, put a (custom) HTML-tag named as the component itself into the HTML body. The attribute `cubx-webpackage-id` points to the webpackage containing the component. In the example below, a component called `first-demo-component` from the webpackage with id `demo-package@0.2` is created:

```html
<body>
//...
  <first-demo-component cubx-webpackage-id="demo-package@0.2"></first-demo-component>
//...
</body>
```

### Behind the scenes

If the page has been loaded by on a client, the RTE automatically

1. identifies html tags that declare Cubbles,
2. identifies all the resources which the component depends on (this is one of the unique features of the Cubbles RTE)
3. extends the header section of the html element referencing those resources (and lets the browser download them all)
4. creates a declaration for each Cubble that has been found,
5. creates the required connections between the Cubbles,
6. initializes the Cubbles with:
    1. default values (defined by the component developer)
    2. init values (defined by the page editor)
        > Note: If an (input) slot initialization leads to a change of an output slot value, the RTE propagates this value over all the outgoing connections.

## Cubble / Slot Initialization

In many cases, an initial configuration for a Cubble is needed. This can be done using the input slots exposed by the component.

The `<cubx-core-init>` element allows declaring any number of child tags `<cubx-core-slot-init>` to define initial values for input slots. The slot initialization is performed in the same order they were declared. In the example below, the `message`, `count`, `on` and `config` slots are initialized.

```html
<first-demo-component cubx-webpackage-id="demo-package@0.2">
  <cubx-core-init style="display:none">
    <cubx-core-slot-init slot="message">"Hello World!"</cubx-core-slot-init>
    <cubx-core-slot-init slot="count">5</cubx-core-slot-init>
    <cubx-core-slot-init slot="on">true</cubx-core-slot-init>
    <cubx-core-slot-init slot="config">{"label": "Name", "value": "Max Mustermann"</cubx-core-slot-init>
  </cubx-core-init>
</first-demo-component>
```

Note that you must use valid JSON values, that is:

1. String values need to be enclosed in double quotation marks: `"Hello World"`
2. Number values are expected to be written as "plain" characters: `5`
3. Boolean values are expected to be written as `true` or `false`
4. Objects values need be written as valid JSON into one or multiple lines: `{"label": "Name", "value": "..."}`

## Cubble / Connection Declarations

To enable the interaction among multiple Cubbles on a web page, the tag api allows declaring connections between them. A connection is like a point-to-point message channel that transfers slot values from a source to a target.

- Source: The output slot of a Cubble.
- Target: The input slot of another Cubble.

Each time an output slot value changes, the new value is propagated automatically over all its outgoing connections. In the example below, the `connection1` connection is declared between the `message` slot of `first-demo-component` and the `textInput` slot of the `second-demo-component` (whose `id` attribute is `second`).

```html
<first-demo-component id="first" cubx-webpackage-id="demo-package@0.2">
  <cubx-core-connections style="display:none">
    <cubx-core-connection connection-id="connection1" source="message", destination="second:textInput"></cubx-core-connection>
  </cubx-core-connections>
  <cubx-core-init style="display:none">
    <cubx-core-slot-init slot="message">"Hello World!"</cubx-core-slot-init>
  </cubx-core-init>
</first-demo-component>

<second-demo-component id="second" cubx-webpackage-id="demo-package@0.2"></second-demo-component>
```

> Note that the `destination` attribute of the connection uses the following syntax `id:slotId`, where `id` is the id attribute of the target component, and `slotId` is the id of the target slot. You need to use the id attribute since you can have several instances of the same component.

Additionally, the `first-demo-component` is initialized, consequently:

- The `message` slot of `first-demo-component` has the value `"Hello World!"`
- The `textInput` slot of `second-demo-component` has the value `"Hello World!"` due to the declared connection.

### Using hook-functions

You might have noticed that - if you can connect a Cubble's output slot with any input slot of any Cubble - there is no guarantee for the interfaces to be semantically interoperable (even if you ensures that both slots are of the same type).

Basically, this is ok and similar to the real world where no one has a global data model defined yet. To make different instances be able to understand each other, messages need to be translated/transformed.

To do the same in the "Cubbles World", you can (optionally) define a `hook-function` for a connection. A `hook-function` receives two parameters:

1. The slot value involved in the connection
2. A callback function that should be called after transforming/translated the slot value to continue the propagation process.

A hook-function may look similar to the one presented below:

```javascript
function (value, next) {
  var newValue = value;
  // do something with newValue
  next(newValue);
}
```

In the example below, the `connection1` connection defines a hook-function that adds a message to the received value.

```html
<first-demo-component id="first" cubx-webpackage-id="demo-package@0.2">
    <cubx-core-connections style="display:none">
      <cubx-core-connection connection-id="connection1" source="message", destination="second:textInput" hook-function="function(value,next){var newValue = value + ' - added by hook function'; next(newValue);}">
    </cubx-core-connection>
  </cubx-core-connections>
  <cubx-core-init style="display:none">
    <cubx-core-slot-init slot="message">"Hello World!"</cubx-core-slot-init>
  </cubx-core-init>
</first-demo-component>

<second-demo-component id="second" cubx-webpackage-id="demo-package@0.2"></second-demo-component>
```

> Note that if you have defined a global function, the value of `hook-function` attribute can be the name of that global function.

### Allowing repeated-values (default="false")

By default, if an output slot is renewed without changing the value itself, this value is **not** propagated to the connected slots. However, there are situations in which another behaviour is desired, e.g., when clicking a button is expected to trigger an action on a connected Cubble. In this case, each button-click will not produce different values but the action is expected to be executed each time. To enable that behaviour you should set the `repeated-values` attribute of a connection declaration as follows:

```html
<cubx-core-connection ... repeated-values="true"></cubx-core-connection>
```

### Disabling copy-value (default="true")

By default, the destination slot of a connection will receive a copy of the propagated value. This isolates the models of different Cubbles from each other. In most cases, this is the expected behaviour.

In case the source (the output slot) is of type 'object', a connection can optionally be configured to transfer a reference. This enables:

1. efficiency since it avoids creating a copy of the object,
2. implementing scenarios where different Cubbles share individual parts of their models - without needing to call the 'set' method on the output slot each time any property of the object has been changed.

But be careful, partially shared models allow each Cubble to change the state of all the other Cubbles.

To prevent copying the value of source slots you should set the `copy-value` attribute of a connection declaration as follows:

```html
<cubx-core-connection ... copy-value="false"></cubx-core-connection>
```