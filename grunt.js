module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-compass');

    // Project configuration
    grunt.initConfig({
        pkg: 'KirjoitusCSS',

        watch: {
            css: {
                files: [ 'src/sass/*.scss' ],
                tasks: [ 'compass:development', 'compass:production' ]
            }
        },

        compass: {
            development: {
                src: 'src/sass',
                dest: 'src/css',
                linecomments: true,
                forcecompile: true,
                debugsass: true,
                images: 'src/images',
                relativeassets: true
            },
            production: {
                src: 'src/sass',
                dest: 'src/css-for-production',
                outputstyle: 'compressed',
                linecomments: false,
                forcecompile: true,
                debugsass: false,
                images: 'src/images',
                relativeassets: true
            }
        }

    });

    // Watch -> Compile everything first and start watching for additional changes after that
    grunt.renameTask('watch', 'watchForChanges');
    grunt.registerTask('watch', 'compass:development compass:production watchForChanges');

    grunt.registerTask('default', 'compass:development compass:production');
};
