# youtube-dl downloader plugin for webpack

[![npm][npm-image]][npm-url]
[![MIT License][mit-license-image]][mit-license-url]

[npm-url]: https://www.npmjs.com/package/youtube-dl-downloader-wepback-plugin
[npm-image]: https://img.shields.io/npm/v/youtube-dl-downloader-wepback-plugin.svg?label=npm%20version
[mit-license-url]: LICENSE
[mit-license-image]: https://camo.githubusercontent.com/d59450139b6d354f15a2252a47b457bb2cc43828/68747470733a2f2f696d672e736869656c64732e696f2f6e706d2f6c2f7365727665726c6573732e737667

## Installation

`npm install --save-dev youtube-dl-downloader-wepback-plugin`

## Usage

```js
const YoutubeDlDownloaderPlugin = require("youtube-dl-downloader-wepback-plugin");

const webpackConfig = {
  plugins: [
    new YoutubeDlDownloaderPlugin({
      from: 'website',
      to: './lib'
    })
  ],
};

module.exports = webpackConfig;
```

## Options and Defaults (Optional)

```js
new CleanWebpackPlugin({
    /**
     * A platform of youtube-dl (win32 or not)
     *
     * default: ['win32', 'linux']
     */
    platform?: string[] | string;

    /**
     * 'github' or 'website'; server where would like to download
     *
     * default: 'website'
     */
    from?: DownloadFrom;

    /**
     * When {from: 'github'}, a version to download youtube-dl from github releases
     *
     * default: [lastest version]
     */
    version?: string;

    /**
     * A version to download youtube-dl
     */
    to: string;
});
```