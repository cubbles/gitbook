
# Interacting with Cubbles from the outside

The Cubbles Platform offers you a set of methods which allow you to interact with a Cubble (Compound or Elementary component instance) from outside the component, e.g. from a script associated to the page where the cubble is attached. Below, these methods are presented and explained using the  `cubx-textarea` component:

## Methods for outside interaction

The methods to interact with a cubble are generated for each slot of a component. Their names, except for  _slots_  method, are composed by a prefix related to the method. followed by the slot's name starting with capital letter, so for example the  _get_  method for a slot called  _value_  would be  _setValue()_. The following table presents and explains the use of these methods:

| Method name convention | Description |
|------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| get<Slotid> () | Get the current internal value of the slot |
| set<Slotid> (value) | Set the internal value of the slot. If the slot is an output slot, the value will be propagated afterwards. |
| repropagate<Slotid> () | Trigger the propagation of the current internal value of the slot. This method is available for output slots. *Note that when the internal value of a slot changes, an automatic propagation of this value is triggered. So this method is useful when you need to "force" this propagation at any time.* |
| slots () | Return an array containing the definitions of all slots of the component. |
| addDynamicConnection (dynamicConnection) | Add a dynamic connection to the component. (See  [Dynamic connections section](https://cubbles.atlassian.net/wiki/spaces/RTE/pages/20523470/2.4+The+Cubbles+Javascript+API#id-2.4|TheCubblesJavascriptAPI-dynamic-connections)) |

### Using the methods

Now in order to use these methods you should have our component already working, to aim that you might have an html page like the one shown below:

<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>&lt;cubx-textarea&gt;</title>
    <script src="https://cubbles.world/sandbox/cubx.core.rte@2.3.0/webcomponents-lite/webcomponents-lite.js"></script>
    <script src="https://cubbles.world/sandbox/cubx.core.rte@2.3.0/crc-loader/js/main.js" data-crcinit-loadcif="true"></script>
</head>
<body>
    <cubx-textarea cubx-webpackage-id="com.incowia.basic-html-components@1.0"></cubx-textarea>
</body>
</html>

Now to interact with the component, first we need to retrieve it from DOM within a script:

...
 <script>
    (function(){
      'use strict';
       
      // Get the component from DOM
      var cubxTextarea = document.querySelector('cubx-textarea');
      ...    
    })()
 </script>
...

Then, we should wait until the component is ready to interact:

### A working example

The code below follow the indications presented above using our `cubx-textarea` component to:

1.  Get the component from DOM
2.  Set some of its slots' values
3.  Get those slots' values
4.  Get the list of slots' definitions of our component
5.  Show the slots values and the whole list of slots within the {{cubx-textarea}}

#### Code
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Interacting with &lt;cubx-textarea&gt;</title>
  <script src="https://cubbles.world/sandbox/cubx.core.rte@2.3.0/webcomponents-lite/webcomponents-lite.js"></script>
  <script src="https://cubbles.world/sandbox/cubx.core.rte@2.3.0/crc-loader/js/main.js" data-crcinit-loadcif="true"></script>
</head>
 
<body>
  <cubx-textarea cubx-webpackage-id="com.incowia.basic-html-components@1.0"></cubx-textarea>
 
  <script>
    (function(){
      'use strict';
       
      // 1. Get the component from DOM
      var cubxTextarea = document.querySelector('cubx-textarea');
 
      // 2. Wait until the component is ready to be used
      document.addEventListener('cifReady', function() {
        // Use set methods of slots to set the textare
        cubxTextarea.setId('myTextArea');
        cubxTextarea.setCols(40);
        cubxTextarea.setRows(20);
        cubxTextarea.setMinLength(100);
        cubxTextarea.setMaxLength(500);
         
        // 3. Use the get methods to get slots values and append it to 'textareaValue'
        var textareaValue = '';
        textareaValue += 'Id: ' + cubxTextarea.getId() + '\n';
        textareaValue += 'Cols: ' + cubxTextarea.getCols() + '\n';
        textareaValue += 'Rows: ' + cubxTextarea.getRows() + '\n';
        textareaValue += 'MinLength: ' + cubxTextarea.getMinLength() + '\n';
        textareaValue += 'MaxLength: ' + cubxTextarea.getMaxLength()+ '\n';
         
        // 4. Get the slots list append it to the 'textareaValue'
        textareaValue += '\nSlots definitions:\n' + JSON.stringify(cubxTextarea.slots(), null, '  ');
         
        // 5. Set the value of the textarea with the 'textareaValue' string
        cubxTextarea.setValue(textareaValue);
      });     
    })()
  </script>
</body>
</html>

#### Result
![](https://cubbles.atlassian.net/wiki/download/thumbnails/20523470/textareaResult.png?version=1&modificationDate=1493158819289&cacheVersion=1&api=v2&width=250&height=250)

## Intercepting changes on output slots

Sometimes it could be useful for you to detect when the value of an output slot has changed and get this new value, to aim that you just need to listen to the _cifModelChange_ event. Then, to get the slot information you should use  _event.detail_ property, which is an object with the following properties:

1.  **slot**: corresponds to the name of the slot whose value has changed
2.  **payload**: corresponds to the new value of the slot

### A working example

The only output slot of our  `cubx-textarea`  component is  _value_. The following example will add a  _<p>_ element showing the  _slot_  and the  _payload_  properties of the event detail each time the  _value_  slot changes its value. Such change can be triggered by just typing within the textarea and then clicking outside, or pressing tab key, etc.

#### Code
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Interacting with &lt;cubx-textarea&gt;</title>
  <script src="https://cubbles.world/sandbox/cubx.core.rte@2.3.0/webcomponents-lite/webcomponents-lite.js"></script>
  <script src="https://cubbles.world/sandbox/cubx.core.rte@2.3.0/crc-loader/js/main.js" data-crcinit-loadcif="true"></script>
</head>
<body>
  <cubx-textarea cubx-webpackage-id="com.incowia.basic-html-components@1.0"></cubx-textarea>
   
  <h2>Log:</h2>
 
  <script>
    (function(){
      'use strict';
       
      // 1. Get the component from DOM
      var cubxTextarea = document.querySelector('cubx-textarea');
       
      // 2. Listen to the 'cifModelChange' event
      cubxTextarea.addEventListener('cifModelChange', function(event) {
        if (event.detail.slot === 'value') {
          var p = document.createElement('p');
          p.innerHTML = '<strong>Slot: </strong>' + JSON.stringify(event.detail.slot) +
            ', <strong>Payload: </strong>' + JSON.stringify(event.detail.payload);
          document.body.appendChild(p);
        }
      });     
    })()
  </script>
</body>
</html>

#### Result

![](https://cubbles.atlassian.net/wiki/download/attachments/20523470/cifModelChange.png?version=1&modificationDate=1493158818339&cacheVersion=1&api=v2)

## Special outside interaction for elementary components

Since elementary components are registered as Polymer elements using the CubxPolymer object (explained [a section below](https://cubbles.atlassian.net/wiki/spaces/RTE/pages/20523470/2.4+The+Cubbles+Javascript+API#id-2.4|TheCubblesJavascriptAPI-cubxpolymer-object)), you would also like to interact with it accessing the  _model_ of the elementary using Javascript as shown below:

...
 <script>
    ...
      // Wait until the component is ready to be used
      document.addEventListener('cifReady', function() {
        // Interact with the component using the methods presented above
        cubxTextarea.model.id = 'myTextArea';
        ...
        // And the access it
        var textareaId = cubxTextarea.model.id;
        ...
      });     
    })()
 </script>
...

However, in Polymer the sub-properties are not observable by default, which means that in the code above  `cubxTextarea.model.id = 'myTextArea'`  won't be propagated.

## Dynamic connections

As mentioned  [above](https://cubbles.atlassian.net/wiki/spaces/RTE/pages/20523470/2.4+The+Cubbles+Javascript+API#id-2.4|TheCubblesJavascriptAPI-public-outside-methods), there is a method called `addDynamicConnection`, which allows you to add a connection between two components dynamically. Those components should be within the same Context. The argument of this method is an instance of the `window.cubx.cif.DynamicConnection`  object, which have the following properties:

| Property name | Type | Requirement | Description |
|-----------------|---------|------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| source | object | required | Represents the source of the connection. It has the following properties:runtimeId (string): indicates the runtimeId of the source componentslot (string): indicates the name of the source slot of the connection |
| destination | object | required | Represents the target or destination of the connection. It has the following properties:runtimeId (string): indicating the runtimeId of the destination componentslot (string): indicating the name of the destination slot of the connection |
| connectionId | string | optional (automatically generated) | Indicates the id for this connection, which should be unique within a context |
| hookFunction | string | optional | Describes a function or the nema of a function to be called before the value is set in the destination slot |
| repeatedValues | boolean | optional | Indicates whether same value can be propagated consecutively |
| copyValue | boolean | optional | Indicates whether the payload of the connection should be copied or not |
| directExecution | boolean | optional | Indicates whether the connection should start working after its creation |

### Public methods

To set and validate the properties of a `DynamicConnection`  you can use the following methods:

| Method name | Description |
|--------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| setSource (source) | Set the source object to a dynamic connection |
| setSourceRuntimeId (runtimeId) | Set the runtimeId property to the source of a dynamic connection |
| setSourceSlot (slotName) | Set the slot name to the source of a dynamic connection |
| setDestination (destination) | Set the destination object to a dynamic connection |
| setDestinationRuntimeId (runtimeId) | Set the runtimeId to the destination of a dynamic connection |
| setDestinationSlot (slotName) | Set the slot name to the destination of a dynamic connection |
| setConnectionId (connectionId) | Set an id to the connection 
> When you add the connection to a component its connectionId will be generated automatically, thus you don't need to set it. |
| setCopyValue (copyValue) | Set the copyValue property of the connection, which indicates whether the payload of the connection should be copied or not |
| setRepeatedValues (repeatedValues) | Set the repeatedValues property of the connection, which indicates whether same value can be propagated consecutively |
| setHookFunction (hookFunction) | Set a function to the connection, which will be called before the value is set in the destination slot |
| setDirectExecution (directExecution) | Set the directExecution property of the dynamic connection, which indicates whether the connection should start working after its creation, i.e. the current value of the source should be propagated immediately. |
| validate () | Validate all the properties of a dynamic connection. Additionally, throw and report errors when any |

### Creating and adding a dynamic connection

Using the methods described  [above,](https://cubbles.atlassian.net/wiki/spaces/RTE/pages/20523470/2.4+The+Cubbles+Javascript+API#id-2.4|TheCubblesJavascriptAPI-dynamic-connection-methods) you can create a dynamic connection to added it to an existing component. To create a connection, first you need to access the source and destination component:

...
var sourceTextArea = document.querySelectorAll('cubx-textarea')[0];
var destinationTextArea = document.querySelectorAll('cubx-textarea')[1];
...

Then, you should instantiate and set the properties of a _DynamicConnection_ object:

...
var dynCon = new window.cubx.cif.DynamicConnection();
 
 
dynCon.setSourceRuntimeId(sourceTextArea.getAttribute('runtime-id'));
dynCon.setSourceSlot('value');
dynCon.setDestinationRuntimeId(destinationTextArea.getAttribute('runtime-id'));
dynCon.setDestinationSlot('value');
dynCon.setDirectExecution(true);
...

Finally, you need to access the desired component (source or destination) and add the dynamic connection:
...
sourceTextArea.addDynamicConnection(dynCon);
...

### A working example

This time we will have two instances of our `cubx-textarea` component  and we will connect the their  _value_  slots. The first `cubx-textarea`  will be the source component, which will have an initial value, which will let us see the effect of having the _directExecution_ property set to  _true_. The code below allows to:

1.  Get the source and destination components from DOM
2.  Listen to the 'cifReady' event to enable the 'Add dynamic connection' button
3.  Listen to the 'click' event
4.  Instantiate and set the properties of the DynamicConnection object
5.  Add the DynamicConnection to the source component
6.  Disable the 'Add dynamic connection' button

#### Code

<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Adding dynamic connections</title>
  <script src="https://cubbles.world/sandbox/cubx.core.rte@2.3.0/webcomponents-lite/webcomponents-lite.js"></script>
  <script src="https://cubbles.world/sandbox/cubx.core.rte@2.3.0/crc-loader/js/main.js" data-crcinit-loadcif="true"></script>
</head>
<body>
   
  <button id="button" disabled>Add dynamic connection</button>
  <hr>
   
  <cubx-textarea cubx-webpackage-id="com.incowia.basic-html-components@1.0">
    <cubx-core-init style="display:none">
        <cubx-core-slot-init slot="value">"Value of the source textarea"</cubx-core-slot-init>
        <cubx-core-slot-init slot="label">"Source textarea"</cubx-core-slot-init>
    </cubx-core-init>
  </cubx-textarea>
  <cubx-textarea cubx-webpackage-id="com.incowia.basic-html-components@1.0">
    <cubx-core-init style="display:none">
        <cubx-core-slot-init slot="label">"Destination textarea"</cubx-core-slot-init>
    </cubx-core-init>
  </cubx-textarea>
  <script>
    (function(){
      'use strict';
       
      var button = document.querySelector('#button');
       
      // 1. Get the source and destination components from DOM
      var sourceTextArea = document.querySelectorAll('cubx-textarea')[0];
      var destinationTextArea = document.querySelectorAll('cubx-textarea')[1];
       
      // 2. Listen to the 'cifReady' event to enable the 'Add dynamic connection' button
      document.addEventListener('cifReady', function(event) {
        button.removeAttribute('disabled');       
      });
       
      // 3. Listen to the 'click' event
      button.addEventListener('click', function () {
        // 4. Instantiate and set the properties of the DynamicConnection object
        var dynCon = new window.cubx.cif.DynamicConnection();
        dynCon.setSourceRuntimeId(sourceTextArea.getAttribute('runtime-id'));
        dynCon.setSourceSlot('value');
        dynCon.setDestinationRuntimeId(destinationTextArea.getAttribute('runtime-id'));
        dynCon.setDestinationSlot('value');
        dynCon.setDirectExecution(true);
         
        // 5. Add the DynamicConnection to the source component
        sourceTextArea.addDynamicConnection(dynCon);
         
        // 6. Disable the 'Add dynamic connection' button
        button.setAttribute('disabled', 'disabled');
      });    
    })()
  </script>
</body>
</html>

#### **Result**

##### **Before clicking 'Add dynamic connection' button**

![](https://cubbles.atlassian.net/wiki/download/attachments/20523470/beforeClick.png?version=1&modificationDate=1493158817858&cacheVersion=1&api=v2)  


##### **After clicking 'Add dynamic connection' button**

![](https://cubbles.atlassian.net/wiki/download/attachments/20523470/afterClick.png?version=1&modificationDate=1493158818128&cacheVersion=1&api=v2)  

# Interacting with Cubbles from the inside (Only Elementary Components)

By interacting from the inside, we mean to control the behavior of component from its logic or its view. Thus, this process can be carried out only for elementary components, remember that compound component have no associated logic. When you are developing elementary components you will certainly need to control the behavior of your component, e.g. setting a slot value, or performing some action after a slot value changes.

From now, we will assume that we are developing our sample component, the `cubx-textarea`, we will explore how to interact with the elementary from the view, the logic and the manifest of our elementary (See  [Create an Elementary Component](https://cubbles.atlassian.net/wiki/spaces/CDT/pages/6422716/Create+an+Elementary+Component)). For the purpose of this tutorial we will assume the the `cubx-textarea`  only have three slots: _id, value_ and _label._

## The CubxPolymer object

The CubxPolymer object provides the global `CubxPolymer()` function used for registering a new Cubble component. This basically extends the global `Polymer()` function that comes with Polymer and that is used for implementing elementary Cubbles components. These extension means:

1.  The addition of a _model_ as a property of the Polymer element to enable elementary interaction
2.  The availability of methods for external interaction and internal interaction with that  _model_

For more details see [Polymer Project](https://www.polymer-project.org/1.0/).

## Interaction within the view

The interaction within the view (cubx-textarea.html file) of the elementary is posible due to the _model_  property. In our case the `cubx-textarea`  view will contain:

1.  A  `label` tag to show a label for the component when the _label_ has a value
2.  A  `textarea` tag which is the heart of our `cubx-textarea`  component

<link rel="import" href="cubx-textarea-style.html">
<dom-module id="cubx-textarea">
    <template>
        <!-- Style for the component which in this case is included from a file called cubx-textarea-style -->
        <style include="cubx-textarea-style"></style>
        <label></label>
        <textarea></textarea>
    </template>
 
    <!-- Logic for the component which in this case is included from a file called cubx-textarea.js -->
    <script src="cubx-textarea.js"></script>
</dom-module>

> The `<dom-module>` tag allow you to create and manages the local dom of the elementaries, this is a feature from Polymer, so if want to get more information about it check the [Local DOM Basics and API](https://www.polymer-project.org/1.0/docs/devguide/local-dom).

Within this view we will access our component's slots using the _model_, but first, we need to understand some Polymer concepts:

1.  **Data binding**:  connects data (the _model_  property) from a custom element (our _elementary_ or _host element_ as called by polymer) to a property or attribute of an element in its local DOM (e.g. the label tag within our `cubx-textarea`). The data binding is possible due to the binding annotations (More info at [Data binding](https://www.polymer-project.org/1.0/docs/devguide/data-binding)):
    1.  _{{ }} binding annotation_: when using double curly bracket (`{{ }}`) the data flow goes down from host (elementary) to target (element in local dom) and up from target to host.
    2.  _[[ ]] binding annotation:_ when using double square bracket (`[[ ]]`) the data flow goes only down from host (elementary) to target (element in local dom).
2.  **Data paths**:  a _path_ is a string that identifies a property or subproperty _relative to a scope_. In our case, the scope is our elementary (More info at [Polymer data paths](https://www.polymer-project.org/1.0/docs/devguide/data-system#paths)).

To access the slots you need to use a data path following this convention: `model.<slotname>`. In the view we only want to bind the  _label_  and the  _id_  slots to the html elements, so our code would looks as shown below:

<link rel="import" href="cubx-textarea-style.html">
<dom-module id="cubx-textarea">
    <template>
        <!-- Style for the component which in this case is included from a file called cubx-textarea-style -->
        <style include="cubx-textarea-style"></style>
        <!-- $ is used to bind html attributes-->
        <label for$="{{model.id}}">{{model.label}}</label>
        <textarea id$="{{model.id}}"></textarea>
    </template>
 
    <!-- Logic for the component which in this case is included from a file called cubx-textarea.js -->
    <script src="cubx-textarea.js"></script>
</dom-module>

> Note that in Polymer **sub-properties are not observable**  by default. Since, all the slots are sub-properties of model, this means that any change to the slots within the local-dom (e.g. a change to the attribute  _id_  in the textarea of the cubx-textarea) will not be propagated.

### A working example

Once again we will use our `cubx-textarea`  elementary, but having into account that its view corresponds to the one built in last section. This time, we use the [2.3 | The Cubbles Tag API](https://cubbles.atlassian.net/wiki/spaces/RTE/pages/20522890/2.4+%7C+The+Cubbles+Tag+API)  to initialize the slots:  _id_ and _label_. Which allow us to see how useful can be to use the _model_  property within the view.

#### Code

<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Interacting with &lt;cubx-textarea&gt; from the View</title>
  <script src="../../../cubx.core.rte@2.3.0/webcomponents-lite/webcomponents-lite.js"></script>
  <script src="../../../cubx.core.rte@2.3.0/crc-loader/js/main.js" data-crcinit-loadcif="true"></script>
</head>
 
<body>
  <cubx-textarea cubx-webpackage-id="this">
    <cubx-core-init style="display:none">
        <cubx-core-slot-init slot="id">"myTextarea"</cubx-core-slot-init>
        <cubx-core-slot-init slot="label">"Textarea label"</cubx-core-slot-init>
    </cubx-core-init>
  </cubx-textarea>
</body>
</html>

#### Result

![](https://cubbles.atlassian.net/wiki/download/attachments/20523470/textareaInteractingView.png?version=1&modificationDate=1493158819063&cacheVersion=1&api=v2)

## Interaction within the logic

When programming the logic of an elementary component you will certainly need to access and edit slots' values. Within the logic you can also use the  [public methods](https://cubbles.atlassian.net/wiki/spaces/RTE/pages/20523470/2.4+The+Cubbles+Javascript+API#id-2.4|TheCubblesJavascriptAPI-public-outside-methods)  used to interact from the outside, i.e.  _get<Slotid>()_,  _set<Slotid>(value)_,  _slots ()_  and  _repropagate<Slotid> ()_. In these cases, the component is referenced using _this_  since you are inside the component, e.g. use `this.getId()` in our  `cubx-textarea`  elementary to access the value of the  _id_  slot. Additional to those methods you can use the ones explained below:

| Method name convention | Description |
|-------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| cubxReady () | This method will be called, whenall dependencies are included,all components and all connections are created andthe initialization is done.Thus, it is useful when you need to perform some code when the components are ready to be used. |
| model<Slotid>Changed () | Called when the value of the slot has changed due to calling the set<Slotid>(value) method. It is useful when you need to perform additional logic after the slot has changed. 
> If you need to reset the value of the slot within this method, you should use the model property, i.e. this.model.slotid = newValue, then to propagate new value use this.repropagate<Slotid> (). Otherwise, using set<Slotid>(newValue) will cause an infinite loop. |

### Adding logic to the cubx-textarea component

In order to make our `cubx-textarea` component to work properly when textarea value changes. To aim that, first we will need to modify the  [view](https://cubbles.atlassian.net/wiki/spaces/RTE/pages/20523470/2.4+The+Cubbles+Javascript+API#id-2.4|TheCubblesJavascriptAPI-cubx-textarea-view) of the component as follows:

...
  <textarea id$="{{model.id}}" on-change="inputFieldSlotValueChanged"></textarea>
...

Then in the logic (cubx-textarea.js file) of the component we need to add:

1.  The method  _inputFieldSlotValueChanged_  which is called when the value of the textarea changes.
2.  A method to update textarea when the  _slot_ value changes, here we access local dom using  [Polymer selector](https://www.polymer-project.org/1.0/docs/devguide/local-dom).

These methods wold look as follows:

...
inputFieldSlotValueChanged: function (event) {
   // update the cubbles-model
   this.setValue(event.target.value);
},
 
 
modelValueChanged: function (newValue) {
   // update the view
   this.$$('textarea').value = newValue;
},
...

The whole code for the view and logic would be:
<link rel="import" href="cubx-textarea-style.html">
<dom-module id="cubx-textarea">
 
    <template>
        <style include="cubx-textarea-style"></style>
        <label for$="{{model.id}}">{{model.label}}</label>
        <textarea id$="{{model.id}}" on-change="inputFieldSlotValueChanged"></textarea>
    </template>
 
    <script src="cubx-textarea.js"></script>
</dom-module>

(function () {
'use strict';
 
CubxPolymer({
is: 'cubx-textarea',
 
/**
 * A handler to be called by the local textarea
 * @param {event} event
 */
inputFieldSlotValueChanged: function (event) {
    // update the cubbles-model
    this.setValue(event.target.value);
},
 
 
/**
 *  Called when slot 'value' has changed
 */
modelValueChanged: function (newValue) {
    // update the view
    this.$$('textarea').value = newValue;
}
});
}());

A similar approach, ie. using the _model<Slotid>Changed ()_  method, could be used for all the attributes and slots of the  `cubx-textarea` presented  [above](https://cubbles.atlassian.net/wiki/spaces/RTE/pages/20523470/2.4+The+Cubbles+Javascript+API#id-2.4|TheCubblesJavascriptAPI-cubx-textarea-interface).

### A working example

This time, we will use two instances of the `cubx-textarea` elementary but having into account that its view corresponds to the one built in last section. We use the [2.3 | The Cubbles Tag API](https://cubbles.atlassian.net/wiki/spaces/RTE/pages/20522890/2.4+%7C+The+Cubbles+Tag+API) to initialize the slots: _id, value_ and _label_ and create a connection and to compose a compound componen composed by the tow instances. Which allow us to see how the logic and view of our `cubx-textarea` works properly within a compound.

#### Code
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Interacting with &lt;cubx-textarea&gt; from the View</title>
  <script src="../../../cubx.core.rte@2.1.2/webcomponents-lite/webcomponents-lite.js"></script>
  <script src="../../../cubx.core.rte@2.1.2/crc-loader/js/main.js" data-crcinit-loadcif="true"></script>
</head>
<body>
  <cubx-textarea cubx-webpackage-id="this" id="textarea1">
    <cubx-core-init style="display:none">
        <cubx-core-slot-init slot="label">"Textarea 1"</cubx-core-slot-init>
        <cubx-core-slot-init slot="value">"Value of textarea 1"</cubx-core-slot-init>
    </cubx-core-init>
    <cubx-core-connections style="display:none">
        <cubx-core-connection connection-id="valueCon" source="value", destination="textarea2:value"></cubx-core-connection>
    </cubx-core-connections>
  </cubx-textarea>
  <cubx-textarea cubx-webpackage-id="this" id="textarea2">
    <cubx-core-init style="display:none">
        <cubx-core-slot-init slot="label">"Textarea 2"</cubx-core-slot-init>
    </cubx-core-init>
  </cubx-textarea>
</body>
 
</html>

#### Result

![](https://cubbles.atlassian.net/wiki/download/attachments/20523470/textareaInteractingLogic.png?version=1&modificationDate=1493158818834&cacheVersion=1&api=v2)

## Interaction via initialization

Input slots can be initialized in manifest, so that you can predefined an initial interaction by default. For elementary components, the slot definition object has a property called _value_. This value will be set to the slot during component initialization, thus when _cubxReady()_  is called the slot will have this value.

Now we will initialized the value of the slots of our `cubx-textarea` component. The slots definition should look similar to the one shown below, note that the initialization occurs due to the  _value_  property:

...
"slots": [
   {
     "slotId": "id",
     "type": "string",
     "direction": [
       "input"
     ],
     "value": "myTextarea",
   },
   {
      "slotId": "value",
      "type": "string",
      "direction": [
        "input",
        "output"
      ],
     "value": "The value of my textarea",
   },
   {
      "slotId": "label",
      "type": "string",
      "direction": [
        "input"
      ]
     "value": "",
   }
]
...

> Note that he propagation of these initial values will not be propagated, since this initialization is only valid for input slots.

### A working example

This time we should just use the component to see the result of defining init values for the slots:

#### Code

<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Interacting with &lt;cubx-textarea&gt; from the View</title>
  <script src="../../../cubx.core.rte@2.1.2/webcomponents-lite/webcomponents-lite.js"></script>
  <script src="../../../cubx.core.rte@2.1.2/crc-loader/js/main.js" data-crcinit-loadcif="true"></script>
</head>
<body>
  <cubx-textarea cubx-webpackage-id="this"></cubx-textarea>
</body>
</html>

#### Result

![](https://cubbles.atlassian.net/wiki/download/attachments/20523470/textareaInteractingInit.png?version=1&modificationDate=1493158818582&cacheVersion=1&api=v2)