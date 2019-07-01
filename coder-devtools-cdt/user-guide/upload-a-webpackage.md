# Upload a Webpackage

## Basics

As a coder, you can develop and test your webpackage(s) locally using the [CDT](../README.md) (Coder DevTools). If you want to provide it for a larger audience, you should upload it. That is, to transfer all files of a webpackage folder into a selected store of a [Cubbles Base](../../base/README.md) instance.

## Upload Configuration

Details for the upload of a webpackage are set using the  `uploadConfigs` Object in the *.webpackage* file within the root folder of each webpackage.

![.webpackage config file location](../../assets/images/wp_upload_config.png)

### Initial setup

Initially, the .webpackage file doesn't contain any configuration.
Just run `+webpackage-upload` the grunt task:

```bash
grunt +webpackage-upload
```

Now you see the .webpackage file containing an "uploadConfigs" object with 2 example configurations. Just rename/adapt them to your needs. You can define as many configurations as you like. The configuration object has the following properties:

1. `url [mandatory, string/url]`: This is the url of the Cubbles Base where the webpackage will be uploaded to.
2. `proxy [optional, string/url]`: If your connection to the Cubbles Base is routed over a proxy server, use this attribute to provide the proxy url.
3. `dryRun [optional, boolean]`: This option allows you to run the task, without actually uploading anything. It's perfect to check your store permissions or your `.cubblesignore` configuration.
4. `debug [optional, boolean]`: Set the debug option to "true" to print more details.

Some real examples of that file are available at [com.incowia.lib.chart-library](https://github.com/iCubbles/chart-library/blob/master/webpackages/com.incowia.lib.chart-library/.webpackage)
 and [cubx-maps](https://github.com/iCubbles/cubx-maps/blob/develop/webpackages/cubx-maps/.webpackage)

After running the `+webpackage-upload` again, you will be able to select one of the defined configurations as follows:

```bash
grunt +webpackage-upload
Currently mapped Webpackage: currency-viewer (@see ..\webpackages\.workspace)
 
Running "+webpackage-upload" task
> Reading available configs from '..\webpackages\currency-viewer\.webpackage'
? Please type the index of your choice to SELECT A CONFIG or to CANCEL the upload:
  1) dryRun: {"url":"https://cubbles.world/sandbox", "proxy":"", "dryRun":true}
  2) release: {"url":"https://cubbles.world/sandbox", "proxy":""}
  3) CANCEL
  Answer: 1
```

### Ignore files from upload (.cubblesignore)

The `.cubblesignore` file allows you to prevent individually defined files and folders from upload. Internally we use the [glob package](https://www.npmjs.com/package/glob) - so just read the [glob-primer](https://www.npmjs.com/package/glob#glob-primer) for supported patterns.

## Required Permissions

Uploading a webpackage into a server-side store requires your account to have appropriate permissions.

You can easily check your current permissions for 1..n stores via curl:

```bash
curl -s -X POST -H "Content-type: application/json" https://cubbles.world/_api/authenticate -d '{"user":"{username}","password":"{password}","stores":["sandbox","shared"]}'
{"access_token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjoiMyIsImdyb3VwcyI6WyJiZGUtdGVzdC5kZXZlbG9wZXJzIiwiY29yZS5kZXZlbG9wZXJzIiwiaW5jb3dpYS5kZXZlbG9wZXJzIiwib2Rpbi5kZXZlbG9wZXJzIiwicGNwLXNhbmRib3guZGV2ZWxvcGVycyIsInNhbmRib3guZGV2ZWxvcGVycyJdLCJwZXJtaXNzaW9ucyI6eyJzYW5kYm94Ijp7InVwbG9hZCI6dHJ1ZX19LCJpYXQiOjE0ODgxNzk2NDYsImV4cCI6MTQ4ODE4MzI0Nn0.hg1a7CvY02h3JBF8f8ZL9_mS_J3w-o6eo83nXvHHR1M"}
```

The response contains an access token. Just use [JWT](https://jwt.io/) to decode it and look at the permissions property to see for which of the passed stores you have rights for, as presented below:

![JWT decoding app](../../assets/images/image.png)

## Perform an Upload

To perform an upload, you should:

1. run the grunt task +webpackage-upload
2. choose the configuration to be used
3. provide provide your credentials

```bash
grunt +webpackage-upload
Currently mapped Webpackage: currency-viewer (@see ..\webpackages\.workspace)
 
Running "+webpackage-upload" task
> Reading available configs from '..\webpackages\currency-viewer\.webpackage'
? Please type the index of your choice to SELECT A CONFIG or to CANCEL the upload: 1
Starting upload ...
? username: ega
? password: *************
>> Success:
>> {
>>   "ok": true,
>>   "id": "my-first-webpackage@0.1.0-SNAPSHOT",
>>   "baseContext": {
>>     "uploadInfos": {
>>       "target": "cubbles.world/sandbox",
>>       "date": "2018-09-05T19:52:24.077Z",
>>       "user": "8",
>>       "client": "cubx-webpackage-uploader-3.3.5"
>>     }
>>   }
>> }

Done, without errors.
```

Then your webpackage is released and all components are ready to be used.
Use the *artifact search* of the store you uploaded into to see each artifact of your webpackage listed. Gor instance, the url for the "sandbox" store is:  [https://cubbles.world/sandbox/cubx.core.artifactsearch@1.6.1/artifactsearch/index.html](https://cubbles.world/sandbox/cubx.core.artifactsearch@1.6.1/artifactsearch/index.html). Cubbles stores looks as presented below:

![Cubbles stores UI](../../assets/images/cubbles_base.png)