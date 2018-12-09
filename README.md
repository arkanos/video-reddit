# Reddit video downloader

A CLI tool to download new Reddit's version videos.

### Installing

You can install the tool from NPM repository.

```
npm i -g video-reddit
```

## Usage

By default, the tool will try to download the video and audio files and merge them:

```
video-reddit download https://www.reddit.com/r/funny/comments/a4aie2/damn_vacuum_wont_start
```

If needed, you can also specify if you just want one of the media files only.
For example, using ```audio``` parameter instead of ```download``` will just get the audio file.

```
Reddit video downloder

Options:
  -V, --version     output the version number
  -h, --help        output usage information

Commands:
  download|d <url>  Download video with audio
  audio|a <url>     Download only audio
  video|v <url>     Download only video
```

## Contributing

Open to suggestions, improvements and more. Just raise an issue [here](https://github.com/arkanos/video-reddit/issues)!

## Authors

* **arkanos** - *Initial work* - [arkanos](https://github.com/arkanos)

See also the list of [contributors](https://github.com/arkanos/video-reddit/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details