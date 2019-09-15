module.exports = function (grunt) {
    //configuration
    grunt.initConfig({
        //pass in options to plugins , references to file etc
        //concat is a Property which takes OBject to concat
        concat: {
            js: {
                src: ['controller/*.js', 'model/*.js', 'routes/*.js'],
                dest: 'build/script.js'
            },
            css: {
                src: ['css/*.css'],
                dest: 'build/csscript.css'
            }
        },
        // uglify: {
        //     build: {
        //         files: [{
        //             src: 'script.js',
        //             dest: 'uglify-script.js'
        //         }]
        //     }
        // }
    })

    //load plugins
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    //Register tasks
    //grunt.registerTask('concat-js', ['concat.js']);
    //grunt.registerTask('concat-css', ['concat.css']);
    //grunt.registerTask('uglifying', ['uglify.build']);
    //grunt.registerTask('all', ['concat-js','concat-css'])

}