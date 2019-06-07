# Base

The Base is the backend of the Cubbles platform. It provides a repository to manage Cubbles components and services for component upload, replication between multiple Base instances and component delivery to web clients. Base operators can set up any numbers of independent “stores”. Each store can be referred to by a web client \(using the [Cubbles-RTE](../runtime-extension-rte/)\).

![The Cubbles Platform](../assets/images/cubbles_platform.png)

## Key features

1. **Webpackage Repository**: The Base is able to store an unlimited number of webpackages.
2. **Webpackage Delivery**: Any stored webpackage can be requested directly by any web client.
3. **Multiple Stores**: Admin can create any number of independent webpackage stores.
4. **Authorized Uploads**: Uploading of new webpackages is restricted to users with corresponding permissions.
5. **Easy Setup**: The Base is Docker-based. All images are publicly available on [Docker Hub](https://hub.docker.com/u/cubbles/).
6. **Replication**: Webpackages for a store can easily be replicated from other stores.

## The Artifactsearch

The artifact search is an application that allows accessing the artifacts of a store; e.g., the ["shared" store](https://cubbles.world/shared/cubx.core.artifactsearch@1.6.1/artifactsearch/index.html).

![Artifactsearch](../assets/images/cubbles_base.png)

