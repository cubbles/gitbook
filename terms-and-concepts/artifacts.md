# Artifacts

A [Webpackage](webpackage.md) contains at least a `manifest.webpackage` file and an arbitrary number of **artifacts**. An artifact can be one of the following:

* **Apps** can be used to provide complete html documents - containing a more or less sophisticated web application. Keep in mind that Cubbles has its main focus on components - to be used in 3rd party web applications.
* With **components** we make a difference between elementary components \(aka "elementaries"\) and compound components \(aka "compounds". Both are different types of artifacts and described in different sections of the `manifest.webpackage`.
* **Utilities** are artifacts to wrap any kind of resource, that can be used by components \(or apps\). Use utilities to provide js functionality \(simple functions or complete libraries\), styles etc. That is, anything that might be used by more than one other artifact.

Each artifact may contain any number of **resources** \(js, css, json etc. -files\).

## Artifact definition

Artifacts are defined using JSON syntax under the `"artifacts"` property on the top-level of the `manifest.webpackage` file:

```javascript
{
  "name": "the-unique-name-of-my-webpackage",
  "version": "1.0.0",
  "modelVersion": "10.0.0",
  "docType": "webpackage",
  "author": {
    "name": "John Doe",
    "email": "john.doe@example.org"
  },
  "license": "MIT",
  "homepage": "http://project.home.com",
  "keywords": [
    "connectors",
    "energy"
  ],
  "runnables": [
      {
        "name": "readme",
        "path": "/doc/readme.html",
        "description": "Read this ..."
      }
  ],
  "artifacts": {
    "apps": [
       // 0..n apps
       {
           "artifactId": "app-name",
           "runnables": [],
           "resources": [], // Optional
           "dependencies": [], // Optional
           "dependencyExcludes": [], // Optional
           "description": "A description" // Optional

       }
    ],
    "compoundComponents": [
       // 0..n compounds
       {
           "artifactId": "compound-name",
           "resources": [],
           "members": [],
           "connections": [],
           "slots": [], // Optional
           "inits": [], // Optional
           "dependencies": [], // Optional
           "runnables": [], // Optional
           "dependencyExcludes": [], // Optional
           "description": "A description" // Optional

       }
    ],
    "elementaryComponents": [
       // 0..n elementaries
       {
           "artifactId": "elementary-name",
           "resources": [],
           "slots": [], // Optional
           "dependencies": [], // Optional
           "runnables": [], // Optional
           "dependencyExcludes": [], // Optional
           "description": "A description" // Optional

       }
    ],
    "utilities": [
       // 0..n utilities
       {
           "artifactId": "util-name",
           "resources": [],
           "dependencies": [], // Optional
           "runnables": [], // Optional
           "dependencyExcludes": [], // Optional
           "description": "A description" // Optional

       }
    ]
}
```

Check [this](http://cubbles.github.io/cubx-webpackage-document-api/schema-explorer.html?schemaPath=master/lib/jsonSchema/manifestWebpackage-10.0.0.schema.json) for more information about the `manifest.webpackage` file.

