module.exports = function(grunt) {
    'use strict';

    grunt.initConfig({

        clean: ['build'],

        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            all: {
                files: {
                    src: ['src/app/**/*.js', 'Gruntfile.js']
                }
            }
        },

        sass: {
            all: {
                files: {
                    'build/css/styles.css': 'src/sass/main.scss'
                }
            }
        },

        copy: {
            html: {
                files: [{
                        expand: true,
                        cwd: 'src/',
                        src: ['index.html'],
                        dest: 'build/'
                    }]
            },
            templates: {
                files: [{
                    expand: true,
                    cwd: 'src/app/templates',
                    src: ['**/*.html'],
                    dest: 'build/app/templates'
                }]
            },
            images: {
                files: [{
                    expand: true,
                    cwd: 'src/',
                    src: ['images/*.jpg', 'images/*.png'],
                    dest: 'build/'
                }]
            }
        },

        concat: {
            js: {
                options: {
                    sourceMap: true,
                },
                src: ['src/app/js/application/cyclist.module.js', 'src/app/**/*.js'],
                dest: 'build/app/main.js'
            }
        },

        watch: {
            sass: {
                files: ['src/sass/**/*.scss'],
                tasks: ['sass']
            },
            js: {
                files: ['src/app/**/*.js'],
                tasks: ['jshint', 'concat']
            },
            html: {
                files: ['src/index.html', 'src/app/templates/**/*.html'],
                tasks: ['copy:html', 'copy:templates']
            },
            images: {
                files: ['src/images/*.jpg'],
                tasks: ['copy:images']
            },
            tests: {
                files: ['test/**/*.js'],
                tasks: ['jshint', 'test']
            }
        },

        karma: {
                all: {
                    options: {
                        frameworks: ['chai', 'mocha'],
                        client: {
                            mocha: {
                                ui: 'tdd'
                            }
                        },
                        browsers: ['PhantomJS'],
                        singleRun: true,
                        files: [
                            'node_modules/angular/angular.js',
                            'node_modules/angular-ui-router/release/angular-ui-router.js',
                            'node_modules/angular-mocks/angular-mocks.js',
                            'src/app/js/application/cyclist.module.js',
                            'src/app/**/*.js',
                            'test/specs/**/*.js'
                        ],
                        preprocessors: {
                            'src/app/js/**/*.js': ['coverage']
                        },
                        reporters: ['dots', 'coverage'],
                        coverageReporter: {
                            type: 'text-summary'
                        }
                    }
                }
            }

    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-karma');

    grunt.registerTask('test', ['karma']);
    grunt.registerTask('build', ['clean', 'jshint', 'test', 'concat', 'sass', 'copy']);
    grunt.registerTask('default', ['build']);
};
