# Compound slot initialisation

## Purpose

To explain how to initialise the value of the slots of a compound component and its members.

## Prerequisites

You know how to [create compound components](./).

## Introduction

Sometimes, it might be useful to initialise the value of a compound component slot or the slot of a member to assure some behaviour when the component is loaded. You can perform this initialisation in the _manifest_ file associated to your component, using the _inits_ property of a compound component definition. In the following sections, we will explore this process and present some related details.

## Sample case

To clarify the initialization process, we will use the `currency-viewer` compound created in [this tutorial](./).

## Initialising slots

You can initialise the slots of a compound component or the slots of its members in the manifest definition using the inits property, which is an array of objects with the following structure:

| Property | Requirement | Description |
| :--- | :--- | :--- |
| description | Optional | A short description of this initialisation, e.g. responsibility. |
| memberIdRef | Required only for members initialization | The _memberId_ of the member that contains the slot. It is only necessary if the slot belongs to a member. |
| slot | Required | _slotId_ of the slot to be initialised |
| value | Required | The value to init the slot with, it can be an object, an array, a string, a number or a boolean. |

> If a slot is connected to more than one slot, the initialization will be performed in the order in which the _connections_ were defined in the connections property of the compound component.

### Initialising compound slots

If you want to set the initial value of the slot of a component, you should provide the _slotId_ of the desired slot. Remember that when initialising compounds, the _memberIdRef_ property should not be defined.

### Initialising member slots

Let's say that we want to have the following default values for our compound:

| slot | memberIdRef | Init value |
| :--- | :--- | :--- |
| base | currencyConverter | GBP \(Pound sterling\) |
| foreignCurrency | currencyConverter | EUR |
| date | currencyConverter | 2016-06-24 |

To aim that, we should extend the _inits_ property of the compound definition as follows:

```javascript
    // ...
    "compoundComponents": [
      {
        "artifactId": "currency-viewer",
        // ...
        "inits": [
          {
            "slot": "base",
            "memberIdRef": "currencyConverter",
            "value": "GBP",
            "description": "Pound sterling would be the default base currency"
          },
          {
            "slot": "foreignCurrency",
            "memberIdRef": "currencyConverter",
            "value": "EUR",
            "description": "Euro would be the default target currency"
          },
          {
            "slot": "base",
            "memberIdRef": "currencyConverter",
            "value": "2018-06-23",
            "description": "Default date for the currency conversion"
          }
        ]
      },
      // ...
    ],
    // ...
```

> Note that if the component of a member has been initialised within its definition, that initialisation will be overwritten by the one you define within the compound that contains it as a member.

#### Result

If you run the demo page of the `currency-viewer` component, you will note that the input texts have the values that you defined as presented below:

![Initialised members demo](../../assets/images/compound_member_init.png)

You can also check the results at the [online demo](https://cubbles.world/sandbox/my-first-webpackage@0.1.0-SNAPSHOT/currency-viewer-init/demo/index.html).

