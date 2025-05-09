import { containerPlugin } from '@vuepress/plugin-container'
import { registerComponentsPlugin } from '@vuepress/plugin-register-components'
import { path } from '@vuepress/utils'
import { defaultTheme } from '@vuepress/theme-default'
import { viteBundler } from '@vuepress/bundler-vite'

export default {
    lang: 'en-US',
    title: 'Programming in C++',
    description: 'C++ Programming Course for VIVES University of Applied Sciences (Bachelor Degree)',
    
    theme: defaultTheme({
        colorMode: 'light',
        colorModeSwitch: false,
        logo: '/images/cpp_logo.png',
        navbar: [
    
        ],
        sidebar: [
            {
                text: 'Introduction',
                children: [
                  '/a-introductory/01-about-this-course/',  
                  '/a-introductory/02-what-is-cpp/',              
                ]
            },
            {
                text: 'Developer tools',
                children: [
                  '/developer-tools/01-visual-code/',  
                  '/developer-tools/02-mingw/',  
                ]
            },
            {
                text: 'Compiling and Linking',
                children: [
                    '/e-compiling-and-linking/01-the-compilation-process/',
                    '/e-compiling-and-linking/02-makefiles/',
                ]
            },
            {
                text: 'Fundamentals',
                children: [
                    '/a-introductory/03-hello-world/',
                    '/b-fundamentals/01-variables-and-datatypes/',
                    '/b-fundamentals/02-operators/',
                    '/b-fundamentals/03-input-output/',
                    '/b-fundamentals/04-conditional-constructs/',
                    '/b-fundamentals/05-loops/',
                    '/b-fundamentals/06-arrays/',
                    '/b-fundamentals/07-enums/',
                    '/b-fundamentals/08-functions/',
                ]
            },
            {
                text: 'Object Oriented Thinking',
                children: [
                    '/c-object-oriented-thinking/',
                    '/c-object-oriented-thinking/01-abstraction/',
                    '/c-object-oriented-thinking/02-all_about_objects/',
                ]
            },
            {
                text: 'Object Oriented Programming',
                children: [
                    '/d-object-oriented-programming/01-using-objects/',
                    '/d-object-oriented-programming/02-creating-classes/',
                    '/d-object-oriented-programming/03-constructors/',
                    '/d-object-oriented-programming/04-composition/',
                    '/g-inheritance/01-basic-inheritance/',
                    '/g-inheritance/02-polymorphism/',
                    '/g-inheritance/03-abstract-methods-classes-interfaces/',
                ]
            },            
            {
                text: 'Advanced Topics',
                children: [
                    '/f-more-advanced-cpp/01-pointers/',
                    '/f-more-advanced-cpp/02-dynamic-memory-allocation/',
                    '/f-more-advanced-cpp/03-exceptions/',
                    '/f-more-advanced-cpp/04-file-streams/',
                    '/h-mental-topics/01-operator-overloading/',
                ]
            },               
            {
                text: 'Standard Library',
                children: [
                    '/y-standard-library/std-vector/'
                ]
            },                                    
        ],
        sidebarDepth: 0,    
        smoothScroll: true
      }),
      serviceWorker: true,
      plugins: [
        containerPlugin({
            type: 'codeoutput',
            locales: {
              '/': {
                defaultInfo: 'Output',
              },
            },
        }),
        containerPlugin({
            type: 'insight',
            locales: {
              '/': {
                defaultInfo: 'Key Insight',
              },
            },
        }),
        registerComponentsPlugin({
          componentsDir: path.resolve(__dirname, './components'),
        }),
      ],
      bundler: viteBundler()
    }