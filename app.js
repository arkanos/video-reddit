#!/usr/bin/env node
const   program = require('commander');

const   {download} = require('./functions'),
        package = require('./package.json');

program
    .version(package.version)
    .description('Reddit video downloder');

program
    .command('download <url>')
    .alias('d')
    .description('Download video with audio')
    .action(url =>
    {
        download(url, 0)
        .then(res =>
        {
            console.log('Complete video has been downloaded');
        });
    });

program
    .command('audio <url>')
    .alias('a')
    .description('Download only audio')
    .action(url =>
    {
        download(url, 1)
        .then(res =>
        {
            console.log('Audio file has bee downloaded');
        });
    });

program
    .command('video <url>')
    .alias('v')
    .description('Download only video')
    .action(url =>
    {
        download(url, 2)
        .then(res =>
        {
            console.log('Video file has been downloaded');
        });
    });

program.parse(process.argv);