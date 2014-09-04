'use strict';
var ext = require('./.gruntExt');
module.exports = function (grunt) {

    // Common
    ext.configure({
        path: {
            src: 'src/webc-utils',
            tmp: 'dist/webc-utils',
            dist: 'dist/webc-utils.js'
        },
        clean: {
            src: ['dist/*]
        }
    });

    // Library
    ext.configure({
        ts: {
            lib: {
                src: ['<%= path.src %>/**/*.ts'],
                outDir: '<%= path.tmp %>',
                options: {
                    module: 'commonjs',
                    target: 'es3',
                    sourceMaps: true,
                    declaration: true,
                    removeComments: false
                }
            }
        },
        nodeunit: {
            lib: '<%= path.tmp %>/**/*_tests.js'
        },
        browserify: {
            lib: {
                files: {
                    '<%= path.dist %>': ['<%= path.tmp %>/**/*.js']
                }
            }
        },
        uglify: {
            lib: {
                files: {
                    'dist/webc-utils.min.js': 'dist/webc-utils.js'
                }
            }
        }
    });
    ext.registerTask('_lib', ['ts:lib', 'nodeunit:lib', 'browserify:lib', 'uglify:lib']);

    // Dev
    ext.configure({
        watch: {
            lib: {
                files: ['src/webc/**/*.ts'],
                tasks: ['_lib'],
                options: {
                    spawn: true
                }
            }
        }
    });
    ext.registerTask('_dev', ['components', 'watch']);

    // Tasks
    ext.initConfig(grunt);
    grunt.registerTask('default', ['clean', '_lib']);
    grunt.registerTask('dev', ['default', '_dev']);
}
