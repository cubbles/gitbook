(window.webpackJsonp=window.webpackJsonp||[]).push([[39],{286:function(t,e,a){"use strict";a.r(e);var r=a(0),s=Object(r.a)({},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h1",{attrs:{id:"configure-network-proxy"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#configure-network-proxy","aria-hidden":"true"}},[t._v("#")]),t._v(" Configure network proxy")]),t._v(" "),a("h2",{attrs:{id:"usage-of-network-proxy"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#usage-of-network-proxy","aria-hidden":"true"}},[t._v("#")]),t._v(" Usage of network proxy")]),t._v(" "),a("p",[t._v("If your computer is behind a network proxy, you might use a proxy configuration for some of the grunt tasks in devtools (e.g. run local server or "),a("router-link",{attrs:{to:"/coder-devtools-cdt/user-guide/upload-a-webpackage.html"}},[t._v("upload a webpackage")]),t._v(").")],1),t._v(" "),a("h3",{attrs:{id:"local-http-server"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#local-http-server","aria-hidden":"true"}},[t._v("#")]),t._v(" Local http server")]),t._v(" "),a("p",[t._v("The local HTTP server forwards requests (for not locally available resources) to the configured remoteUrl. If the remoteUrl can only be reached through your network proxy, you should configure a proxy.")]),t._v(" "),a("h3",{attrs:{id:"upload-of-the-webpackages"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#upload-of-the-webpackages","aria-hidden":"true"}},[t._v("#")]),t._v(" Upload of the webpackages")]),t._v(" "),a("p",[t._v("Uploading a webpackage to a remote "),a("router-link",{attrs:{to:"/base.html"}},[t._v("Cubbles Base")]),t._v(" requires access to the Base instance. If the remoteUrl can only be reached through your network proxy, you should configure a proxy.")],1),t._v(" "),a("h2",{attrs:{id:"configure-the-network-proxy-as-environment-variables"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#configure-the-network-proxy-as-environment-variables","aria-hidden":"true"}},[t._v("#")]),t._v(" Configure the network proxy as environment variables")]),t._v(" "),a("p",[t._v("Use the environment variables http_proxy, https_proxy and no_proxy (or HTTP_PROXY, HTTPS_PROXY and NO_PROXY) to configure a network proxy for your local environment.")]),t._v(" "),a("h3",{attrs:{id:"configure-the-network-proxy-in-linux"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#configure-the-network-proxy-in-linux","aria-hidden":"true"}},[t._v("#")]),t._v(" Configure the network proxy in linux")]),t._v(" "),a("p",[t._v("In Linux you should run the following commands:")]),t._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[t._v("export")]),t._v(" http_proxy"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v("http://my-http-proxy:80\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("export")]),t._v(" https_proxy"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v("https://my-https-proxy:443\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("export")]),t._v(" no_proxy"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v("localhost,127.0.0.1\n")])])]),a("h3",{attrs:{id:"configure-the-network-proxy-in-windows"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#configure-the-network-proxy-in-windows","aria-hidden":"true"}},[t._v("#")]),t._v(" Configure the network proxy in windows")]),t._v(" "),a("ol",[a("li",[t._v("Press "),a("code",[t._v("Win+Pause")]),t._v(" to open the Advanced system settings")]),t._v(" "),a("li",[t._v("Open Environment Variables")]),t._v(" "),a("li",[t._v("Add a new environment variable http_proxy, and configure the HTTP proxy URL")]),t._v(" "),a("li",[t._v("Add a new environment variable https_proxy, and configure the https proxy URL")]),t._v(" "),a("li",[t._v("Add a new environment variable no_proxy if you will exclude domains from the proxy, and configure a comma-separated list of excludes.")])]),t._v(" "),a("h2",{attrs:{id:"configure-the-network-proxy-for-the-workspace"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#configure-the-network-proxy-for-the-workspace","aria-hidden":"true"}},[t._v("#")]),t._v(" Configure the network proxy for the workspace")]),t._v(" "),a("p",[t._v("If you don't want to configure the network proxy in the environment variables, you can do it in the "),a("code",[t._v(".workspace")]),t._v(" file ([your project path]/webpackages/.workspace). The proxy configuration in the "),a("code",[t._v(".workspace")]),t._v(" overrides the environment variables.")]),t._v(" "),a("div",{staticClass:"language-javascript extra-class"},[a("pre",{pre:!0,attrs:{class:"language-javascript"}},[a("code",[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"activeWebpackage"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"my-demo-webpackage"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"remoteStoreUrl"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"https://cubbles.world/core-test"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"http_proxy"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"http://my-http-proxy:80"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"https_proxy"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"https://my-https-proxy:443"')]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),a("h2",{attrs:{id:"configure-the-network-proxy-for-a-particular-upload-config"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#configure-the-network-proxy-for-a-particular-upload-config","aria-hidden":"true"}},[t._v("#")]),t._v(" Configure the network proxy for a particular upload config")]),t._v(" "),a("p",[t._v("You can define proxy settings on the upload configuration using the "),a("code",[t._v("proxy")]),t._v(" property. In the example above, it overrides the existing higher-level configurations (in "),a("code",[t._v(".workspace")]),t._v(" or on your local machine).")]),t._v(" "),a("div",{staticClass:"language-javascript extra-class"},[a("pre",{pre:!0,attrs:{class:"language-javascript"}},[a("code",[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"uploadConfigs"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"development"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"url"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"http://cubbles-base-local/core-test"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"proxy"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('""')]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"release"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"url"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"https://cubbles.world/core-test"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"proxy"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"https://my-proxy:443"')]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])])])},[],!1,null,null,null);e.default=s.exports}}]);