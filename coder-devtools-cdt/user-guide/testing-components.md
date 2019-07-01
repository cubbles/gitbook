# Testing Cubbles components

## Purpose

To demonstrate how to test a Cubbles component in a browser.

## Prerequisites

To be able to test a component, you should have:

* Created a [compound](../../first-steps/create-compound/README.md) or [elementary](../../first-steps/create-elementary.md) component. In the case of this tutorial, we will test the `currency-converter` elementary, whose webpackage can be cloned from its [GitHub repository](https://github.com/iCubbles/my-first-project).
* Installed the CDT dependencies running the `npm install` command from its root folder (usually called *devtools*)

> You can check [this tutorial](../../first-steps/create-elementary.md) to know how to create elementary components and to read more details about the currency-converter` elementary. Also, a demo of this component is available [online](https://cubbles.world/sandbox/my-first-webpackage@0.1.0-SNAPSHOT/currency-converter/demo/index.html).

## Testing the currency-converter component

To be able to test our component, we need to have a test environment to write and run unit tests. Run the [_generateArtifactWctScaffold](generate-art-wct-scaffold.md) task to generate that environment.

The created environment will allow you to write tests using [Chai 2.3.0](https://www.chaijs.com/api/) assertions and [Sinon 1.17.1](https://sinonjs.org/releases/v1.17.7/).

### Preparing the tests

As you may know, you should write the component tests in the `currency-converter-test.js` file inside the `test` folder. You should follow the following steps:

1. For our purposes, you can remove the sample tests and leave only the outer `describe` of the script
2. Set a high timeout number (e.g. 70000) because loading components locally can take too long depending on the internet connection and the number of components
3. Create a variable to access the component
4. Create a variable for a stub to wrap the `makeRequest` function that makes the AJAX requests in the component, so that our tests do not rely on an external API. For more information about Sinon Stubs check [this](https://sinonjs.org/releases/v1.17.7/stubs/)
5. Create a variable to maintain the expected values for the assertions
6. Init those values within a `before` function
7. Wait until the component is ready to run the tests
8. Restore the created stub within an `after` function

The previous process is illustrated below:

```javascript
describe('<currency-converter>', function () { // ---------- Step 1 ----------
  // ---------- Step 2 ----------
  this.timeout(70000);
  // ---------- Step 3 ----------
  var currencyConverter;
  // ---------- Step 4 ----------
  var makeRequestStub;
  // ---------- Step 5 ----------
  var expectedVals= {
    init: {
      base: 'EUR',
      foreignCurrency: 'USD',
      date: '2018-01-01',
      conversion: 1
    },
    set: {
      base: 'COP',
      foreignCurrency: 'EUR',
      date: '2018-07-07',
      conversion: 2
    }
  };  
  // ---------- Step 6 ----------
  before(function (done) {
    // Select component
    currencyConverter = document.querySelector('currency-converter');
    var rootNode = document.querySelector('[cubx-core-crc]');

    // ---------- Step 7 ----------
    rootNode.addEventListener('cifInitReady', function () {
      // Wrap sendQuery since it makes Ajax requests (When it is already defined in the component)
      makeRequestStub = sinon.stub(currencyConverter, 'makeRequest', function (url, callback) {
        var data = {};
        var values;
        switch (currencyConverter.getBase()) {
          case expectedVals.init.base:
            values = expectedVals.init;
            break;
          case expectedVals.set.base:
            values = expectedVals.set;
            break;
          default:
            converted = null;
        }
        // Return data as API will do it
        var conversion = {};
        conversion[values.date] = values.conversion
        data[values.base + '_' + values.foreignCurrency] = {
          val: conversion
        };
        callback(data);
      });
      done();
    });
  });

  // ---------- Step 8 ----------
  after(function () {
    makeRequestStub.restore();
  });
});
```

### Testing initial status of the currency-converter component

Note that the `currency-converter` slots should have the initial values defined in its `manifest.webpackage` file. These values are presented below:

| Slot | Value |
|-----------------|--------------|
| base | 'EUR' |
| foreignCurrency | 'USD' |
| date | '2018-01-01' |

As you may noticed, the `makeRequestStub` Stub that we defined will return an object in the format in which the conversion API would do it (i.e. `{ [base_foreignCurrency]: { val: { [date]: conversion } }`). It will use the values of `expectedVals.init` if the value of the slot is equal to `expectedVals.init.base`, which corresponds to the value defined in the manifest.

Therefore, we will test that:

1. The initial value of the `foreignCurrency` slot is equal to the one defined in the `manifest.webpackage` file
2. The initial value of the `date` slot is equal to the one defined in the `manifest.webpackage` file
3. The initial value of the `base` slot is equal to the one defined in the `manifest.webpackage` file
4. The `makeRequest` method is called (An API request is done)
5. The first value of the `conversion` slot is equal to the value of `expectedVals.init.conversion`. That is, that the API answer is processed correctly

The above tests can be done with the following code:

```javascript
describe('<currency-converter>', function () {
  
  //...

  describe('should have initial values set in manifest', function () {
    // ---------- Test 1 ----------
    it('should set the value of "foreignCurrency" slot = "' + expectedVals.init.foreignCurrency + '"', function () {
      expect(currencyConverter.getForeignCurrency()).to.be.equal(expectedVals.init.foreignCurrency);
    });
    // ---------- Test 2 ----------
    it('should have the initial value of "date" slot = "' + expectedVals.init.date + '"', function () {
      expect(currencyConverter.getDate()).to.be.equal(expectedVals.init.date);
    });
    // ---------- Test 3 ----------
    it('should have the initial value of "base" slot = "' + expectedVals.init.base + '"', function () {
      expect(currencyConverter.getBase()).to.be.equal(expectedVals.init.base);
    });
    // ---------- Test 4, 5 ----------
    it('should make the request with the initial values and set ', function () {
      expect(makeRequestStub.calledOnce).to.be.equal(true);
      expect(currencyConverter.getConversion()).to.be.equal(expectedVals.init.conversion);
    });
});
```

### Testing that slots of the currency-converter component are set correctly

Now, we will test that the component behaves correctly when the slots are set using the `setSlotName` methods offer by Cubbles. We should:

1. Set all the input slots and call the method that sends the query to eh API
2. Check that the `foreignCurrency` slot was set correctly
3. Check that the `date` slot was set correctly
4. Check that the `base` slot was set correctly
5. Check that the `conversion` slot was calculated correctly

The code below illustrates the previous steps:

```javascript
describe('<currency-converter>', function () {
  
  //...

  describe('should set slots values correctly', function () {
    // ---------- Step 1 ----------
    before(function() {
      currencyConverter.setForeignCurrency(expectedVals.set.foreignCurrency);
      currencyConverter.setDate(expectedVals.set.date);
      currencyConverter.setBase(expectedVals.set.base);
      currencyConverter.sendQuery();
    });
    // ---------- Test 2 ----------
    it('should have the initial value of "foreignCurrency" slot = "' + expectedVals.set.foreignCurrency + '"', function () {
      expect(currencyConverter.getForeignCurrency()).to.be.equal(expectedVals.set.foreignCurrency);
    });
    // ---------- Test 3 ----------
    it('should have the initial value of "date" slot = "' + expectedVals.set.date + '"', function () {
      expect(currencyConverter.getDate()).to.be.equal(expectedVals.set.date);
    });
    // ---------- Test 4 ----------
    it('should have the initial value of "base" slot = "' + expectedVals.set.base + '"', function () {
      expect(currencyConverter.getBase()).to.be.equal(expectedVals.set.base);
    });
    // ---------- Test 5 ----------
    it('should make the request with the initial values and set ', function () {
      expect(currencyConverter.getConversion()).to.be.equal(expectedVals.set.conversion);
    });
  });
```

## Result

T o run the tests in the browser, start a local webserver running the following command:

```bash
grunt +startWebserver
```

If everything goes well, the bash will display the following message:

```bash
Currently mapped Webpackage: org.john.doe.my-first-webpackage (@see ../webpackages/.workspace)

Running "cubx-http-server:dev" (cubx-http-server) task
Server running on http://localhost:8282/
Hit CTRL-C to stop the server
```

Then, navigate to [http://localhost:8282/my-first-webpackage/currency-converter/test/index.html](http://localhost:8282/my-first-webpackage/currency-converter/test/index.html). Wait until the tests are executed. If everything goes well, you should get the following messages:

![Passing tests messages](../../assets/images/passing_tests.png)

## Check it online

You can run the tests [online](https://cubbles.world/sandbox/my-first-webpackage@0.1.0-SNAPSHOT/currency-converter/test/index.html). Also, the source code of the tests is available at [GitHub](https://github.com/iCubbles/my-first-project/blob/master/webpackages/my-first-webpackage/currency-converter/test/currency-converter-test.js).