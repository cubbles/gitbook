# How to render HTML Markup coming from input slot?

When you want to render HTML markup code that comes from an input slot, you should use the *innerHTML* of the target HTML element. In the logic of your elementary component, you should use *model\[SlotId\]Changed* method to access the HTML code and set it to the desired component.

Let's say you have a component with a string input slot called *html*, and you want to render this html code within a div whose id is *container*. To aim this you should code something similar to:

```javascript
...
modelHtmlChanged: function (html) {
    var container = document.querySelector('#container');
    container.innerHTML = html;
}
...
```