module.exports = {
  title: 'Cubbles Documentation',
  themeConfig: {
    logo: '/cubblesLogo.png',
    nav: [
      { text: 'About Cubbles', link: 'http://cubbles.github.io/' },
    ],
    sidebar: [
      '/',
      {
        title: 'First steps',
        children: [
          '/first-steps/',
          '/first-steps/generate-a-project',
          '/first-steps/create-a-webpackage',
          '/first-steps/create-elementary',
          {
            title: 'Create a compound component',
            children: [
              '/first-steps/create-compound/',
              '/first-steps/create-compound/compound-init',
            ]
          }
        ]
      },
      {
        title: 'Runtime extension - RTE',
        children: [
          '/runtime-extension-rte/',
          {
            title: 'User guide',
            children: [
              '/runtime-extension-rte/user-guide/',
              '/runtime-extension-rte/user-guide/rte-integration',
              {
                title: 'The Cubbles TAG API',
                children: [
                  '/runtime-extension-rte/user-guide/cubbles-tag-api/',
                  '/runtime-extension-rte/user-guide/cubbles-tag-api/dependency-api',                    
                ]
              },
              {
                title: 'The Cubbles Javascript API',
                children: [
                  '/runtime-extension-rte/user-guide/cubbles-js-api/',
                  '/runtime-extension-rte/user-guide/cubbles-js-api/outside-interaction',                    
                  '/runtime-extension-rte/user-guide/cubbles-js-api/dynamic-connections',                    
                  '/runtime-extension-rte/user-guide/cubbles-js-api/inside-interaction',                    
                ]
              },
              {
                title: 'The RTE Processing',
                children: [
                  '/runtime-extension-rte/user-guide/rte-processing/',
                  '/runtime-extension-rte/user-guide/rte-processing/rte-init-render',
                ]
              },
              {
                title: 'The Cubbles IFrame API',
                children: [
                  '/runtime-extension-rte/user-guide/cubbles-iframe-api/',
                  '/runtime-extension-rte/user-guide/cubbles-iframe-api/cubbles-iframe-resizer',
                ]
              },
              '/runtime-extension-rte/user-guide/mutation-based-start-event/',
              {
                title: 'FAQs',
                children: [
                  '/runtime-extension-rte/user-guide/faqs/',
                  '/runtime-extension-rte/user-guide/faqs/manual-conflict-resolution',
                  '/runtime-extension-rte/user-guide/faqs/dynamic-component-instance',
                  '/runtime-extension-rte/user-guide/faqs/render-html-code-of-input-slot',
                  '/runtime-extension-rte/user-guide/faqs/replace-dep',
                  '/runtime-extension-rte/user-guide/faqs/synch-dataflow',
                  '/runtime-extension-rte/user-guide/faqs/non-serializable-slot-value',
                  '/runtime-extension-rte/user-guide/faqs/include-resource-manually',
                ]
              } 
            ]
          },
          {
            title: 'Contributor Guide',
            children: [
              '/runtime-extension-rte/contributor-guide/',
              '/runtime-extension-rte/contributor-guide/cif-processing',
            ]
          }
        ]
      },
      {
        title: 'Developing with the vanilla boilerplate',
        children: [
          '/developing-vanilla-boilerplate/',
          '/developing-vanilla-boilerplate/creating-project',
          '/developing-vanilla-boilerplate/developing-elementaries',
          '/developing-vanilla-boilerplate/developing-compounds',
          '/developing-vanilla-boilerplate/available-scripts',
        ]
      },
      {
        title: 'Coder devtools - CDT',
        children: [
          '/coder-devtools-cdt/',
          {
            title: 'User guide',
            children: [
              '/coder-devtools-cdt/user-guide/',
              '/coder-devtools-cdt/user-guide/create-artifacts',
              '/coder-devtools-cdt/user-guide/upload-a-webpackage',
              '/coder-devtools-cdt/user-guide/generate-readme-file',
              '/coder-devtools-cdt/user-guide/rename-artifact',
              '/coder-devtools-cdt/user-guide/config-proxy',
              '/coder-devtools-cdt/user-guide/validate-manifest',
              '/coder-devtools-cdt/user-guide/change-active-webpackage',
              '/coder-devtools-cdt/user-guide/bulk-upload',
              '/coder-devtools-cdt/user-guide/release-webpackage',
              '/coder-devtools-cdt/user-guide/update-rte',
              '/coder-devtools-cdt/user-guide/prepare-release',
              '/coder-devtools-cdt/user-guide/update-to-next-version',
              '/coder-devtools-cdt/user-guide/generate-art-wct-scaffold',
              '/coder-devtools-cdt/user-guide/testing-components',
              '/coder-devtools-cdt/user-guide/validate-sources',
              '/coder-devtools-cdt/user-guide/create-webpackage-demo',
            ]
          },
          {
            title: 'Contributor guide',
            children: [
              '/coder-devtools-cdt/contributor-guide/',
              '/coder-devtools-cdt/contributor-guide/release-model-v-checklist',
            ]
          }
        ]
      },
      {
        title: 'Terms and concepts',
        children: [
          '/terms-and-concepts/',
          '/terms-and-concepts/webpackage',
          '/terms-and-concepts/artifacts',
          '/terms-and-concepts/user-roles',
          '/terms-and-concepts/base',
        ]
      }
    ],
  },
  head: [
    ['link', { rel: 'icon', href: '/favicon-16x16.png' }]
  ],
}