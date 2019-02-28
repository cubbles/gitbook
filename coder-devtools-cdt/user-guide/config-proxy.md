# Configure network proxy

## Usage of network proxy

If your computer is behind a network proxy, you might use a proxy configuration for some of the grunt tasks in devtools (e.g. run local server or [upload a webpackage](upload-a-webpackage.md)).

### Local http server

The local HTTP server forwards requests (for not locally available resources) to the configured remoteUrl. If the remoteUrl can only be reached through your network proxy, you should configure a proxy.

### Upload of the webpackages

Uploading a webpackage to a remote [Cubbles Base](../../base.md) requires access to the Base instance. If the remoteUrl can only be reached through your network proxy, you should configure a proxy.

## Configure the network proxy as environment variables

Use the environment variables http_proxy, https_proxy and no_proxy (or HTTP_PROXY, HTTPS_PROXY and NO_PROXY) to configure a network proxy for your local environment.

### Configure the network proxy in linux

In Linux you should run the following commands:

```bash
export http_proxy=http://my-http-proxy:80
export https_proxy=https://my-https-proxy:443
export no_proxy=localhost,127.0.0.1
```

### Configure the network proxy in windows

1. Press `Win+Pause` to open the Advanced system settings
2. Open Environment Variables
3. Add a new environment variable http_proxy, and configure the HTTP proxy URL
4. Add a new environment variable https_proxy, and configure the https proxy URL
5. Add a new environment variable no_proxy if you will exclude domains from the proxy, and configure a comma-separated list of excludes.

## Configure the network proxy for the workspace

If you don't want to configure the network proxy in the environment variables, you can do it in the `.workspace` file (\[your project path\]/webpackages/.workspace). The proxy configuration in the `.workspace` overrides the environment variables.

```javascript
{
  "activeWebpackage": "my-demo-webpackage",
  "remoteStoreUrl": "https://cubbles.world/core-test",
  "http_proxy": "http://my-http-proxy:80",
  "https_proxy": "https://my-https-proxy:443"
}
```

## Configure the network proxy for a particular upload config

You can define proxy settings on the upload configuration using the `proxy` property. In the example above, it overrides the existing higher-level configurations (in `.workspace` or on your local machine).

```javascript
{
  "uploadConfigs": {
    "development": {
      "url": "http://cubbles-base-local/core-test",
      "proxy": ""
    }
    "release": {
      "url": "https://cubbles.world/core-test",
      "proxy": "https://my-proxy:443"
    }
  }
}
```