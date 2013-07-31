module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-shell');

    // Project configuration
    grunt.initConfig({
        pkg: 'omavoiman-kotisivut',

        watching: {
            options: { livereload: true },
            css: {
                files: [ 'sass/**/*.scss' ],
                tasks: [ 'compass:development', 'shell:copyCSS' ]
            },
            other: {
                files: [ '_layouts/*.html', 'js/*.js', '*.markdown' ],
                tasks: [ 'shell:developmentJekyll' ]
            }
        },

        compass: {
            options: {
                sassDir: 'sass',
                cssDir: 'css',
                force: true,
                imagesDir: 'image-assets',
                relativeAssets: true
            },
            development: {
                options: {
                    debugInfo: true
                }
            },
            production: {
                options: {
                    debugInfo: false,
                    noLineComments: true,
                    outputStyle: 'compressed'
                }
            }
        },

        shell: {
            options: {
                stdout: true,
                stderr: true,
                failOnError: true
            },
            copyCSS: {
                command: 'rm -rf _site/css/* && cp css/*.css _site/css/'
            },
            developmentJekyll: {
              command: 'rm -rf _site/* && jekyll --url "http://localhost:80/"'
            },
            productionJekyll: {
              command: function () {
                var dir = grunt.option('dir') || '_site';
                return 'rm -rf ' +dir+ '/* && jekyll build -d ' +dir;
              }
            }
        },

        connect: {
          server: {
            options: {
              port: 80,
              base: '_site'
            }
          }
        }

    });

    grunt.registerTask('default', [
      'compass:development',
      'shell:developmentJekyll'
    ]);

    grunt.registerTask('build', [
      'compass:production',
      'shell:productionJekyll'
    ]);

    grunt.registerTask('server', [
      'connect:server:keepalive'
    ]);

    // Watch -> Compile everything first and start watching for additional changes after that
    grunt.renameTask('watch', 'watching');
    grunt.registerTask('watch', [
        'default',
        'watching'
    ]);

};
