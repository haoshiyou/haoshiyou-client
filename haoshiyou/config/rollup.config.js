var nodeResolve = require('rollup-plugin-node-resolve');
var commonjs = require('rollup-plugin-commonjs');
var globals = require('rollup-plugin-node-globals');
var builtins = require('rollup-plugin-node-builtins');
var json = require('rollup-plugin-json');


// https://github.com/rollup/rollup/wiki/JavaScript-API

var rollupConfig = {

    useStrict: false, // MODIFIED line 26

    /**
     * entry: The bundle's starting point. This file will
     * be included, along with the minimum necessary code
     * from its dependencies
     */
    entry: '{{SRC}}/app/main.dev.ts',

    /**
     * sourceMap: If true, a separate sourcemap file will
     * be created.
     */
    sourceMap: true,

    /**
     * format: The format of the generated bundle
     */
    format: 'iife',

    /**
     * dest: the output filename for the bundle in the buildDir
     */
    dest: 'main.js',

    /**
     * plugins: Array of plugin objects, or a single plugin object.
     * See https://github.com/rollup/rollup/wiki/Plugins for more info.
     */
    plugins: [
        builtins(),
        commonjs({
            include: [
                'node_modules/rxjs/**',
                'node_modules/angularfire2/**',
                'node_modules/angular2-jwt/**',
                'node_modules/firebase/**',
                'node_modules/localforage/**',
                'node_modules/log4javascript/**'
            ],
            namedExports: {
                'node_modules/firebase/firebase.js': ['initializeApp', 'auth', 'database'],
                'node_modules/angularfire2/node_modules/firebase/firebase-browser.js': ['initializeApp', 'auth', 'database'],
                'node_modules/log4javascript/log4javascript.js': ['Logger']
            }
        }),
        nodeResolve({
            module: true,
            jsnext: true,
            main: true,
            browser: true,
            extensions: ['.js']
        }),
        globals(),
        json()
    ]

};


if (process.env.IONIC_ENV == 'prod') {
    // production mode
    rollupConfig.entry = '{{TMP}}/app/main.prod.ts';
    rollupConfig.sourceMap = false;
}


module.exports = rollupConfig;
