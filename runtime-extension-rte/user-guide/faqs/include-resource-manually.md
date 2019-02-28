# What do I have to do to load the optimized resources of the component?

If we want not load the resources automatically, becouse for example we want optimize the loading time.
The following steps are to do:

1. Download (and optimize) all resources.
1. Turn off resource injection in RTE.
1. Add the resources manually (after recived "crcBeforeResourceInjection" event).
1. Fire event "crcDepMgrReady".


## Download (and optimize) all resources

If you not want calculate and download all dependencies manually,  
you can use the ``cubx-resource-resolver`` npm module for download and put together the single recources. 
```
const ResourceResolver = require('cubx-resource-resolver');
let resourceResolver = new ResourceResolver(mode);
let rootDependencies = [
  {webpackageId: 'cubx.core.rte@2.5.2', artifactId: 'cif'},
  {webpackageId: 'lodash-3.10.1@1.1.0', artifactId: 'lodash'}
  // etc ...
];
let outputDir = 'cubbles-resources';
let baseUrl = 'https://cubbles.world/sandbox';

let promise = resourceResolver.resolve(rootDependencies, outputDir, baseUrl, rootDependencyExcludes)
```
This calculate all nessecary dependencies outgoing from rootDependencies, download the resources of the dependencies and create the four joined resource files in the output dircetory:
* html-import-scripts.js (jointed scripts from html-import resources, referenced by html-imports.html)
* html-imports.html (jointed html-import resources)
* scripts.js (jointed script resources)
* styles.css (jointed css resources)

## Turn off resource injection in RTE

Configure ``disableResourceInjection``, so that the RTE not inject resources automatically. 
```
window.cubx = {
    CRCInit: {
      disableResourceInjection: true,
      ...
    }
}
      
```
## Add the resources manually (after recived "crcBeforeResourceInjection" event)

Register an event handler for the event ``crcBeforeResourceInjection``. If the event recived, load all the resources manually.
```
document.addEventListener('crcBeforeResourceInjection', function (evt) {
        // add scripts
        var element = document.createElement('script');
        element.setAttribute('src', '/cubbles-resources/scripts.js');
        element.async = false;
        document.head.appendChild(element);
        // add styles
        element = document.createElement('link');
        element.setAttribute('rel', 'stylesheet');
        element.setAttribute('href', '/cubbles-resources/styles.css');
        document.head.appendChild(element);

        // add templates
        element = document.createElement('link');
        element.setAttribute('rel', 'import');
        element.setAttribute('href', '/cubbles-resources/html-imports.html');
        document.head.appendChild(element);
        // fire "crcDepMgrReady" event, so that CRC can continue the remaining tasks 
        window.cubx.CRC.fireDepMgrReadyEvent();
      });
```
## Fire event "crcDepMgrReady"

After loading all resources, fire the "crcDepMgrReady" event oder use the method "cubx.CRC#fireDepMgrReadyEvent".
```
window.cubx.CRC.fireDepMgrReadyEvent();
```


 
