# How to handle the copyValue flag for non serializable instances?

By default, a slot value is copied when it is propagated due to a connection. However, that is behaviour is problematic when a slot value is non serializable (e.g. an object with circular references) since it cannot be copied. To be able to have non serializable slot values, you may set the *copyValue* property of a connection to false. In that case, a slot value will not be copied, instead, it will be passed as a reference.

This way, a connection definition between a *componentA* and a *componentB* may look as follows:

```json
...
{
    "connectionId": "nonSerializableConnection",
    "source": {
        "memberIdRef": "componentA",
        "slot": "nonSerializableSlot"
    },
    "destination": {
        "memberIdRef": "componentB",
        "slot": "nonSerializableSlot"
    },
    "copyValue": false
}
...
```