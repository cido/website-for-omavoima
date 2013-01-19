::
:: Utility batch file for Grunt Windows users
::
:: Normally using non-global version of grunt is quite difficult for Windows
:: users. This script makes it possibly to just execute grunt commands from
:: the project root directory. When executed, it changes the current folder
:: to node_modules/.bin where grunt.cmd is actually located, and executes the
:: command there (%* notation passed all the rest command line arguments to the
:: actual grunt.cmd). After a successful execution, folder is changed back to
:: the original one.
::
:: As an additional bonus, because B comes before J in alphabets, this batch
:: file also fixes this annoyance:
:: https://github.com/gruntjs/grunt/wiki/Frequently-Asked-Questions
:: -> "On Windows, why does my JS editor open when I try to run grunt?"
::
@echo off
cd node_modules\.bin & grunt %* & cd ..\..