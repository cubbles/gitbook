
# Checklist for releasing a new webpackage.modelVersion

Releasing a new version of the `webpackage.modelVersion` can have an impact on several artifacts of the Cubbles Platform. Below is a checklist for adjusting these artifacts before releasing a new `webpackage.modelVersion`.

1. **cubx-webpackage-document-api**
   Create a new release on GitHub for the repository at [https://github.com/cubbles/cubx-webpackage-document-api](https://github.com/cubbles/cubx-webpackage-document-api). This repository contains the source code of the `cubx-webpackage-document-api` npm package. It holds the `manifest.webpackage` schema file and the functionality to validate `manifest.webpackage` files against the schema.
2. **cubbles-coder-devtools**
   Check if the grunt tasks of the [cubbles-coder-devtools](https://github.com/cubbles/cubbles-coder-devtools) npm package require changes. If so, apply these changes and release a new version of the `cubbles-coder-devtools` package.
3. **cubx-webpackage-version-converter**
   Adjust the [cubx-webpackage-version-converter](https://github.com/cubbles/cubx-webpackage-version-converter) npm package which holds functionality to convert existing webpackages using an old `webpackage.modelVersion` to the current `webpackage.modelVersion`. Apply changes if necessary and release a new version.
4. **cubx-grunt-webpackage-version-converter**
   Check if the [cubx-grunt-webpackage-version-converter](https://github.com/cubbles/cubx-grunt-webpackage-version-converter) npm package still works with the adjusted version of the `cubx-webpackage-version-converter`. If necessary, apply changes and release the new version.
5. **cubx-grunt-webpackage-scaffold**
    1. Update schema references in lib/config/* files.
    2. Adjust (file) structure if necessary
    3. Adjust HTML templates if there are changes in Cubbles TAG API
    4. Use the latest  `cubx-webpackage-viewer`
    5. Use the latest  `cubx.core.rte`
    6. Release a new version of the [cubx-grunt-webpackage-scaffold](https://github.com/cubbles/cubx-grunt-webpackage-scaffold) npm package
6. **cubx-wct-scaffolder**
   If necessary adjust the used [cubx-wct-scaffolder](https://github.com/cubbles/cubx-wct-scaffolder)  npm package and release a new version.
7. **cubx-grunt-wct-scaffolder**
   Check if the changes on `cubx-wct-scaffolder`  broke functionality of the [cubx-grunt-wct-scaffolder](https://github.com/cubbles/cubx-grunt-wct-scaffolder) npm package. If so, adjust it and release a new version.
8. **generator-cubbles**
   Use the latest version of the `cubbles-coder-devtools` in the [generator-cubbles](https://github.com/cubbles/generator-cubbles) npm package. Release a new version on npmjs.org.
9. **cubx.core.rte**
    Several modules might need adjustments to enable the support of a new `webpackage.modelVersion` in [RTE](https://github.com/cubbles/cubx.core.rte):
    - `Cubbles TAG API`
    - `CRC (allowed modelVersion)`
    - `DependencyManager`
    - `ManifestConverter`
    - `Cache`
    - `ManifestProcessor`
    - `CRC-Loader`
    - `CIF`
10. **cubbles-test**
    - Update all webpackages to the new rte version
    - Test them
    - Publish a fixed release of all webpackages
    - Change the version of all webpackages to the next SNAPSHOT version