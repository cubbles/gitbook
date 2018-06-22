---
description: This section is about the documentaion of the cubbles runtime extension.
---

# Runtime Extension - RTE

The __RTE (RunTime Extension)__ works within the clients webbrowser. Just integrate the RTE into a web page with 2 simple script tags and you are ready to use Cubbles components.

__The RTE/CRC__ (Client Runtime Container)

- identifies the Cubbles Components used on the webpage,
- resolves the resources needed to instantiate the Cubbles Components,
- lets your browser download the related resources (html, js, css etc.).

__Now the RTE/CIF__ (Component Interaction Framework)

- waits for the ressources to be available,
- creates the component instances (aka "cubbles") and
- initialises each cubble with values provided by the developer.
